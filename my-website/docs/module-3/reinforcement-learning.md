---
sidebar_position: 5
title: "Reinforcement Learning for Robotics"
sidebar_label: "Reinforcement Learning"
description: "Train robot locomotion and manipulation policies using reinforcement learning with NVIDIA Isaac Sim's GPU-accelerated parallel environments."
keywords: [reinforcement-learning, rl, isaac, locomotion, manipulation, policy]
estimated_time: "60 minutes"
prerequisites: ["isaac-sim-setup", "perception"]
learning_objectives:
  - "Understand RL fundamentals applied to robotics"
  - "Configure parallel simulation environments in Isaac Sim"
  - "Train locomotion policies for humanoid robots"
  - "Evaluate and deploy trained policies"
---

# Reinforcement Learning for Robotics

Reinforcement Learning (RL) enables robots to learn behaviors through trial and error in simulation. NVIDIA Isaac Sim provides GPU-accelerated parallel environments that make RL training practical for complex robot tasks.

## RL Fundamentals for Robotics

```mermaid
flowchart LR
    A[Environment<br/>Isaac Sim] -->|Observation| B[Policy Network<br/>Neural Network]
    B -->|Action| A
    A -->|Reward| C[Training Algorithm<br/>PPO/SAC]
    C -->|Update Weights| B
```

### Key Concepts

| Concept | Robotics Example |
|---------|-----------------|
| **State/Observation** | Joint positions, velocities, sensor readings |
| **Action** | Joint torques or position targets |
| **Reward** | Distance to goal, energy efficiency, stability |
| **Episode** | One attempt at a task (e.g., walk 10 meters) |
| **Policy** | Neural network mapping observations to actions |

## Parallel Environments

Isaac Sim can run thousands of robot instances simultaneously on GPU:

```mermaid
flowchart TB
    subgraph GPU["GPU (Single)"]
        E1[Env 1]
        E2[Env 2]
        E3[Env 3]
        EN[Env N...]
    end
    GPU --> A[Vectorized Observations]
    A --> B[Policy Network<br/>Batch Inference]
    B --> C[Vectorized Actions]
    C --> GPU
```

### Performance Comparison

| Platform | Environments | Steps/sec | Speedup |
|----------|-------------|-----------|---------|
| CPU (single) | 1 | 60 | 1× |
| CPU (multi) | 16 | 800 | 13× |
| Isaac Sim (RTX 4090) | 4,096 | 200,000 | 3,333× |
| Isaac Sim (H100) | 16,384 | 1,000,000 | 16,667× |

## Training Setup

### Task Definition

```python
from omni.isaac.lab.envs import ManagerBasedRLEnv
from omni.isaac.lab.envs import ManagerBasedRLEnvCfg

class HumanoidWalkCfg(ManagerBasedRLEnvCfg):
    """Configuration for humanoid walking task."""

    # Environment
    num_envs = 4096
    env_spacing = 2.0

    # Observations
    observation_space = {
        'joint_positions': 28,    # All joint angles
        'joint_velocities': 28,   # All joint velocities
        'base_linear_vel': 3,     # Base velocity
        'base_angular_vel': 3,    # Base angular velocity
        'projected_gravity': 3,   # Gravity in body frame
        'commands': 3,            # Target velocity command
    }

    # Actions: joint position targets
    action_space = 28  # One per actuated joint

    # Episode
    max_episode_length = 1000  # steps
    dt = 0.02  # 50 Hz control

    # Reward weights
    rewards = {
        'tracking_linear_vel': 1.0,
        'tracking_angular_vel': 0.5,
        'feet_air_time': 0.1,
        'action_rate': -0.01,
        'joint_torques': -0.0001,
        'termination': -2.0,
    }
```

### Reward Design

Reward engineering is critical for RL in robotics:

```python
class HumanoidReward:
    """Reward function for humanoid locomotion."""

    def compute(self, obs, actions, next_obs):
        rewards = {}

        # Track commanded velocity
        vel_error = obs['base_linear_vel'][:, 0] - obs['commands'][:, 0]
        rewards['tracking_linear_vel'] = torch.exp(-vel_error ** 2 / 0.25)

        # Encourage foot swing (air time)
        rewards['feet_air_time'] = self._compute_feet_air_time(next_obs)

        # Penalize large actions (energy efficiency)
        rewards['action_rate'] = -torch.sum(
            (actions - self.prev_actions) ** 2, dim=-1)

        # Penalize joint torques
        rewards['joint_torques'] = -torch.sum(
            next_obs['joint_torques'] ** 2, dim=-1)

        # Total weighted reward
        total = sum(
            self.weights[k] * v for k, v in rewards.items())
        return total
```

### Termination Conditions

```python
class TerminationConditions:
    def check(self, obs):
        terminated = torch.zeros(self.num_envs, dtype=torch.bool)

        # Fall detection: base height too low
        terminated |= obs['base_height'] < 0.3

        # Excessive tilt
        terminated |= torch.abs(obs['projected_gravity'][:, 2]) < 0.5

        # Out of bounds
        terminated |= torch.abs(obs['base_position'][:, 0]) > 20.0

        return terminated
```

## Training with PPO

Proximal Policy Optimization (PPO) is the most common algorithm for robot RL.

### Training Script

