---
sidebar_position: 4
title: Cloud-Native Setup
sidebar_label: Cloud Options
description: Cloud-based development options for Physical AI without local hardware.
keywords: [cloud, aws, gcp, azure, robomaker, remote]
estimated_time: "30 minutes"
---

# Cloud-Native Setup

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

```bash
# In RoboMaker terminal
ros2 doctor --report
```

### Running Simulations

```bash
# Launch Gazebo in RoboMaker
ros2 launch aws_robomaker_small_house_world small_house.launch.py
```

## Option 2: GitHub Codespaces

Best for learning ROS 2 basics without GPU requirements.

### Setup Steps

1. Fork the course repository
2. Open in Codespaces with devcontainer
3. ROS 2 auto-configured

```bash
# In Codespace terminal
source /opt/ros/jazzy/setup.bash
ros2 run demo_nodes_cpp talker
```

:::warning
Codespaces lacks GPU support. Simulation chapters require Workstation or AWS.
:::

## Option 3: Google Cloud VM

### Setup Steps

```bash
# Create GPU VM
gcloud compute instances create ros2-dev \
  --machine-type=n1-standard-8 \
  --accelerator=type=nvidia-tesla-t4,count=1 \
  --image-family=ubuntu-2404-lts \
  --image-project=ubuntu-os-cloud

# SSH and install ROS 2 (follow Workstation guide)
gcloud compute ssh ros2-dev
```

## Verification Checklist

```bash
# Verify ROS 2 installation
ros2 doctor --report

# Test basic functionality
ros2 run demo_nodes_cpp talker &
ros2 run demo_nodes_cpp listener
```

## Cost Management Tips

1. **Stop instances** when not in use
2. **Use spot/preemptible** instances for non-critical work
3. **Set budget alerts** in cloud console
4. **Delete resources** after course completion

## Next Steps

Your cloud environment is ready! Return to the [Introduction](/docs/intro) to begin the course.
