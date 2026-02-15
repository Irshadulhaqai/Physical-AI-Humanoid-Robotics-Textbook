---
sidebar_position: 4
title: "Cloud-Native Setup"
sidebar_label: "Cloud Options"
description: "Cloud-based development options for Physical AI without local hardware, including AWS RoboMaker, Google Cloud, and GitHub Codespaces."
keywords: [cloud, aws, gcp, azure, robomaker, remote]
estimated_time: "30 minutes"
prerequisites: ["hardware-guide"]
learning_objectives:
  - "Compare cloud platforms for robotics development"
  - "Set up AWS RoboMaker for GPU-accelerated simulation"
  - "Configure GitHub Codespaces for basic ROS 2 development"
  - "Manage cloud costs effectively during the course"
---

**Estimated Time**: 30 minutes

:::info[What You'll Learn]
- Compare cloud platforms for robotics development
- Set up AWS RoboMaker for GPU-accelerated simulation
- Configure GitHub Codespaces for basic ROS 2 development
- Manage cloud costs effectively during the course
:::

:::note[Prerequisites]
- [Hardware Setup Guide Overview](./index.md) -- review the configuration comparison to confirm Cloud is your chosen path
:::

Develop without local hardware using cloud-based robotics platforms.

## Platform Comparison

| Platform | ROS 2 Support | GPU Simulation | Cost |
|----------|---------------|----------------|------|
| AWS RoboMaker | Jazzy | Yes | $$ |
| Google Cloud | Humble | Yes | $$ |
| Azure + Container | Jazzy | Limited | $$ |
| GitHub Codespaces | Jazzy | No | $ |

## Option 1: AWS RoboMaker (Recommended)

Best for full simulation with GPU support.

### Setup Steps

1. Create AWS account at [aws.amazon.com](https://aws.amazon.com)
2. Navigate to RoboMaker in AWS Console
3. Create Development Environment:
   - Instance type: `m6i.xlarge` or larger
   - Pre-installed: ROS 2 Jazzy

```bash title="Verify ROS 2 in RoboMaker"
# In RoboMaker terminal
# highlight-next-line
ros2 doctor --report
```

### Running Simulations

```bash title="Launch Gazebo simulation in RoboMaker"
# Launch Gazebo in RoboMaker
ros2 launch aws_robomaker_small_house_world small_house.launch.py
```

## Option 2: GitHub Codespaces

Best for learning ROS 2 basics without GPU requirements.

### Setup Steps

1. Fork the course repository
2. Open in Codespaces with devcontainer
3. ROS 2 auto-configured

```bash title="Test ROS 2 in Codespaces"
# In Codespace terminal
source /opt/ros/jazzy/setup.bash
ros2 run demo_nodes_cpp talker
```

:::warning[GPU Limitation]
Codespaces lacks GPU support. Simulation chapters (Modules 2-3) require the Workstation or AWS setup. Use Codespaces only for Module 1 (ROS 2 fundamentals) and non-simulation exercises.
:::

## Option 3: Google Cloud VM

### Setup Steps

```bash title="Create GPU VM on Google Cloud" showLineNumbers
# Create GPU VM
gcloud compute instances create ros2-dev \
  --machine-type=n1-standard-8 \
  --accelerator=type=nvidia-tesla-t4,count=1 \
  --image-family=ubuntu-2404-lts \
  --image-project=ubuntu-os-cloud

# highlight-next-line
# SSH and install ROS 2 (follow Workstation guide)
gcloud compute ssh ros2-dev
```

## Verification Checklist

```bash title="Verify cloud ROS 2 installation" showLineNumbers
# Verify ROS 2 installation
ros2 doctor --report

# Test basic functionality
ros2 run demo_nodes_cpp talker &
# highlight-next-line
ros2 run demo_nodes_cpp listener
```

## Cost Management Tips

:::info[Keep Costs Under Control]
Cloud GPU instances can be expensive. Follow these guidelines to avoid surprise bills:
:::

1. **Stop instances** when not in use
2. **Use spot/preemptible** instances for non-critical work
3. **Set budget alerts** in cloud console
4. **Delete resources** after course completion

:::tip[Key Takeaways]
- AWS RoboMaker provides the most complete cloud experience with GPU simulation support
- GitHub Codespaces is the cheapest option but lacks GPU support (suitable for Module 1 only)
- Google Cloud VMs offer flexibility but require manual ROS 2 installation
- Always stop or delete cloud instances when not in use to avoid unexpected costs
- Set budget alerts before starting to prevent billing surprises
:::

## Next Steps

Your cloud environment is ready! Return to the [Introduction](../introduction/index.md) to begin the course.
