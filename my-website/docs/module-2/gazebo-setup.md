---
sidebar_position: 2
title: Gazebo Setup
sidebar_label: Gazebo Setup
description: Install and configure Gazebo simulation environment for ROS 2.
keywords: [gazebo, simulation, setup, ros2, harmonic]
estimated_time: "60 minutes"
prerequisites: ["module-1/installation"]
learning_objectives:
  - Install Gazebo Harmonic
  - Configure ROS 2 integration
  - Launch your first simulation
---

# Gazebo Setup

This chapter guides you through setting up Gazebo for robot simulation.

## What is Gazebo?

Gazebo is a physics-based 3D simulator for robotics that integrates with ROS 2. It provides:

- Realistic physics simulation
- Sensor modeling (cameras, LIDAR, IMU)
- Robot model visualization
- Plugin architecture for custom behaviors

## Installation

### Install Gazebo Harmonic

```bash
# Add Gazebo repository
sudo curl https://packages.osrfoundation.org/gazebo.gpg --output /usr/share/keyrings/pkgs-osrf-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/pkgs-osrf-archive-keyring.gpg] http://packages.osrfoundation.org/gazebo/ubuntu-stable $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/gazebo-stable.list > /dev/null

# Install Gazebo
sudo apt update
sudo apt install gz-harmonic

# Install ROS 2 Gazebo packages
sudo apt install ros-jazzy-ros-gz
```

## Verification

```bash
# Launch empty world
gz sim empty.sdf

# With ROS 2 bridge
ros2 launch ros_gz_sim gz_sim.launch.py gz_args:=empty.sdf
```

## Your First Simulation

```bash
# Launch with a robot model
ros2 launch ros_gz_sim gz_sim.launch.py gz_args:="shapes.sdf"
```

## Key Concepts

- **World**: The simulation environment
- **Model**: A robot or object in the world
- **Plugin**: Extends functionality (sensors, controllers)
- **Bridge**: Connects Gazebo to ROS 2

## Next Steps

With Gazebo configured, you're ready to learn how to create robot models with URDF and SDF.
