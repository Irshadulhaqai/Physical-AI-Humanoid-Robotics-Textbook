---
sidebar_position: 4
title: "Building ROS 2 Packages"
sidebar_label: "Building Packages"
description: "Learn to create, build, and manage ROS 2 packages using colcon, ament, and the standard package structure for Python and C++ projects."
keywords: [ros2, packages, colcon, ament, workspace, build-system, python]
estimated_time: "40 minutes"
prerequisites: ["installation", "core-concepts"]
learning_objectives:
  - "Create a new ROS 2 Python package from scratch"
  - "Understand the ament build system and package.xml metadata"
  - "Build packages with colcon and manage workspaces"
  - "Configure setup.py and setup.cfg for Python packages"
---

# Building ROS 2 Packages

Packages are the fundamental unit of organization in ROS 2. Every node, message definition, and launch file lives inside a package.

## Package Types

| Type | Build System | Language | Use Case |
|------|-------------|----------|----------|
| `ament_python` | setuptools | Python | AI, perception, planning |
| `ament_cmake` | CMake | C++ | Drivers, real-time control |
| `ament_cmake_python` | Both | Mixed | Hybrid packages |

This course focuses on Python packages (`ament_python`).

## Creating a Workspace

```bash
# Create workspace directory
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
```

## Creating a Python Package

```bash
cd ~/ros2_ws/src

# Create a new Python package
ros2 pkg create --build-type ament_python --node-name my_node my_robot_pkg

# Package structure created:
# my_robot_pkg/
# ├── package.xml           # Package metadata and dependencies
# ├── setup.py              # Python package configuration
# ├── setup.cfg             # Entry point configuration
# ├── resource/
# │   └── my_robot_pkg      # Resource marker file
# ├── my_robot_pkg/
# │   ├── __init__.py        # Python package init
# │   └── my_node.py         # Your node
# └── test/
#     ├── test_copyright.py
#     ├── test_flake8.py
#     └── test_pep257.py
```

## Package Structure

### package.xml

The manifest file defines package metadata and dependencies.

```xml
<?xml version="1.0"?>
<package format="3">
  <name>my_robot_pkg</name>
  <version>0.1.0</version>
  <description>My robot perception package</description>
  <maintainer email="you@email.com">Your Name</maintainer>
  <license>Apache-2.0</license>

  <!-- Build dependencies -->
  <buildtool_depend>ament_python</buildtool_depend>

  <!-- Runtime dependencies -->
  <exec_depend>rclpy</exec_depend>
  <exec_depend>std_msgs</exec_depend>
  <exec_depend>sensor_msgs</exec_depend>
  <exec_depend>geometry_msgs</exec_depend>
  <exec_depend>cv_bridge</exec_depend>

  <!-- Test dependencies -->
  <test_depend>ament_copyright</test_depend>
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>
```

### setup.py

```python
from setuptools import find_packages, setup

package_name = 'my_robot_pkg'

setup(
    name=package_name,
    version='0.1.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        # Include launch files
        ('share/' + package_name + '/launch',
            ['launch/robot.launch.py']),
        # Include config files
        ('share/' + package_name + '/config',
            ['config/params.yaml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Your Name',
    maintainer_email='you@email.com',
    description='My robot perception package',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'camera_node = my_robot_pkg.camera_node:main',
            'detector_node = my_robot_pkg.detector_node:main',
        ],
    },
)
```

### setup.cfg

```ini
[develop]
script_dir=$base/lib/my_robot_pkg

[install]
install_scripts=$base/lib/my_robot_pkg
```

## Building Packages

### Using colcon

```bash
cd ~/ros2_ws

# Build all packages
colcon build

# Build specific package
colcon build --packages-select my_robot_pkg

# Build with symlink install (faster iteration)
colcon build --symlink-install

# Source the workspace
source install/setup.bash
```

### Build Output

```
~/ros2_ws/
├── src/          # Source packages (your code)
├── build/        # Build artifacts (temporary)
├── install/      # Installed packages (what you use)
└── log/          # Build logs
```

### Common Build Flags

```bash
# Parallel build with limited jobs
colcon build --parallel-workers 4

# Build with verbose output
colcon build --event-handlers console_direct+

# Clean build
rm -rf build/ install/ log/
colcon build
```

## Launch Files

Launch files start multiple nodes with configured parameters.

```python
# launch/robot.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_pkg',
            executable='camera_node',
            name='camera',
            parameters=[{
                'image_topic': '/camera/image_raw',
                'frame_rate': 30,
            }],
            remappings=[
                ('/camera/image_raw', '/front_camera/image'),
            ],
        ),
        Node(
            package='my_robot_pkg',
            executable='detector_node',
            name='detector',
            parameters=['config/detector_params.yaml'],
        ),
    ])
```

```bash
# Run a launch file
ros2 launch my_robot_pkg robot.launch.py
```

## Parameters

Parameters configure node behavior at runtime.

### Declaring Parameters

```python
class ConfigurableNode(Node):
    def __init__(self):
        super().__init__('configurable_node')
        # Declare parameters with defaults
        self.declare_parameter('update_rate', 10.0)
        self.declare_parameter('threshold', 0.5)
        self.declare_parameter('model_path', '/models/detector.onnx')

        # Use parameter values
        rate = self.get_parameter('update_rate').value
        self.timer = self.create_timer(1.0 / rate, self.update)
```

### Parameter Files (YAML)

```yaml
# config/params.yaml
configurable_node:
  ros__parameters:
    update_rate: 30.0
    threshold: 0.8
    model_path: /opt/models/yolov8.onnx
```

### Runtime Parameter Changes

```bash
# Get a parameter
ros2 param get /configurable_node threshold

# Set a parameter at runtime
ros2 param set /configurable_node threshold 0.9

# Dump all parameters
ros2 param dump /configurable_node
```

## Package Dependencies

### Finding Available Packages

```bash
# List all installed packages
ros2 pkg list

# Find a package prefix
ros2 pkg prefix sensor_msgs

# List executables in a package
ros2 pkg executables my_robot_pkg
```

### Common Message Packages

| Package | Messages | Use Case |
|---------|----------|----------|
| `std_msgs` | String, Int32, Float64, Bool | Basic types |
| `sensor_msgs` | Image, LaserScan, Imu, PointCloud2 | Sensor data |
| `geometry_msgs` | Twist, Pose, Transform | Spatial data |
| `nav_msgs` | OccupancyGrid, Path, Odometry | Navigation |
| `visualization_msgs` | Marker, MarkerArray | Visualization |

## Best Practices

1. **One package per concern**: Separate perception, planning, and control
2. **Version your packages**: Use semantic versioning in `package.xml`
3. **Document dependencies**: List all deps in `package.xml`, not just `setup.py`
4. **Use `--symlink-install`**: Faster iteration during development
5. **Test your packages**: Include unit tests in the `test/` directory

## Next Steps

With packages set up, continue to [Python Agents](./python-agents.md) to build full ROS 2 applications using rclpy.
