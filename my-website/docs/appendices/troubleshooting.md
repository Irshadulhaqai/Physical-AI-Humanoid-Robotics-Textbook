---
sidebar_position: 4
title: "Troubleshooting"
sidebar_label: "Troubleshooting"
description: "Common issues and solutions for Physical AI development including ROS 2 errors, simulation crashes, build failures, and hardware debugging."
keywords: [troubleshooting, errors, debugging, fixes, problems]
estimated_time: "10 minutes"
prerequisites: []
learning_objectives:
  - "Diagnose and fix common ROS 2 installation and runtime issues"
  - "Resolve Gazebo and Isaac Sim startup failures"
  - "Debug colcon build errors and missing dependencies"
---

**Estimated Time**: 10 minutes

:::info[What You'll Learn]
- Diagnose and fix common ROS 2 installation and runtime issues
- Resolve Gazebo and Isaac Sim startup failures
- Debug colcon build errors and missing dependencies
:::

:::note[Prerequisites]
No prerequisites -- use this page as a reference when you encounter issues.
:::

Solutions to common issues encountered during the course.

## ROS 2 Issues

### Cannot find ROS 2 commands

**Symptom:** `ros2: command not found`

**Solution:**
```bash title="Source ROS 2 setup"
source /opt/ros/jazzy/setup.bash
# Add to ~/.bashrc for persistence:
# highlight-next-line
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
```

### Package not found during build

**Symptom:** `Could not find a package configuration file provided by "package_name"`

**Solution:**
```bash title="Install missing dependencies"
# Install missing dependencies
# highlight-next-line
rosdep install --from-paths src --ignore-src -r -y
```

### Topic not receiving messages

**Symptom:** Subscriber shows no data

**Checklist:**
1. Check topic name matches exactly: `ros2 topic list`
2. Verify message type: `ros2 topic info /topic_name`
3. Check QoS settings match between publisher and subscriber

:::tip[QoS Mismatch]
The most common cause of "silent failures" (publisher publishes but subscriber receives nothing) is a QoS mismatch. Use `ros2 topic info -v /topic_name` to compare publisher and subscriber QoS profiles.
:::

## Simulation Issues

### Gazebo crashes on startup

**Symptom:** Segmentation fault or black screen

**Solutions:**
```bash title="Debug Gazebo startup" showLineNumbers
# Clear cache
rm -rf ~/.gazebo

# Check GPU driver
nvidia-smi

# highlight-next-line
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

:::warning[VRAM Requirements]
Isaac Sim requires at least 12GB of GPU VRAM. If your GPU has less than 12GB, use Gazebo for simulation chapters or switch to the Cloud setup option.
:::

## Build Issues

### Colcon build fails

**Symptom:** `colcon build` returns errors

**Solutions:**
```bash title="Debug colcon build failures" showLineNumbers
# Clean build
rm -rf build/ install/ log/
# highlight-next-line
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
```bash title="Debug USB device detection" showLineNumbers
# Check device connection
lsusb

# Add udev rules (example for common devices)
# highlight-next-line
sudo usermod -a -G dialout $USER
# Log out and back in

# Check permissions
ls -la /dev/ttyUSB*
```

:::tip[Key Takeaways]
- Most ROS 2 "command not found" errors are solved by sourcing the setup script
- QoS mismatches are the silent killer of ROS 2 topic communication
- Always check GPU drivers and VRAM before debugging simulation crashes
- Use `rosdep install` to automatically resolve missing package dependencies
- When in doubt, clean the build directory and rebuild from scratch
:::

---

*Can't find your issue? Search the [ROS 2 Discourse](https://discourse.ros.org/) or [NVIDIA Isaac Forums](https://forums.developer.nvidia.com/c/simulation/isaac-sim/).*
