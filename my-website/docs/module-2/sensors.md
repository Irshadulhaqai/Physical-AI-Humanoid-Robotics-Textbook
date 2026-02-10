---
sidebar_position: 5
title: "Sensor Simulation in Gazebo"
sidebar_label: "Sensors"
description: "Learn to simulate cameras, LiDAR, IMU, depth sensors, and force/torque sensors in Gazebo with ROS 2 integration for realistic robot perception."
keywords: [sensors, camera, lidar, imu, depth, gazebo, simulation]
estimated_time: "45 minutes"
prerequisites: ["gazebo-setup", "urdf-sdf"]
learning_objectives:
  - "Configure simulated camera sensors with realistic noise models"
  - "Set up LiDAR sensors for 2D and 3D scanning"
  - "Simulate IMU data for robot state estimation"
  - "Add noise and distortion to sensor readings for realism"
---

**Estimated Time**: 45 minutes

:::info[What You'll Learn]
- Configure simulated camera sensors with realistic noise models
- Set up LiDAR sensors for 2D and 3D scanning
- Simulate IMU data for robot state estimation
- Add noise and distortion to sensor readings for realism
:::

:::note[Prerequisites]
Before starting this chapter, complete:
- [Gazebo Setup](./gazebo-setup.md)
- [URDF & SDF](./urdf-sdf.md)
:::

Simulated sensors are critical for developing and testing perception algorithms before deploying to physical hardware. Gazebo provides high-fidelity sensor models that publish data through ROS 2 topics.

## Sensor Overview

```mermaid
flowchart TB
    subgraph Gazebo["Gazebo Simulation"]
        CAM[Camera Sensor]
        LID[LiDAR Sensor]
        IMU_S[IMU Sensor]
        DEP[Depth Camera]
        FT[Force/Torque]
    end
    subgraph ROS["ROS 2 Topics"]
        IMG[/camera/image_raw<br/>sensor_msgs/Image]
        SCAN[/scan<br/>sensor_msgs/LaserScan]
        IMU_T[/imu/data<br/>sensor_msgs/Imu]
        PCD[/depth/points<br/>sensor_msgs/PointCloud2]
        WRE[/wrench<br/>geometry_msgs/WrenchStamped]
    end
    CAM --> IMG
    LID --> SCAN
    IMU_S --> IMU_T
    DEP --> PCD
    FT --> WRE
```

## Camera Sensors

### RGB Camera

```xml title="RGB camera sensor plugin" showLineNumbers
<gazebo reference="camera_link">
  <!-- highlight-next-line -->
  <sensor name="rgb_camera" type="camera">
    <always_on>true</always_on>
    <update_rate>30.0</update_rate>
    <camera>
      <horizontal_fov>1.047</horizontal_fov>
      <image>
        <width>640</width>
        <height>480</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.1</near>
        <far>100.0</far>
      </clip>
      <noise>
        <type>gaussian</type>
        <mean>0.0</mean>
        <stddev>0.007</stddev>
      </noise>
      <distortion>
        <k1>-0.25</k1>
        <k2>0.12</k2>
        <p1>0.001</p1>
        <p2>-0.001</p2>
        <center>0.5 0.5</center>
      </distortion>
    </camera>
    <plugin name="camera_plugin"
            filename="libgazebo_ros_camera.so">
      <ros>
        <remapping>~/image_raw:=/camera/image_raw</remapping>
        <remapping>~/camera_info:=/camera/camera_info</remapping>
      </ros>
      <frame_name>camera_link</frame_name>
    </plugin>
  </sensor>
</gazebo>
```

### Depth Camera

```xml title="Depth camera sensor plugin" showLineNumbers
<gazebo reference="depth_camera_link">
  <!-- highlight-next-line -->
  <sensor name="depth_camera" type="depth">
    <always_on>true</always_on>
    <update_rate>15.0</update_rate>
    <camera>
      <horizontal_fov>1.047</horizontal_fov>
      <image>
        <width>640</width>
        <height>480</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.3</near>
        <far>10.0</far>
      </clip>
    </camera>
    <plugin name="depth_camera_plugin"
            filename="libgazebo_ros_camera.so">
      <ros>
        <remapping>~/image_raw:=/depth/image_raw</remapping>
        <remapping>~/depth/image_raw:=/depth/depth_image</remapping>
        <remapping>~/points:=/depth/points</remapping>
      </ros>
      <frame_name>depth_camera_link</frame_name>
      <min_depth>0.3</min_depth>
      <max_depth>10.0</max_depth>
    </plugin>
  </sensor>
</gazebo>
```

### Viewing Camera Data

```bash title="View camera output"
# View camera image
ros2 run rqt_image_view rqt_image_view /camera/image_raw

# Check camera info
ros2 topic echo /camera/camera_info --once
```

## LiDAR Sensors

### 2D LiDAR (LaserScan)

```xml title="2D LiDAR sensor plugin" showLineNumbers
<gazebo reference="lidar_link">
  <!-- highlight-next-line -->
  <sensor name="lidar" type="ray">
    <always_on>true</always_on>
    <update_rate>10.0</update_rate>
    <visualize>true</visualize>
    <ray>
      <scan>
        <horizontal>
          <samples>360</samples>
          <resolution>1</resolution>
          <min_angle>-3.14159</min_angle>
          <max_angle>3.14159</max_angle>
        </horizontal>
      </scan>
      <range>
        <min>0.12</min>
        <max>12.0</max>
        <resolution>0.01</resolution>
      </range>
      <noise>
        <type>gaussian</type>
        <mean>0.0</mean>
        <stddev>0.01</stddev>
      </noise>
    </ray>
    <plugin name="lidar_plugin"
            filename="libgazebo_ros_ray_sensor.so">
      <ros>
        <remapping>~/out:=/scan</remapping>
      </ros>
      <output_type>sensor_msgs/LaserScan</output_type>
      <frame_name>lidar_link</frame_name>
    </plugin>
  </sensor>
</gazebo>
```

### 3D LiDAR (PointCloud)

```xml title="3D LiDAR sensor plugin" showLineNumbers
<gazebo reference="lidar_3d_link">
  <sensor name="lidar_3d" type="ray">
    <always_on>true</always_on>
    <update_rate>10.0</update_rate>
    <ray>
      <scan>
        <horizontal>
          <samples>1800</samples>
          <resolution>1</resolution>
          <min_angle>-3.14159</min_angle>
          <max_angle>3.14159</max_angle>
        </horizontal>
        <!-- highlight-next-line -->
        <vertical>
          <samples>16</samples>
          <resolution>1</resolution>
          <min_angle>-0.261799</min_angle>
          <max_angle>0.261799</max_angle>
        </vertical>
      </scan>
      <range>
        <min>0.5</min>
        <max>100.0</max>
      </range>
    </ray>
    <plugin name="lidar_3d_plugin"
            filename="libgazebo_ros_ray_sensor.so">
      <ros>
        <remapping>~/out:=/lidar/points</remapping>
      </ros>
      <output_type>sensor_msgs/PointCloud2</output_type>
      <frame_name>lidar_3d_link</frame_name>
    </plugin>
  </sensor>
</gazebo>
```

:::info[Key Insight]
3D LiDARs add a `<vertical>` scan element to sweep multiple beam layers. A 16-layer LiDAR (like Velodyne VLP-16) produces PointCloud2 data ideal for 3D mapping and obstacle detection.
:::

## IMU Sensor

```xml title="IMU sensor with noise model" showLineNumbers
<gazebo reference="imu_link">
  <!-- highlight-next-line -->
  <sensor name="imu_sensor" type="imu">
    <always_on>true</always_on>
    <update_rate>200.0</update_rate>
    <imu>
      <angular_velocity>
        <x><noise type="gaussian">
          <mean>0.0</mean><stddev>0.0002</stddev>
        </noise></x>
        <y><noise type="gaussian">
          <mean>0.0</mean><stddev>0.0002</stddev>
        </noise></y>
        <z><noise type="gaussian">
          <mean>0.0</mean><stddev>0.0002</stddev>
        </noise></z>
      </angular_velocity>
      <linear_acceleration>
        <x><noise type="gaussian">
          <mean>0.0</mean><stddev>0.017</stddev>
        </noise></x>
        <y><noise type="gaussian">
          <mean>0.0</mean><stddev>0.017</stddev>
        </noise></y>
        <z><noise type="gaussian">
          <mean>0.0</mean><stddev>0.017</stddev>
        </noise></z>
      </linear_acceleration>
    </imu>
    <plugin name="imu_plugin"
            filename="libgazebo_ros_imu_sensor.so">
      <ros>
        <remapping>~/out:=/imu/data</remapping>
      </ros>
      <frame_name>imu_link</frame_name>
    </plugin>
  </sensor>
</gazebo>
```

## Force/Torque Sensor

```xml title="Force/torque sensor on wrist joint" showLineNumbers
<gazebo reference="wrist_joint">
  <provideFeedback>true</provideFeedback>
</gazebo>
<gazebo>
  <!-- highlight-next-line -->
  <plugin name="ft_sensor"
          filename="libgazebo_ros_ft_sensor.so">
    <ros>
      <remapping>wrench:=/wrist/wrench</remapping>
    </ros>
    <joint_name>wrist_joint</joint_name>
    <update_rate>100.0</update_rate>
  </plugin>
</gazebo>
```

## Sensor Noise Models

Adding realistic noise improves sim-to-real transfer:

| Sensor | Noise Type | Typical Values |
|--------|-----------|---------------|
| Camera | Gaussian pixel | stddev: 0.007 |
| LiDAR | Gaussian range | stddev: 0.01m |
| IMU gyro | Gaussian + drift | stddev: 0.0002 rad/s |
| IMU accel | Gaussian + bias | stddev: 0.017 m/s2 |
| Depth | Gaussian + quantization | stddev: 0.001m |

:::warning[Common Mistake]
Running perception algorithms without sensor noise in simulation leads to poor sim-to-real transfer. Always add realistic noise models to your simulated sensors — perfect data does not exist on real hardware.
:::

## Processing Sensor Data in ROS 2

```python title="sensor_fusion.py" showLineNumbers
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan, Image, Imu
from cv_bridge import CvBridge
import numpy as np

class SensorFusion(Node):
    """Fuses data from multiple simulated sensors."""

    def __init__(self):
        super().__init__('sensor_fusion')
        self.bridge = CvBridge()

        # highlight-next-line
        self.create_subscription(
            Image, '/camera/image_raw', self.image_cb, 10)
        self.create_subscription(
            LaserScan, '/scan', self.scan_cb, 10)
        self.create_subscription(
            Imu, '/imu/data', self.imu_cb, 10)

    def image_cb(self, msg):
        cv_image = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
        self.get_logger().info(
            f'Image: {cv_image.shape}', throttle_duration_sec=5.0)

    def scan_cb(self, msg):
        ranges = np.array(msg.ranges)
        valid = ranges[np.isfinite(ranges)]
        self.get_logger().info(
            f'LiDAR: min={valid.min():.2f}m, max={valid.max():.2f}m',
            throttle_duration_sec=5.0)

    def imu_cb(self, msg):
        self.get_logger().info(
            f'IMU: accel_z={msg.linear_acceleration.z:.2f}',
            throttle_duration_sec=5.0)
```

:::tip[Key Takeaways]
- Gazebo simulates cameras, LiDAR, IMU, depth sensors, and force/torque sensors with ROS 2 integration
- Each sensor publishes on standard ROS 2 message types (Image, LaserScan, Imu, PointCloud2)
- Add Gaussian noise to all sensors for realistic sim-to-real transfer
- Camera distortion parameters (k1, k2, p1, p2) model real lens imperfections
- 3D LiDARs use vertical scan layers to produce PointCloud2 data
- Use `rqt_image_view` and rviz2 to visualize sensor data in real time
:::

## Next Steps

- [Unity Bridge](./unity-bridge.md) — high-fidelity visualization and synthetic data generation
- [Module 2 Exercises](./exercises.md) — practice sensor configuration hands-on
