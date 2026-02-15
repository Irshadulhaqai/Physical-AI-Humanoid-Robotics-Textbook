---
sidebar_position: 3
title: "Physical AI Edge Kit Setup"
sidebar_label: "Jetson Edge Kit"
description: "Setup guide for NVIDIA Jetson edge deployment configuration with JetPack, ROS 2 Humble, and Isaac ROS for on-robot AI inference."
keywords: [jetson, edge, setup, nvidia, orin, nano]
estimated_time: "90 minutes"
prerequisites: ["hardware-guide"]
learning_objectives:
  - "Flash JetPack 6.0+ on an NVIDIA Jetson device"
  - "Install and verify ROS 2 Humble on the Jetson platform"
  - "Set up Isaac ROS for GPU-accelerated perception"
  - "Configure power modes for optimal performance"
---

**Estimated Time**: 90 minutes

:::info[What You'll Learn]
- Flash JetPack 6.0+ on an NVIDIA Jetson device
- Install and verify ROS 2 Humble on the Jetson platform
- Set up Isaac ROS for GPU-accelerated perception
- Configure power modes for optimal performance
:::

:::note[Prerequisites]
- [Hardware Setup Guide Overview](./index.md) -- review the configuration comparison to confirm Jetson is your chosen path
:::

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

```bash title="Update Jetson after flashing"
# On Jetson after flashing, update
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install ROS 2 Humble

:::warning[ROS 2 Version on Jetson]
Jetson uses ROS 2 Humble (not Jazzy) due to the Ubuntu 22.04 base. Code from this course is compatible with Humble, but package names may differ slightly (e.g., `ros-humble-desktop` instead of `ros-jazzy-desktop`).
:::

```bash title="Install ROS 2 Humble on Jetson" showLineNumbers
# Add ROS 2 repository
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# highlight-next-line
# Install ROS 2 Humble
sudo apt update
sudo apt install ros-humble-desktop -y

# Source setup
# highlight-next-line
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### Step 3: Install Isaac ROS

```bash title="Clone and build Isaac ROS" showLineNumbers
# Clone Isaac ROS
mkdir -p ~/workspaces/isaac_ros-dev/src
cd ~/workspaces/isaac_ros-dev/src
# highlight-next-line
git clone https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common.git

# Build
cd ~/workspaces/isaac_ros-dev
colcon build --symlink-install
```

### Step 4: Configure Power Mode

```bash title="Set Jetson to maximum performance"
# Set to maximum performance
# highlight-next-line
sudo nvpmodel -m 0
sudo jetson_clocks
```

:::tip[Power Modes]
Jetson supports multiple power modes. Mode 0 is maximum performance (highest power draw). For battery-powered operation, use mode 1 or 2 to trade performance for lower power consumption. Check available modes with `sudo nvpmodel -p --verbose`.
:::

## Verification Checklist

```bash title="Verify Jetson installation" showLineNumbers
# Check Jetson status
sudo jtop  # Install with: sudo pip3 install jetson-stats

# Check ROS 2
ros2 doctor --report

# Check CUDA
nvcc --version

# Test camera (if connected)
# highlight-next-line
gst-launch-1.0 nvarguscamerasrc ! nvoverlaysink
```

### Expected Output

- `jtop`: Shows GPU, CPU, memory usage
- `ros2 doctor`: No errors
- Camera: Live preview (if camera connected)

:::tip[Key Takeaways]
- Jetson uses JetPack 6.0+ which includes Ubuntu 22.04 and CUDA pre-installed
- ROS 2 Humble is required on Jetson (not Jazzy) due to the Ubuntu 22.04 base
- Isaac ROS provides GPU-accelerated perception nodes optimized for Jetson hardware
- Use `nvpmodel` and `jetson_clocks` to configure power vs performance tradeoffs
- `jtop` is the essential monitoring tool for Jetson development
:::

## Next Steps

Your Jetson is ready! Return to the [Introduction](../introduction/index.md) to begin the course, or explore the [Cloud Options](./cloud-options.md) for an alternative setup.
