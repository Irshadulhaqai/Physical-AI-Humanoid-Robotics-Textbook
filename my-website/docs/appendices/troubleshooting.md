---
sidebar_position: 4
title: Troubleshooting
sidebar_label: Troubleshooting
description: Common issues and solutions for Physical AI development.
keywords: [troubleshooting, errors, debugging, fixes, problems]
---

# Troubleshooting

Solutions to common issues encountered during the course.

## ROS 2 Issues

### Cannot find ROS 2 commands

**Symptom:** `ros2: command not found`

**Solution:**
```bash
source /opt/ros/jazzy/setup.bash
# Add to ~/.bashrc for persistence:
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
```

### Package not found during build

**Symptom:** `Could not find a package configuration file provided by "package_name"`

**Solution:**
```bash
# Install missing dependencies
rosdep install --from-paths src --ignore-src -r -y
```

### Topic not receiving messages

**Symptom:** Subscriber shows no data

**Checklist:**
1. Check topic name matches exactly: `ros2 topic list`
2. Verify message type: `ros2 topic info /topic_name`
3. Check QoS settings match between publisher and subscriber

## Simulation Issues

### Gazebo crashes on startup

**Symptom:** Segmentation fault or black screen

**Solutions:**
```bash
# Clear cache
rm -rf ~/.gazebo

# Check GPU driver
nvidia-smi

# Run with verbose logging
gazebo --verbose
```

### Isaac Sim won't launch

**Symptom:** Application fails to start

**Checklist:**
1. Verify GPU has 12GB+ VRAM
2. Update NVIDIA driver to 535+
3. Check Nucleus connection
4. Run: `~/.local/share/ov/pkg/isaac_sim-*/isaac-sim.sh --help`

## Build Issues

### Colcon build fails

**Symptom:** `colcon build` returns errors

**Solutions:**
```bash
# Clean build
rm -rf build/ install/ log/
colcon build --symlink-install

# Build specific package
colcon build --packages-select package_name

# See detailed errors
colcon build --event-handlers console_cohesion+
```

## Hardware Issues

### USB device not detected

**Symptom:** Sensor or controller not appearing

**Solutions:**
```bash
# Check device connection
lsusb

# Add udev rules (example for common devices)
sudo usermod -a -G dialout $USER
# Log out and back in

# Check permissions
ls -la /dev/ttyUSB*
```

---

*Can't find your issue? Search the [ROS 2 Discourse](https://discourse.ros.org/) or [NVIDIA Isaac Forums](https://forums.developer.nvidia.com/c/simulation/isaac-sim/).*
