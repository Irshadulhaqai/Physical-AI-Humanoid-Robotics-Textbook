---
sidebar_position: 2
title: "Isaac Sim Setup"
sidebar_label: "Isaac Sim Setup"
description: "Install and configure NVIDIA Isaac Sim for AI-powered robotics simulation with Omniverse, GPU drivers, and ROS 2 bridge integration."
keywords: [isaac-sim, nvidia, omniverse, simulation, setup]
estimated_time: "90 minutes"
prerequisites: ["installation"]
learning_objectives:
  - "Install NVIDIA Omniverse and Isaac Sim on a Linux workstation"
  - "Configure GPU drivers for simulation workloads"
  - "Launch Isaac Sim and explore the interface"
  - "Verify ROS 2 bridge connectivity"
---

**Estimated Time**: 90 minutes

:::info[What You'll Learn]
- Install NVIDIA Omniverse and Isaac Sim on a Linux workstation
- Configure GPU drivers for simulation workloads
- Launch Isaac Sim and explore the interface
- Verify ROS 2 bridge connectivity
:::

:::note[Prerequisites]
- [ROS 2 Jazzy Installation](../module-1/installation.md) -- ROS 2 environment setup
:::

This chapter guides you through setting up NVIDIA Isaac Sim for advanced robotics simulation.

## What is Isaac Sim?

Isaac Sim is NVIDIA's robotics simulation platform built on Omniverse. It provides:

- Photorealistic rendering with RTX
- Accurate physics with PhysX 5
- AI model training integration
- ROS 2 bridge for robot control

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| GPU | RTX 2070 | RTX 4080+ |
| VRAM | 8GB | 16GB+ |
| RAM | 32GB | 64GB |
| Storage | 50GB SSD | 100GB NVMe |

:::warning[GPU Requirements]
Isaac Sim requires an NVIDIA RTX GPU. AMD and Intel GPUs are not supported. If you do not have a compatible GPU, consider using NVIDIA's cloud-based Isaac Sim instances or a cloud VM with an attached GPU.
:::

## Installation

### Step 1: Install NVIDIA Driver

```bash title="install_nvidia_driver" showLineNumbers
# Add driver repository
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update

# highlight-next-line
# Install driver 535+
sudo apt install nvidia-driver-535
sudo reboot
```

### Step 2: Download Omniverse Launcher

1. Visit [nvidia.com/omniverse](https://www.nvidia.com/en-us/omniverse/)
2. Download the AppImage for Linux
3. Make executable and run:

```bash title="launch_omniverse"
chmod +x omniverse-launcher-linux.AppImage
./omniverse-launcher-linux.AppImage
```

### Step 3: Install Isaac Sim

1. Open Omniverse Launcher
2. Go to Exchange tab
3. Search "Isaac Sim"
4. Click Install

### Step 4: Configure ROS 2 Bridge

```bash title="enable_ros2_bridge"
# Isaac Sim includes ROS 2 bridge
# Enable in Isaac Sim: Window > Extensions > ROS2 Bridge
```

## Verification

```bash title="verify_isaac_sim_install"
# Launch Isaac Sim from terminal
# highlight-next-line
~/.local/share/ov/pkg/isaac_sim-*/isaac-sim.sh

# Or from Omniverse Launcher
```

## First Steps

1. **Open Isaac Sim**
2. **Load sample scene**: File > Open > Isaac/Samples/ROS2/...
3. **Start simulation**: Press Play button
4. **Check ROS 2 topics**: `ros2 topic list`

## Troubleshooting

### Out of memory

- Close other GPU applications
- Reduce viewport resolution in settings

### ROS 2 bridge not working

```bash title="source_ros2_environment"
# Ensure environment is sourced
source /opt/ros/jazzy/setup.bash
```

:::tip[Key Takeaways]
- Isaac Sim requires an NVIDIA RTX GPU with at least 8 GB VRAM
- The Omniverse Launcher manages Isaac Sim installation and updates
- The ROS 2 bridge extension enables direct communication between Isaac Sim and ROS 2 nodes
- Always verify your setup by checking `ros2 topic list` after launching a sample scene
:::

## Next Steps

With Isaac Sim configured, proceed to [Perception](./perception.md) to learn about AI-powered perception pipelines, or continue to [Navigation](./navigation.md) for autonomous robot movement.
