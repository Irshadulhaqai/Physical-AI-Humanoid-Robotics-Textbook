---
sidebar_position: 2
title: "Digital Twin Workstation Setup"
sidebar_label: "Workstation"
description: "Complete setup guide for the Digital Twin Workstation configuration with a gaming PC and NVIDIA GPU for GPU-accelerated simulation."
keywords: [workstation, setup, ubuntu, ros2, isaac-sim, nvidia]
estimated_time: "150 minutes"
prerequisites: ["hardware-guide"]
learning_objectives:
  - "Install Ubuntu 24.04 LTS and configure NVIDIA GPU drivers"
  - "Set up ROS 2 Jazzy Desktop and verify the installation"
  - "Install NVIDIA Isaac Sim via Omniverse Launcher"
  - "Run the verification checklist to confirm a working development environment"
---

**Estimated Time**: 150 minutes

:::info[What You'll Learn]
- Install Ubuntu 24.04 LTS and configure NVIDIA GPU drivers
- Set up ROS 2 Jazzy Desktop and verify the installation
- Install NVIDIA Isaac Sim via Omniverse Launcher
- Run the verification checklist to confirm a working development environment
:::

:::note[Prerequisites]
- [Hardware Setup Guide Overview](./index.md) -- review the configuration comparison to confirm Workstation is your chosen path
:::

Full-featured local development environment with GPU-accelerated simulation.

## Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 8 cores, x86_64 | 12+ cores |
| GPU | RTX 3060 (8GB) | RTX 4080 (16GB) |
| RAM | 32GB | 64GB |
| Storage | 100GB SSD | 256GB NVMe |
| OS | Ubuntu 24.04 LTS | Ubuntu 24.04 LTS |

## Installation Steps

### Step 1: Install Ubuntu 24.04 LTS

1. Download Ubuntu 24.04 LTS from [ubuntu.com](https://ubuntu.com/download/desktop)
2. Create bootable USB with Balena Etcher
3. Install with default settings
4. Update system:

```bash title="update_system"
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install NVIDIA Drivers

```bash title="install_nvidia_drivers" showLineNumbers
# Add NVIDIA repository
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update

# highlight-next-line
# Install driver 535 or later
sudo apt install nvidia-driver-535 -y

# Reboot
sudo reboot
```

:::warning[Driver Version]
Ensure you install NVIDIA driver version 535 or later. Older drivers may not support CUDA 12.x or Isaac Sim. After reboot, verify with `nvidia-smi`.
:::

### Step 3: Install CUDA Toolkit

```bash title="install_cuda_toolkit"
# Install CUDA 12.x
sudo apt install nvidia-cuda-toolkit -y
```

### Step 4: Install ROS 2 Jazzy

```bash title="install_ros2_jazzy" showLineNumbers
# Add ROS 2 repository
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# highlight-next-line
# Install ROS 2 Jazzy Desktop
sudo apt update
sudo apt install ros-jazzy-desktop -y

# Source setup
# highlight-next-line
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### Step 5: Install Isaac Sim

1. Download [Omniverse Launcher](https://www.nvidia.com/en-us/omniverse/)
2. Install Isaac Sim from the Launcher
3. Launch Isaac Sim and complete initial setup

## Verification Checklist

Run these commands to verify your installation:

```bash title="verify_installation" showLineNumbers
# Check ROS 2
ros2 doctor --report

# Check NVIDIA driver and GPU
nvidia-smi

# Check CUDA
nvcc --version

# Test ROS 2 talker/listener
ros2 run demo_nodes_cpp talker &
ros2 run demo_nodes_cpp listener
```

### Expected Output

- `ros2 doctor`: No errors, all systems operational
- `nvidia-smi`: Shows GPU with driver 535+
- `nvcc`: CUDA 12.x
- Talker/Listener: Messages flowing between nodes

:::tip[Key Takeaways]
- The Workstation setup installs Ubuntu 24.04, NVIDIA drivers, CUDA, ROS 2 Jazzy, and Isaac Sim
- Driver version 535+ and CUDA 12.x are required for Isaac Sim compatibility
- Always verify your installation with the checklist before proceeding to course modules
- The `ros2 doctor --report` command is your first-line diagnostic tool
:::

## Next Steps

Your workstation is ready! Return to the [Introduction](../introduction/index.md) to begin the course, or explore the [Jetson Edge Kit](./jetson.md) or [Cloud Options](./cloud-options.md) if you want additional configurations.
