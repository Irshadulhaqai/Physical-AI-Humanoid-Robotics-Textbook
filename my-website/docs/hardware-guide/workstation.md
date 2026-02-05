---
sidebar_position: 2
title: Digital Twin Workstation Setup
sidebar_label: Workstation
description: Complete setup guide for the Digital Twin Workstation configuration with gaming PC and NVIDIA GPU.
keywords: [workstation, setup, ubuntu, ros2, isaac-sim, nvidia]
estimated_time: "2-3 hours"
---

# Digital Twin Workstation Setup

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

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install NVIDIA Drivers

```bash
# Add NVIDIA repository
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update

# Install driver 535 or later
sudo apt install nvidia-driver-535 -y

# Reboot
sudo reboot
```

### Step 3: Install CUDA Toolkit

```bash
# Install CUDA 12.x
sudo apt install nvidia-cuda-toolkit -y
```

### Step 4: Install ROS 2 Jazzy

```bash
# Add ROS 2 repository
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 Jazzy Desktop
sudo apt update
sudo apt install ros-jazzy-desktop -y

# Source setup
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### Step 5: Install Isaac Sim

1. Download [Omniverse Launcher](https://www.nvidia.com/en-us/omniverse/)
2. Install Isaac Sim from the Launcher
3. Launch Isaac Sim and complete initial setup

## Verification Checklist

Run these commands to verify your installation:

```bash
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

## Next Steps

Your workstation is ready! Return to the [Introduction](/docs/intro) to begin the course.