```python
import torch
from omni.isaac.lab_tasks.utils import parse_env_cfg

def train():
    # Create environment
    env_cfg = HumanoidWalkCfg()
    env = ManagerBasedRLEnv(cfg=env_cfg)

    # PPO configuration
    ppo_cfg = {
        'learning_rate': 3e-4,
        'gamma': 0.99,
        'gae_lambda': 0.95,
        'clip_range': 0.2,
        'entropy_coef': 0.01,
        'value_loss_coef': 0.5,
        'max_grad_norm': 1.0,
        'n_epochs': 5,
        'batch_size': 4096 * 24 // 4,  # mini-batch
    }

    # Policy network
    policy = ActorCritic(
        obs_dim=env.observation_space.shape[0],
        act_dim=env.action_space.shape[0],
        hidden_dims=[512, 256, 128])

    # Training loop
    for iteration in range(10000):
        # Collect rollouts
        rollouts = collect_rollouts(env, policy, steps=24)

        # Update policy
        loss = ppo_update(policy, rollouts, ppo_cfg)

        if iteration % 100 == 0:
            print(f'Iter {iteration}: reward={rollouts.mean_reward:.2f}, '
                  f'loss={loss:.4f}')

    # Save trained policy
    torch.save(policy.state_dict(), 'humanoid_walk_policy.pt')
```

### Policy Network Architecture

```python
import torch
import torch.nn as nn

class ActorCritic(nn.Module):
    """Actor-Critic network for PPO."""

    def __init__(self, obs_dim, act_dim, hidden_dims=[512, 256, 128]):
        super().__init__()

        # Shared feature extractor
        layers = []
        prev_dim = obs_dim
        for dim in hidden_dims:
            layers.extend([
                nn.Linear(prev_dim, dim),
                nn.ELU(),
            ])
            prev_dim = dim

        self.features = nn.Sequential(*layers)

        # Actor head (policy)
        self.actor_mean = nn.Linear(prev_dim, act_dim)
        self.actor_log_std = nn.Parameter(
            torch.zeros(act_dim))

        # Critic head (value function)
        self.critic = nn.Linear(prev_dim, 1)

    def forward(self, obs):
        features = self.features(obs)
        action_mean = self.actor_mean(features)
        action_std = self.actor_log_std.exp()
        value = self.critic(features)
        return action_mean, action_std, value
```

## Training Curriculum

Curriculum learning gradually increases task difficulty:

```mermaid
flowchart LR
    A[Stage 1<br/>Stand Still] --> B[Stage 2<br/>Walk Slow<br/>0.5 m/s]
    B --> C[Stage 3<br/>Walk Fast<br/>1.5 m/s]
    C --> D[Stage 4<br/>Rough Terrain]
    D --> E[Stage 5<br/>Carry Payload]
```

```python
class Curriculum:
    def __init__(self):
        self.stage = 0
        self.stages = [
            {'max_vel': 0.0, 'terrain': 'flat'},
            {'max_vel': 0.5, 'terrain': 'flat'},
            {'max_vel': 1.5, 'terrain': 'flat'},
            {'max_vel': 1.5, 'terrain': 'rough'},
            {'max_vel': 1.0, 'terrain': 'rough', 'payload': 2.0},
        ]

    def update(self, mean_reward, threshold=0.8):
        if mean_reward > threshold and self.stage < len(self.stages) - 1:
            self.stage += 1
            return self.stages[self.stage]
        return self.stages[self.stage]
```

## Domain Randomization

Randomize simulation parameters to improve real-world transfer:

| Parameter | Range | Purpose |
|-----------|-------|---------|
| Friction | 0.5 - 1.5 | Ground surface variation |
| Mass | ±15% | Payload uncertainty |
| Motor strength | ±10% | Actuator variation |
| Observation noise | ±5% | Sensor noise |
| Push force | 0 - 50N | External disturbances |
| Terrain roughness | 0 - 5cm | Surface irregularities |

## Monitoring Training

```bash
# Launch TensorBoard
tensorboard --logdir=runs/

# Key metrics to watch:
# - Mean episode reward (should increase)
# - Episode length (should increase for locomotion)
# - Policy loss (should decrease then stabilize)
# - Value loss (should decrease)
# - Entropy (should decrease slowly)
```

## Deploying Trained Policies

```python
class PolicyDeployer(Node):
    """Deploy a trained RL policy on the real robot."""

    def __init__(self):
        super().__init__('policy_deployer')
        self.policy = ActorCritic(obs_dim=68, act_dim=28)
        self.policy.load_state_dict(
            torch.load('humanoid_walk_policy.pt'))
        self.policy.eval()

        self.joint_sub = self.create_subscription(
            JointState, '/joint_states', self.state_callback, 10)
        self.joint_pub = self.create_publisher(
            JointState, '/joint_commands', 10)
        self.timer = self.create_timer(0.02, self.control_loop)

    def control_loop(self):
        if self.latest_obs is None:
            return
        with torch.no_grad():
            obs_tensor = torch.tensor(self.latest_obs).float()
            action_mean, _, _ = self.policy(obs_tensor)
        # Publish joint position targets
        self.publish_joint_commands(action_mean.numpy())
```

## Next Steps

Continue to [Sim-to-Real Transfer](./sim-to-real.md) to learn how to bridge the gap between simulation-trained policies and real-world deployment.
