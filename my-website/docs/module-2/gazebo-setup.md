---
sidebar_position: 2
title: "Gazebo Setup"
sidebar_label: "Gazebo Setup"
description: "Install and configure Gazebo Harmonic simulation environment for ROS 2 Jazzy, including the ros_gz bridge and first simulation launch."
keywords: [gazebo, simulation, setup, ros2, harmonic, installation]
estimated_time: "60 minutes"
prerequisites: ["installation"]
learning_objectives:
  - "Install Gazebo Harmonic on Ubuntu 24.04"
  - "Configure the ROS 2 to Gazebo bridge"
  - "Launch your first simulation environment"
---

**Estimated Time**: 60 minutes

:::info[What You'll Learn]
- Install Gazebo Harmonic on Ubuntu 24.04
- Configure the ROS 2 to Gazebo bridge
- Launch your first simulation environment
:::

:::note[Prerequisites]
Before starting this chapter, complete:
- [ROS 2 Jazzy Installation](../module-1/installation.md)
:::

This chapter guides you through setting up Gazebo for robot simulation.

## What is Gazebo?

Gazebo is a physics-based 3D simulator for robotics that integrates with ROS 2. It provides:

- Realistic physics simulation
- Sensor modeling (cameras, LIDAR, IMU)
- Robot model visualization
- Plugin architecture for custom behaviors

## Installation

### Install Gazebo Harmonic

```bash title="Install Gazebo Harmonic" showLineNumbers
# Add Gazebo repository
sudo curl https://packages.osrfoundation.org/gazebo.gpg --output /usr/share/keyrings/pkgs-osrf-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/pkgs-osrf-archive-keyring.gpg] http://packages.osrfoundation.org/gazebo/ubuntu-stable $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/gazebo-stable.list > /dev/null

# Install Gazebo
sudo apt update
# highlight-next-line
sudo apt install gz-harmonic

# Install ROS 2 Gazebo packages
sudo apt install ros-jazzy-ros-gz
```

:::tip[Pro Tip]
The `ros-jazzy-ros-gz` package includes the bridge, image transport, and simulation launch tools. Install it alongside Gazebo to get full ROS 2 integration out of the box.
:::

## Verification

```bash title="Verify Gazebo installation"
# Launch empty world
gz sim empty.sdf

# With ROS 2 bridge
ros2 launch ros_gz_sim gz_sim.launch.py gz_args:=empty.sdf
```

## Your First Simulation

```bash title="Launch a sample simulation"
# Launch with a robot model
ros2 launch ros_gz_sim gz_sim.launch.py gz_args:="shapes.sdf"
```

## Key Concepts

- **World**: The simulation environment
- **Model**: A robot or object in the world
- **Plugin**: Extends functionality (sensors, controllers)
- **Bridge**: Connects Gazebo to ROS 2

:::warning[Common Mistake]
If Gazebo launches but the window is black or empty, check that your GPU drivers are installed correctly. On Ubuntu, run `glxinfo | grep OpenGL` to verify hardware acceleration is working.
:::

:::tip[Key Takeaways]
- Gazebo Harmonic is the recommended simulator for ROS 2 Jazzy
- The `ros_gz` bridge connects Gazebo topics to ROS 2 topics
- Use `gz sim` to launch standalone simulations and `ros2 launch ros_gz_sim` for ROS 2 integration
- Gazebo uses SDF (Simulation Description Format) for worlds and models
:::

## Next Steps

- [URDF & SDF](./urdf-sdf.md) — learn how to create robot models for Gazebo simulation
- [Physics Simulation](./physics-sim.md) — configure physics properties for realistic behavior
