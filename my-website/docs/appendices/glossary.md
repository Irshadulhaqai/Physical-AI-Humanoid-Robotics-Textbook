---
sidebar_position: 2
title: "Glossary"
sidebar_label: "Glossary"
description: "Comprehensive glossary of 110+ technical terms for Physical AI, humanoid robotics, ROS 2, simulation, and AI-powered perception and planning."
keywords: [glossary, definitions, terminology, ros2, robotics, ai, isaac]
estimated_time: "15 minutes"
prerequisites: []
learning_objectives:
  - "Look up unfamiliar terms encountered in the course"
  - "Understand acronyms and abbreviations used in robotics"
---

**Estimated Time**: 15 minutes

:::info[What You'll Learn]
- Look up unfamiliar terms encountered in the course
- Understand acronyms and abbreviations used in robotics
:::

:::note[Prerequisites]
No prerequisites -- use this glossary as a reference throughout the course.
:::

A comprehensive reference of technical terms used throughout this course, organized alphabetically.

:::tip[How to Use This Glossary]
Each term includes the module where it is primarily introduced. Use your browser's search (Ctrl+F) to quickly find specific terms.
:::

---

## A

### Action (ROS 2)
A communication pattern for long-running tasks with feedback and cancellation. Combines topics (feedback) and services (goal/result). *Module 1*

### Actuator
A device that converts control signals into physical motion. Examples: electric motors, pneumatic cylinders, hydraulic systems. *Introduction*

### Ament
The build system used by ROS 2 packages. `ament_python` for Python packages, `ament_cmake` for C++. *Module 1*

### A* (A-Star)
A graph search algorithm that finds the shortest path by combining actual distance traveled with a heuristic estimate to the goal. Used in Nav2. *Module 3*

### ASR (Automatic Speech Recognition)
Technology that converts spoken language into text. Whisper is a common ASR model used in robotics. *Module 4*

## B

### Behavior Tree
A hierarchical control structure used by Nav2 to manage complex robot behaviors with sequences, fallbacks, and conditions. *Module 3*

### BLDC (Brushless DC Motor)
The most common motor type in humanoid robots, offering high torque-to-weight ratio and precise control. *Introduction*

### Bundle Adjustment
An optimization technique in visual SLAM that refines the 3D positions of landmarks and camera poses simultaneously. *Module 3*

## C

### Chain of Thought (CoT)
A prompting technique for LLMs where the model reasons step-by-step before generating a final answer. Used in cognitive planning. *Module 4*

### CAN Bus
Controller Area Network -- a communication protocol commonly used in robots for motor controllers and sensors. *Introduction*

### colcon
The build tool for ROS 2 workspaces. Builds packages in dependency order and manages the install space. *Module 1*

### Collision Geometry
Simplified shapes used for physics collision detection in simulation, often simpler than visual meshes. *Module 2*

### COM (Center of Mass)
The average position of all mass in the robot, critical for balance control in humanoid robots. *Module 4*

### Computational Graph
The network of ROS 2 processes (nodes) connected by communication channels (topics, services, actions). *Module 1*

### Costmap
A 2D grid representation of the environment where each cell has a cost value indicating traversability. Used by Nav2 for path planning. *Module 3*

### CUDA
NVIDIA's parallel computing platform and API for GPU-accelerated computing. Required for Isaac Sim and TensorRT. *Module 3*

### cv_bridge
A ROS 2 package that converts between ROS Image messages and OpenCV image formats. *Module 1*

## D

### DDS (Data Distribution Service)
The middleware standard used by ROS 2 for real-time, scalable, publish-subscribe data distribution. *Module 1*

### Depth Camera
A sensor that measures distance to objects per-pixel, producing depth maps. Technologies include stereo, structured light, and time-of-flight. *Introduction*

### Digital Twin
A virtual representation of a physical system that mirrors its real-world counterpart in simulation. *Module 2*

### DOF (Degrees of Freedom)
The number of independent parameters that define a system's configuration. A typical humanoid has 30-40 DOF. *Module 4*

### Domain Randomization
Varying simulation parameters (friction, mass, lighting, textures) during training to improve policy robustness for sim-to-real transfer. *Module 3*

### DOPE (Deep Object Pose Estimation)
An NVIDIA model for detecting objects and estimating their 6-DOF pose from RGB images. *Module 3*

### DWB (Dynamic Window Approach - B)
A local planner in Nav2 that selects velocity commands by evaluating trajectories within dynamic constraints. *Module 3*

## E

### ELU (Exponential Linear Unit)
An activation function used in neural networks, common in RL policy networks. *Module 3*

### End-Effector
The device at the end of a robot arm that interacts with the environment (gripper, tool, hand). *Module 4*

### Encoder
A sensor that measures the position or velocity of a joint or motor shaft. *Introduction*

### Episode
One complete run of an RL task from start to termination. *Module 3*

### ERP (Error Reduction Parameter)
A physics simulation parameter that controls how quickly constraint errors are corrected. *Module 2*

## F

### FK (Forward Kinematics)
Computing the position and orientation of the end-effector given joint angles. *Module 4*

### FP16 (Half Precision)
16-bit floating point format used to accelerate neural network inference on GPUs with minimal accuracy loss. *Module 3*

### Frame (TF)
A coordinate system in the TF2 transform tree, attached to a robot link or sensor. *Module 1*

### Friction (Simulation)
The resistance force between two contacting surfaces. Configured as mu (μ) in SDF/URDF. *Module 2*

## G

### GAE (Generalized Advantage Estimation)
A method for computing advantage functions in RL that balances bias and variance. *Module 3*

### Gazebo
An open-source robot simulation platform integrated with ROS 2 for physics-based testing. Gazebo Harmonic is the current version. *Module 2*

### GR00T (Generalist Robot 00 Technology)
NVIDIA's foundation model for humanoid robots, trained on diverse manipulation and locomotion data. *Module 4*

### Gripper
An end-effector designed for grasping objects. Types include parallel jaw, 3-finger adaptive, and dexterous hands. *Module 4*

### Grounding (LLM)
Connecting LLM-generated text (plans, descriptions) to actual robot capabilities and real-world state. *Module 4*

## H

### Harmonic Drive
A gear mechanism commonly used in robot joints, providing high reduction ratios with zero backlash. *Introduction*

### HIL (Hardware-in-the-Loop)
A testing method where real hardware components are connected to a simulated environment. *Module 2*

### HRI (Human-Robot Interaction)
The study and design of communication and collaboration between humans and robots. *Module 4*

## I

### IK (Inverse Kinematics)
Computing the joint angles needed to place the end-effector at a desired position and orientation. *Module 4*

### IMU (Inertial Measurement Unit)
A sensor combining accelerometer, gyroscope, and sometimes magnetometer to measure orientation and motion. *Introduction*

### Inertia (Moment of)
A measure of an object's resistance to rotational acceleration, specified as a 3x3 tensor in URDF. *Module 2*

### Inflation Layer
A costmap layer that adds a safety buffer around obstacles, preventing the robot from navigating too close. *Module 3*

### Isaac Sim
NVIDIA's robotics simulation platform built on Omniverse, featuring photorealistic rendering, GPU-accelerated physics, and AI tools. *Module 3*

## J

### Jacobian
A matrix relating joint velocities to end-effector velocities, fundamental to robot control and IK. *Module 4*

### Joint (URDF)
A connection between two links that defines their relative motion. Types: revolute, continuous, prismatic, fixed. *Module 1*

### Joint State
A ROS 2 message containing position, velocity, and effort values for all robot joints. *Module 1*

## K

### Kalman Filter
An algorithm for estimating system state from noisy sensor measurements. Extended Kalman Filter (EKF) handles nonlinear systems. *Module 3*

### Keypoint
A distinctive point in an image used for feature matching in visual SLAM. *Module 3*

## L

### Launch File
A ROS 2 Python file that starts multiple nodes with configured parameters and remappings. *Module 1*

### LiDAR (Light Detection and Ranging)
A sensor that measures distances using laser pulses, producing 2D scans or 3D point clouds. *Introduction*

### LIPM (Linear Inverted Pendulum Model)
A simplified dynamics model for bipedal walking that treats the robot as an inverted pendulum. *Module 4*

### LLM (Large Language Model)
A neural network trained on large text corpora, used in robotics for task planning and natural language understanding. *Module 4*

### Locomotion
The ability of a robot to move through its environment (walking, rolling, flying). *Module 4*

### Loop Closure
Detection in SLAM that the robot has returned to a previously visited location, enabling map correction. *Module 3*

## M

### Manipulation
The ability of a robot to interact with and move objects using its end-effectors. *Module 4*

### Mermaid
A JavaScript-based diagramming tool that renders diagrams from text descriptions, integrated in Docusaurus. *All Modules*

### Middleware
Software that connects different components of a system. ROS 2 serves as robotics middleware. *Module 1*

### Motion Planning
Computing a collision-free path from current configuration to a goal configuration. *Module 3*

## N

### Nav2 (Navigation 2)
The ROS 2 navigation framework providing path planning, obstacle avoidance, and behavior tree-based navigation. *Module 3*

### Node (ROS 2)
The fundamental computational unit in ROS 2. Each node is a process that performs a specific task. *Module 1*

### Null Space
The space of joint motions that don't affect the end-effector position, used for secondary objectives in IK. *Module 4*

## O

### Occupancy Grid
A 2D or 3D grid where each cell indicates whether that space is occupied, free, or unknown. *Module 3*

### ODE (Open Dynamics Engine)
The default physics engine in Gazebo, providing rigid body dynamics and collision detection. *Module 2*

### Odometry
Estimation of robot position over time based on wheel encoders, IMU, or visual features. *Module 1*

### Omniverse
NVIDIA's platform for 3D design collaboration and simulation, the foundation for Isaac Sim. *Module 3*

### ONNX (Open Neural Network Exchange)
A format for representing machine learning models, enabling interoperability between frameworks. *Module 3*

## P

### PD Controller
Proportional-Derivative controller -- a simple feedback controller used for joint-level position or velocity control. *Module 4*

### Physical AI
AI systems designed to perceive, reason about, and act in the physical world through robotic embodiment. *Introduction*

### PID Controller
Proportional-Integral-Derivative controller -- extends PD with integral term to eliminate steady-state error. *Module 2*

### Point Cloud
A set of 3D points representing surfaces in the environment, typically from LiDAR or depth cameras. *Module 3*

### Policy (RL)
A function (typically a neural network) that maps observations to actions in reinforcement learning. *Module 3*

### PPO (Proximal Policy Optimization)
A popular RL algorithm that updates policies in small, stable steps using clipped objective functions. *Module 3*

### Prism
A syntax highlighting library used in Docusaurus for code blocks. Supports Python, Bash, YAML, C++, and more. *All Modules*

### Proxemics
The study of human use of space and its effect on behavior, applied to HRI for appropriate robot distancing. *Module 4*

### Publisher (ROS 2)
A node endpoint that sends messages to a topic. *Module 1*

## Q

### QoS (Quality of Service)
ROS 2 settings that control reliability, durability, and delivery guarantees for topic communication. *Module 1*

### Quaternion
A 4-component representation of 3D rotation (x, y, z, w), avoiding gimbal lock issues of Euler angles. *Module 1*

## R

### RANSAC (Random Sample Consensus)
An iterative algorithm for fitting models to data with outliers. Used in point cloud processing and SLAM. *Module 3*

### rclpy
The Python client library for ROS 2, providing APIs for creating nodes, publishers, subscribers, and services. *Module 1*

### Reality Gap
The difference between simulation and the real world that causes simulation-trained policies to fail on hardware. *Module 3*

### Reinforcement Learning (RL)
Training approach where an agent learns behavior by receiving rewards for actions in an environment. *Module 3*

### Reward Shaping
Designing the reward function in RL to guide the agent toward desired behavior. *Module 3*

### rmw (ROS Middleware)
The abstraction layer in ROS 2 between the client library (rclpy/rclcpp) and the DDS implementation. *Module 1*

### ROS 2 (Robot Operating System 2)
Middleware for building robot applications, providing tools for hardware abstraction, drivers, and inter-process communication. Jazzy is the current LTS. *Module 1*

### RT-DETR
Real-Time Detection Transformer -- an object detection model optimized for real-time inference. *Module 3*

## S

### SAC (Soft Actor-Critic)
An RL algorithm that maximizes both expected reward and entropy for robust exploration. *Module 3*

### SDF (Simulation Description Format)
An XML format for describing simulation environments and robots, used natively by Gazebo. *Module 2*

### Semantic Segmentation
Classifying every pixel in an image by category (floor, wall, object, person). *Module 3*

### Service (ROS 2)
A request-response communication pattern for synchronous operations between nodes. *Module 1*

### Sim-to-Real
The process of transferring policies trained in simulation to physical robot hardware. *Module 3*

### SLAM (Simultaneous Localization and Mapping)
Building a map of the environment while simultaneously tracking the robot's position within it. *Module 3*

### Subscriber (ROS 2)
A node endpoint that receives messages from a topic. *Module 1*

### Support Polygon
The convex hull of all contact points between the robot and the ground. The ZMP must stay within it for stability. *Module 4*

### System Identification
Measuring and calibrating simulation parameters to match real hardware behavior. *Module 3*

## T

### TensorRT
NVIDIA's high-performance inference optimizer and runtime for deploying neural networks on GPUs. *Module 3*

### TF2 (Transform Library)
ROS 2 library for tracking coordinate frames over time, essential for sensor fusion and robot kinematics. *Module 1*

### TOPS (Tera Operations Per Second)
A measure of AI inference performance, commonly used to compare edge compute platforms. *Introduction*

### Topic (ROS 2)
A named bus for asynchronous streaming of messages between nodes using publish-subscribe pattern. *Module 1*

### TTS (Text-to-Speech)
Technology that converts text into spoken audio. Used for robot verbal feedback. *Module 4*

### Twist (ROS 2 Message)
A geometry message containing linear and angular velocity components, commonly used for robot motion commands. *Module 1*

## U

### URDF (Unified Robot Description Format)
An XML-based file format for describing robot geometry, kinematics, dynamics, and visual properties. *Module 1*

## V

### VLA (Vision-Language-Action)
AI models that combine visual perception, natural language understanding, and action generation for robotics. *Module 4*

### VSLAM (Visual SLAM)
SLAM using camera images as the primary sensor input for localization and mapping. *Module 3*

### Voxel
A 3D pixel -- a unit cube in a 3D grid used for representing occupied space. *Module 3*

## W

### Whisper
OpenAI's automatic speech recognition model, used for converting voice commands to text. *Module 4*

### Workspace (ROS 2)
A directory containing ROS 2 packages organized under `src/`, with `build/`, `install/`, and `log/` directories. *Module 1*

### Wrench
A force-torque combination (6 values: Fx, Fy, Fz, Tx, Ty, Tz) measured by force/torque sensors. *Introduction*

## X

### Xacro (XML Macro)
A macro language for URDF that enables variables, math expressions, and reusable macros. *Module 1*

## Y

### YAML
A human-readable data format used for ROS 2 parameter files and configuration. *Module 1*

### YOLO (You Only Look Once)
A family of real-time object detection models. YOLOv8 is commonly used in robotics perception. *Module 3*

## Z

### ZMP (Zero Moment Point)
The point on the ground where the total moment of active forces is zero. Critical for bipedal balance control. *Module 4*

---

*Total: 110+ terms covering all course modules.*

:::tip[Key Takeaways]
- This glossary covers 110+ terms across all four course modules plus the introduction
- Each term includes the module where it is primarily introduced for easy cross-referencing
- Use Ctrl+F to quickly search for specific terms while studying
:::
