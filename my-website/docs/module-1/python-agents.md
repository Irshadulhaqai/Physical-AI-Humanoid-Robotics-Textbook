---
sidebar_position: 5
title: "Python Agents with rclpy"
sidebar_label: "Python Agents"
description: "Build intelligent robot agents using rclpy, the Python client library for ROS 2, including publishers, subscribers, timers, and lifecycle management."
keywords: [rclpy, python, ros2, publisher, subscriber, agent, lifecycle]
estimated_time: "50 minutes"
prerequisites: ["core-concepts", "building-packages"]
learning_objectives:
  - "Build complete ROS 2 nodes using rclpy"
  - "Implement multi-topic publishers and subscribers"
  - "Use timers and callbacks for periodic processing"
  - "Handle parameters and configuration in Python nodes"
  - "Apply lifecycle management patterns"
---

**Estimated Time**: 50 minutes

:::info[What You'll Learn]
- Build complete ROS 2 nodes using rclpy
- Implement multi-topic publishers and subscribers
- Use timers and callbacks for periodic processing
- Handle parameters and configuration in Python nodes
- Apply lifecycle management patterns
:::

:::note[Prerequisites]
Before starting this chapter, complete:
- [Core Concepts](./core-concepts.md)
- [Building Packages](./building-packages.md)
:::

`rclpy` is the Python client library for ROS 2. It provides a Pythonic API for creating nodes, publishing and subscribing to topics, calling services, and managing actions.

## The rclpy Architecture

```mermaid
flowchart TB
    A[Your Python Code] --> B[rclpy API]
    B --> C[rcl - ROS Client Library]
    C --> D[rmw - Middleware Interface]
    D --> E[DDS Implementation]
    E --> F[Network / Shared Memory]
```

## Building a Complete Agent

Let's build a perception agent that processes camera images and publishes detected objects.

### Project Structure

```text title="Package layout"
my_robot_perception/
├── package.xml
├── setup.py
├── setup.cfg
├── my_robot_perception/
│   ├── __init__.py
│   ├── camera_processor.py
│   ├── object_detector.py
│   └── utils.py
├── launch/
│   └── perception.launch.py
├── config/
│   └── detector_params.yaml
└── test/
    └── test_detector.py
```

### Camera Processor Node

```python title="camera_processor.py" showLineNumbers
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from std_msgs.msg import String
from cv_bridge import CvBridge
import json

class CameraProcessor(Node):
    """Processes camera images and publishes analysis results."""

    def __init__(self):
        super().__init__('camera_processor')

        # Declare parameters
        self.declare_parameter('input_topic', '/camera/image_raw')
        self.declare_parameter('output_topic', '/camera/analysis')
        self.declare_parameter('process_rate', 10.0)

        # Get parameter values
        input_topic = self.get_parameter('input_topic').value
        output_topic = self.get_parameter('output_topic').value

        # highlight-next-line
        # Create subscriber
        self.subscription = self.create_subscription(
            Image, input_topic, self.image_callback, 10)

        # Create publisher
        self.publisher = self.create_publisher(
            String, output_topic, 10)

        # CV Bridge for image conversion
        self.bridge = CvBridge()
        self.frame_count = 0

        self.get_logger().info(
            f'Camera processor started: {input_topic} -> {output_topic}')

    def image_callback(self, msg):
        """Process incoming camera images."""
        self.frame_count += 1
        cv_image = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
        height, width, _ = cv_image.shape

        # Publish analysis result
        result = String()
        result.data = json.dumps({
            'frame': self.frame_count,
            'width': width,
            'height': height,
            'timestamp': msg.header.stamp.sec
        })
        self.publisher.publish(result)

def main(args=None):
    rclpy.init(args=args)
    node = CameraProcessor()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Multi-Topic Communication

Real robot agents often subscribe to multiple topics and coordinate data.

```python title="navigation_agent.py" showLineNumbers
from rclpy.node import Node
from sensor_msgs.msg import LaserScan, Imu
from geometry_msgs.msg import Twist
from message_filters import Subscriber, ApproximateTimeSynchronizer

class NavigationAgent(Node):
    """Combines sensor data for navigation decisions."""

    def __init__(self):
        super().__init__('navigation_agent')

        # Multiple subscribers
        self.scan_sub = self.create_subscription(
            LaserScan, '/scan', self.scan_callback, 10)
        self.imu_sub = self.create_subscription(
            Imu, '/imu/data', self.imu_callback, 10)

        # Publisher for velocity commands
        # highlight-next-line
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)

        # Internal state
        self.latest_scan = None
        self.latest_imu = None

        # Control loop timer at 20 Hz
        self.timer = self.create_timer(0.05, self.control_loop)

    def scan_callback(self, msg):
        self.latest_scan = msg

    def imu_callback(self, msg):
        self.latest_imu = msg

    def control_loop(self):
        """Main control loop combining sensor data."""
        if self.latest_scan is None:
            return

        twist = Twist()
        # highlight-next-line
        min_range = min(self.latest_scan.ranges)

        if min_range < 0.5:
            # Obstacle detected - turn
            twist.angular.z = 0.5
            self.get_logger().warn(
                f'Obstacle at {min_range:.2f}m - turning')
        else:
            # Clear path - move forward
            twist.linear.x = 0.3

        self.cmd_pub.publish(twist)
