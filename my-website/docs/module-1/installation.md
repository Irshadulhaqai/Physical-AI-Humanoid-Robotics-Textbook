---
sidebar_position: 2
title: ROS 2 Jazzy Installation
sidebar_label: Installation
description: Install and configure ROS 2 Jazzy on Ubuntu 24.04 for robot development.
keywords: [ros2, jazzy, installation, ubuntu, setup]
estimated_time: "60 minutes"
prerequisites: []
learning_objectives:
  - Install ROS 2 Jazzy from binary packages
  - Configure your development environment
  - Verify the installation works correctly
---

# ROS 2 Jazzy Installation

This chapter guides you through installing ROS 2 Jazzy on Ubuntu 24.04.

## Prerequisites

- Ubuntu 24.04 LTS (Noble Numbat)
- sudo access
- Internet connection

## Installation Steps

### Step 1: Set Locale

```bash
locale  # check for UTF-8

sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
```

### Step 2: Setup Sources

```bash
# Enable required repositories
sudo apt install software-properties-common
sudo add-apt-repository universe

# Add ROS 2 GPG key
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# Add repository to sources list
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

### Step 3: Install ROS 2 Packages

```bash
sudo apt update
sudo apt upgrade

# Desktop Install (Recommended)
sudo apt install ros-jazzy-desktop

# Development tools
sudo apt install ros-dev-tools
```

### Step 4: Environment Setup

```bash
# Add to your shell startup script
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

## Verification

```bash
# Check ROS 2 is accessible
ros2 --help

# Run example nodes
ros2 run demo_nodes_cpp talker &
ros2 run demo_nodes_cpp listener
```

You should see messages being published and received.

## Troubleshooting

### Command not found

If `ros2` command is not found:
```bash
source /opt/ros/jazzy/setup.bash
```

### Package conflicts

```bash
sudo apt --fix-broken install
```

## Next Steps

With ROS 2 installed, you're ready to learn the fundamentals of nodes, topics, and services.
