---
sidebar_position: 2
title: "ROS 2 Jazzy Installation"
sidebar_label: "Installation"
description: "Install and configure ROS 2 Jazzy on Ubuntu 24.04 for robot development, including locale setup, repository configuration, and verification."
keywords: [ros2, jazzy, installation, ubuntu, setup, configuration]
estimated_time: "60 minutes"
prerequisites: []
learning_objectives:
  - "Install ROS 2 Jazzy from binary packages on Ubuntu 24.04"
  - "Configure your development environment for ROS 2"
  - "Verify the installation works correctly with demo nodes"
---

**Estimated Time**: 60 minutes

:::info[What You'll Learn]
- Install ROS 2 Jazzy from binary packages on Ubuntu 24.04
- Configure your development environment for ROS 2
- Verify the installation works correctly with demo nodes
:::

:::note[Prerequisites]
No prerequisites — you can start here.
:::

This chapter guides you through installing ROS 2 Jazzy on Ubuntu 24.04.

## System Requirements

- Ubuntu 24.04 LTS (Noble Numbat)
- sudo access
- Internet connection

## Installation Steps

### Step 1: Set Locale

```bash title="Set UTF-8 locale" showLineNumbers
locale  # check for UTF-8

sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
# highlight-next-line
export LANG=en_US.UTF-8
```

### Step 2: Setup Sources

```bash title="Add ROS 2 repository" showLineNumbers
# Enable required repositories
sudo apt install software-properties-common
sudo add-apt-repository universe

# Add ROS 2 GPG key
sudo apt update && sudo apt install curl -y
# highlight-next-line
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# Add repository to sources list
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

### Step 3: Install ROS 2 Packages

```bash title="Install ROS 2 Jazzy" showLineNumbers
sudo apt update
sudo apt upgrade

# Desktop Install (Recommended)
# highlight-next-line
sudo apt install ros-jazzy-desktop

# Development tools
sudo apt install ros-dev-tools
```

:::tip[Pro Tip]
The `ros-jazzy-desktop` metapackage includes RViz, demos, and tutorials. If you only need the core libraries without GUI tools, use `ros-jazzy-ros-base` instead.
:::

### Step 4: Environment Setup

```bash title="Configure shell environment"
# Add to your shell startup script
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
# highlight-next-line
source ~/.bashrc
```

## Verification

```bash title="Verify ROS 2 installation" showLineNumbers
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

```bash title="Source ROS 2 setup"
source /opt/ros/jazzy/setup.bash
```

:::warning[Common Mistake]
Forgetting to source the ROS 2 setup script in each new terminal. Adding it to `~/.bashrc` ensures it loads automatically.
:::

### Package conflicts

```bash title="Fix broken packages"
sudo apt --fix-broken install
```

:::tip[Key Takeaways]
- ROS 2 Jazzy requires Ubuntu 24.04 LTS with UTF-8 locale configured
- Install from the official ROS 2 apt repository using the GPG-signed key
- Use `ros-jazzy-desktop` for a complete development environment
- Source the setup script (`source /opt/ros/jazzy/setup.bash`) in every terminal or add it to `~/.bashrc`
- Verify your installation by running the `talker` and `listener` demo nodes
:::

## Next Steps

- [Core Concepts](./core-concepts.md) — learn about nodes, topics, services, and actions
- [Building Packages](./building-packages.md) — create your first ROS 2 package
