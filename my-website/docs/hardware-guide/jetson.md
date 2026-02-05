---
sidebar_position: 3
title: Physical AI Edge Kit Setup
sidebar_label: Jetson Edge Kit
description: Setup guide for NVIDIA Jetson edge deployment configuration.
keywords: [jetson, edge, setup, nvidia, orin, nano]
estimated_time: "1-2 hours"
---

# Physical AI Edge Kit Setup

NVIDIA Jetson configuration for edge deployment and real hardware integration.

## Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Device | Jetson Orin Nano | Jetson AGX Orin |
| Storage | 64GB microSD | 256GB NVMe |
| Power | 15W adapter | 40W+ adapter |
| Peripherals | USB keyboard, HDMI monitor | Same |

## Installation Steps

### Step 1: Flash JetPack

1. Download [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) on a host Ubuntu PC
2. Connect Jetson via USB-C in recovery mode
3. Flash JetPack 6.0+ (includes Ubuntu 22.04 for Jetson)

```bash
# On Jetson after flashing, update
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install ROS 2 Humble

:::note
Jetson uses ROS 2 Humble (not Jazzy) due to Ubuntu 22.04 base.
:::

```bash
# Add ROS 2 repository
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 Humble
sudo apt update
sudo apt install ros-humble-desktop -y

# Source setup
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### Step 3: Install Isaac ROS

```bash
# Clone Isaac ROS
mkdir -p ~/workspaces/isaac_ros-dev/src
cd ~/workspaces/isaac_ros-dev/src
git clone https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common.git

# Build
cd ~/workspaces/isaac_ros-dev
colcon build --symlink-install
```

### Step 4: Configure Power Mode

```bash
# Set to maximum performance
sudo nvpmodel -m 0
sudo jetson_clocks
```

## Verification Checklist

```bash
# Check Jetson status
sudo jtop  # Install with: sudo pip3 install jetson-stats

# Check ROS 2
ros2 doctor --report

# Check CUDA
nvcc --version

# Test camera (if connected)
gst-launch-1.0 nvarguscamerasrc ! nvoverlaysink
```

### Expected Output

- `jtop`: Shows GPU, CPU, memory usage
- `ros2 doctor`: No errors
- Camera: Live preview (if camera connected)

## Next Steps

Your Jetson is ready! Return to the [Introduction](/docs/intro) to begin the course.