```

:::tip[Pro Tip]
Use `message_filters.ApproximateTimeSynchronizer` when you need to process messages from multiple topics that arrive at slightly different times — it automatically pairs messages with close timestamps.
:::

## Timers and Callbacks

### Periodic Tasks

```python title="periodic_node.py" showLineNumbers
class PeriodicNode(Node):
    def __init__(self):
        super().__init__('periodic_node')

        # Fast timer for control (100 Hz)
        # highlight-next-line
        self.control_timer = self.create_timer(0.01, self.control_cb)

        # Slow timer for diagnostics (1 Hz)
        self.diag_timer = self.create_timer(1.0, self.diagnostics_cb)

    def control_cb(self):
        """High-frequency control loop."""
        pass

    def diagnostics_cb(self):
        """Low-frequency health reporting."""
        self.get_logger().info('System healthy')
```

### One-Shot Timers

```python title="one_shot_timer.py"
# Execute once after a delay
self.one_shot = self.create_timer(5.0, self.delayed_init)

def delayed_init(self):
    self.get_logger().info('Delayed initialization complete')
    # highlight-next-line
    self.one_shot.cancel()  # Cancel after first execution
```

## Error Handling

```python title="robust_node.py" showLineNumbers
class RobustNode(Node):
    def __init__(self):
        super().__init__('robust_node')
        self.subscription = self.create_subscription(
            Image, '/camera/image', self.image_callback, 10)

    def image_callback(self, msg):
        # highlight-next-line
        try:
            cv_image = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
            self.process_image(cv_image)
        except Exception as e:
            self.get_logger().error(f'Image processing failed: {e}')

    def process_image(self, image):
        """Process image with error recovery."""
        if image is None or image.size == 0:
            self.get_logger().warn('Received empty image')
            return
        # Processing logic here
```

:::warning[Common Mistake]
Never let exceptions propagate out of callbacks — an unhandled exception in a callback will crash the entire node. Always wrap callback logic in try/except blocks.
:::

## Executors and Callback Groups

For concurrent processing, use executors and callback groups.

```python title="concurrent_node.py" showLineNumbers
from rclpy.executors import MultiThreadedExecutor
from rclpy.callback_groups import (
    MutuallyExclusiveCallbackGroup,
    ReentrantCallbackGroup
)

class ConcurrentNode(Node):
    def __init__(self):
        super().__init__('concurrent_node')

        # Separate callback groups for concurrent execution
        # highlight-next-line
        self.sensor_group = ReentrantCallbackGroup()
        self.control_group = MutuallyExclusiveCallbackGroup()

        self.create_subscription(
            Image, '/camera', self.camera_cb, 10,
            callback_group=self.sensor_group)
        self.create_subscription(
            LaserScan, '/scan', self.scan_cb, 10,
            callback_group=self.sensor_group)
        self.create_timer(
            0.05, self.control_cb,
            callback_group=self.control_group)

# Run with multi-threaded executor
executor = MultiThreadedExecutor(num_threads=4)
executor.add_node(ConcurrentNode())
executor.spin()
```

:::info[Key Insight]
`ReentrantCallbackGroup` allows callbacks to run in parallel, while `MutuallyExclusiveCallbackGroup` ensures only one callback runs at a time. Use reentrant for independent sensor callbacks and mutually exclusive for control logic that must not overlap.
:::

## Composable Nodes

Run multiple nodes in a single process for lower overhead.

```python title="launch/composed.launch.py" showLineNumbers
from launch import LaunchDescription
from launch_ros.actions import ComposableNodeContainer
from launch_ros.descriptions import ComposableNode

def generate_launch_description():
    # highlight-next-line
    container = ComposableNodeContainer(
        name='perception_container',
        namespace='',
        package='rclcpp_components',
        executable='component_container',
        composable_node_descriptions=[
            ComposableNode(
                package='my_robot_pkg',
                plugin='CameraNode',
                name='camera'),
            ComposableNode(
                package='my_robot_pkg',
                plugin='DetectorNode',
                name='detector'),
        ],
    )
    return LaunchDescription([container])
```

## Logging

```python title="logging_examples.py" showLineNumbers
# Log levels
self.get_logger().debug('Detailed debug info')
self.get_logger().info('Normal operation message')
self.get_logger().warn('Something unexpected')
self.get_logger().error('Operation failed')
self.get_logger().fatal('System cannot continue')

# highlight-next-line
# Throttled logging (once per 5 seconds)
self.get_logger().info('Heartbeat', throttle_duration_sec=5.0)
```

## Testing Python Nodes

```python title="test/test_camera_processor.py" showLineNumbers
import pytest
import rclpy
from my_robot_pkg.camera_processor import CameraProcessor

@pytest.fixture
def node():
    rclpy.init()
    node = CameraProcessor()
    yield node
    node.destroy_node()
    rclpy.shutdown()

def test_node_creation(node):
    # highlight-next-line
    assert node.get_name() == 'camera_processor'

def test_publisher_created(node):
    topic_names = [t[0] for t in node.get_topic_names_and_types()]
    assert '/camera/analysis' in topic_names
```

:::tip[Key Takeaways]
- `rclpy` provides the Python API for creating ROS 2 nodes with publishers, subscribers, timers, and services
- Use `declare_parameter()` and `get_parameter()` for configurable node behavior
- Combine multiple subscribers with a control loop timer for multi-sensor fusion
- Use `MultiThreadedExecutor` with callback groups for concurrent processing
- Always wrap callback logic in try/except to prevent node crashes
- Use throttled logging to avoid flooding the console in high-frequency callbacks
:::

## Next Steps

- [URDF Basics](./urdf-basics.md) — describe robot models that your agents will control
- [Module 1 Exercises](./exercises.md) — practice building ROS 2 agents hands-on
