# Feature Specification: Module 1 — ROS 2 Jazzy Chapter Content

**Feature Branch**: `004-module1-ros2-chapters`
**Created**: 2026-02-14
**Status**: Draft
**Input**: Write detailed, production-quality content for Module 1 chapters covering ROS 2 Jazzy fundamentals for the Physical AI & Humanoid Robotics textbook. Update existing placeholder chapters with authoritative, technically accurate content based on ROS 2 Jazzy documentation and humanoid robotics best practices.

## Context

Module 1 ("The Robotic Nervous System — ROS 2") is the foundational module of the Physical AI & Humanoid Robotics course. It teaches students to use ROS 2 Jazzy Jalisco as the middleware layer for humanoid robot control. The module consists of 6 chapters (1.1–1.6) plus an overview page, totaling ~6 hours of study time.

**Current state**: All 6 chapters exist with structured content (~2,000 lines total) including code examples, Mermaid diagrams, and exercises. Content needs enhancement with updated installation procedures, deeper humanoid-specific examples, common pitfalls coverage, and authoritative technical accuracy verified against ROS 2 Jazzy official documentation.

**Target ROS 2 version**: Jazzy Jalisco (May 2024, EOL May 2029)
**Target OS**: Ubuntu 24.04 LTS (Noble Numbat)
**Python version**: 3.12

## Learning Objectives (Module-Level)

Upon completing Module 1, students will be able to:

1. Install and configure ROS 2 Jazzy on Ubuntu 24.04 for humanoid robotics development
2. Explain and apply the ROS 2 computational graph model (nodes, topics, services, actions)
3. Create Python-based ROS 2 packages using the ament build system and colcon workflow
4. Build intelligent robot agents with rclpy including multi-sensor fusion and error handling
5. Author URDF/Xacro descriptions for humanoid robots with proper kinematic chains
6. Debug common ROS 2 issues including QoS mismatches, callback deadlocks, and TF2 errors

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Installation & Environment Setup (Priority: P1)

A student with a fresh Ubuntu 24.04 installation follows Chapter 1.1 to install ROS 2 Jazzy, verify the installation, and install humanoid-robotics-specific packages. The chapter must use the current official installation method (ros2-apt-source package) and include troubleshooting for the most common failure modes.

**Why this priority**: Without a working ROS 2 installation, no subsequent chapter is usable. This is the gateway chapter.

**Independent Test**: A student with a clean Ubuntu 24.04 VM follows the chapter end-to-end and has a verified working ROS 2 Jazzy installation with `ros2 run demo_nodes_cpp talker` / `ros2 run demo_nodes_py listener` communicating successfully.

**Acceptance Scenarios**:

1. **Given** a fresh Ubuntu 24.04 install, **When** a student follows all steps in Chapter 1.1, **Then** `ros2 doctor --report` shows no errors and `ros2 topic list` returns at least `/parameter_events` and `/rosout`
2. **Given** a completed base install, **When** a student installs the recommended humanoid packages, **Then** `ros2 pkg list | grep -c ros` returns 200+ packages including `ros2_control`, `joint_state_publisher_gui`, and `xacro`
3. **Given** an installation failure, **When** a student consults the Troubleshooting section, **Then** the documented fix resolves the issue for at least the 5 most common failure modes (locale, GPG key, package conflict, sourcing, command not found)

---

### User Story 2 — Core Concepts Mastery (Priority: P1)

A student learns the ROS 2 computational graph model and can distinguish between topics (streaming), services (request-response), and actions (long-running with feedback). The chapter must include humanoid-relevant examples (joint states, sensor data, walk commands) and cover QoS profiles with compatibility rules.

**Why this priority**: Core concepts are the mental model for everything that follows. Misunderstanding topics vs services vs actions leads to incorrect architecture decisions.

**Independent Test**: A student can correctly identify which communication pattern (topic/service/action) to use for 5 different humanoid robot scenarios and explain why.

**Acceptance Scenarios**:

1. **Given** a student has read Chapter 1.2, **When** presented with "streaming IMU data at 200 Hz," **Then** the student selects Topics with Best Effort QoS and can explain why
2. **Given** a student has read the QoS section, **When** a Reliable subscriber connects to a Best Effort publisher, **Then** the student can predict "no data will be received" and explain the compatibility rule
3. **Given** the "Common Mistakes" section, **When** a student encounters a service deadlock in a single-threaded callback, **Then** the chapter provides a clear explanation and the MultiThreadedExecutor fix

---

### User Story 3 — Package Development Workflow (Priority: P1)

A student creates a complete Python ROS 2 package from scratch, builds it with colcon, and runs their node. The chapter covers the full development cycle: create, configure, build, source, run, iterate.

**Why this priority**: Package creation is the hands-on skill that transforms passive reading into active development. Every subsequent exercise depends on knowing how to create and build packages.

**Independent Test**: A student creates a new package with `ros2 pkg create`, adds a custom node with a publisher and subscriber, builds with `colcon build --symlink-install`, and successfully runs it with `ros2 run`.

**Acceptance Scenarios**:

1. **Given** a sourced ROS 2 workspace, **When** a student follows the package creation steps, **Then** `colcon build` succeeds with zero errors and `ros2 run my_package my_node` starts the node
2. **Given** a package with launch files and parameter YAML, **When** a student runs `ros2 launch my_package bringup.launch.py`, **Then** multiple nodes start with correct parameters and remappings
3. **Given** a student modifies Python source code, **When** using `--symlink-install`, **Then** the node reflects changes without rebuilding (for Python files)

---

### User Story 4 — Python Agent Development (Priority: P2)

A student builds intelligent robot agents using rclpy, including multi-topic communication, timer patterns, error handling, executors, and composable nodes. The chapter emphasizes humanoid-specific patterns: joint state reading, trajectory commanding, and multi-sensor fusion.

**Why this priority**: This is where students transition from understanding concepts to building real robot control software. Depends on US2 (concepts) and US3 (packages).

**Independent Test**: A student implements a multi-node system where a sensor reader publishes joint states, a controller node processes them and publishes trajectory commands, and both run correctly in a single launch file.

**Acceptance Scenarios**:

1. **Given** the rclpy architecture section, **When** a student reads it, **Then** they can trace the call path from Python `Node.create_publisher()` through rcl to the DDS middleware
2. **Given** the multi-sensor fusion example, **When** a student implements it, **Then** the node correctly receives data from 3+ topics concurrently using `ReentrantCallbackGroup` and a `MultiThreadedExecutor`
3. **Given** the error handling section, **When** a student wraps callbacks in try/except, **Then** node exceptions are logged instead of silently crashing the process
4. **Given** the lifecycle node section, **When** a student implements `on_configure` / `on_activate` / `on_deactivate`, **Then** the node transitions cleanly between states with hardware resource management

---

### User Story 5 — URDF Robot Description (Priority: P2)

A student creates URDF/Xacro descriptions for humanoid robots, understanding links, joints, the TF2 transform tree, and visualization in rviz2. The chapter includes a complete humanoid leg macro demonstrating Xacro's power for symmetric structures.

**Why this priority**: URDF is essential for simulation (Module 2) and real robot deployment (Module 3+). Students need it before they can work with Gazebo or Isaac.

**Independent Test**: A student creates a Xacro file describing a humanoid lower body (pelvis + 2 legs with 6 DOF each), processes it with `xacro`, validates with `check_urdf`, and visualizes in rviz2 with `joint_state_publisher_gui` controlling all joints.

**Acceptance Scenarios**:

1. **Given** the URDF structure section, **When** a student writes a minimal robot with 2 links and 1 revolute joint, **Then** `check_urdf` validates it and rviz2 displays it correctly
2. **Given** the Xacro macros section, **When** a student defines a `leg` macro and instantiates it twice with `reflect` parameter, **Then** both legs appear correctly mirrored in rviz2
3. **Given** the TF2 section, **When** `robot_state_publisher` runs with the humanoid URDF, **Then** `ros2 run tf2_tools view_frames` generates a complete transform tree PDF showing all joints
4. **Given** the sensor attachment section, **When** a student adds a camera to the head link, **Then** the camera frame appears in TF2 at the correct position relative to the head

---

### User Story 6 — Hands-On Exercises (Priority: P2)

A student completes progressive exercises that reinforce all module concepts: environment verification, pub/sub, services, multi-node systems, URDF modeling, and a challenge exercise. Each exercise includes specification, starter code, expected output, and a verification checklist.

**Why this priority**: Exercises are where learning solidifies. Without practice, concepts remain theoretical. Depends on all previous chapters.

**Independent Test**: A student completes Exercise 4 (Multi-Node System) end-to-end: creates 3 interconnected nodes (sensor → decision → motor), builds the package, and verifies data flow through all nodes.

**Acceptance Scenarios**:

1. **Given** Exercise 1 (Environment Verification), **When** a student runs all 6 verification checks, **Then** each check passes confirming a working ROS 2 installation
2. **Given** Exercise 2 (Custom Publisher-Subscriber), **When** a student implements the temperature sensor, **Then** the subscriber receives and displays temperature readings at the expected rate
3. **Given** Exercise 5 (URDF Robot Model), **When** a student builds a 3-wheeled robot with camera, **Then** `check_urdf` validates and rviz2 displays all joints and links correctly
4. **Given** the Challenge Exercise (Parameterized Patrol Robot), **When** a student implements it with launch file parameters, **Then** the robot navigates waypoints using configurable speed and pause duration

---

### Edge Cases

- **Installation on non-Ubuntu systems**: Chapter must clearly state Ubuntu 24.04 is required (Tier 1) and provide Docker container alternative for macOS/Windows students
- **ROS 2 version conflicts**: Students may have Humble installed. Chapter must cover managing multiple ROS 2 versions and preventing sourcing conflicts
- **QoS silent failures**: When publisher and subscriber QoS profiles are incompatible, no error is raised — messages are silently dropped. Chapter must explicitly teach this debugging pattern
- **Service deadlock in single-threaded executor**: Calling a service from within a callback causes permanent deadlock. This is the #1 reported student bug and must be covered with clear explanation and fix
- **URDF inertia values**: Missing or incorrect inertial properties cause simulation instability. Chapter must provide inertia calculation macros and validation guidance
- **`use_sim_time` mismatch**: When some nodes use simulation time and others use wall time, TF2 lookups fail with extrapolation errors. Must be documented
- **Forgetting to source workspace**: The most common "why doesn't my package work" issue. Must be emphasized with clear troubleshooting step

## Requirements *(mandatory)*

### Functional Requirements

#### Chapter 1.1 — Installation (FR-001 to FR-012)

- **FR-001**: Chapter MUST document the current official installation method using the `ros2-apt-source` package (not the legacy manual GPG key method)
- **FR-002**: Chapter MUST specify Ubuntu 24.04 LTS as the required operating system with clear version requirement
- **FR-003**: Chapter MUST include a system requirements section listing minimum hardware (RAM, disk, CPU)
- **FR-004**: Chapter MUST include step-by-step installation with exact terminal commands that can be copy-pasted
- **FR-005**: Chapter MUST include verification steps confirming successful installation (talker/listener demo, `ros2 doctor`)
- **FR-006**: Chapter MUST list humanoid-robotics-specific packages to install (`ros2_control`, `ros2_controllers`, `joint_state_publisher_gui`, `robot_state_publisher`, `xacro`, `moveit`)
- **FR-007**: Chapter MUST include a Troubleshooting section covering at least 5 common installation failures with solutions
- **FR-008**: Chapter MUST document shell environment setup (`source /opt/ros/jazzy/setup.bash`) and workspace overlay pattern
- **FR-009**: Chapter MUST include a Docker alternative for students not on Ubuntu 24.04
- **FR-010**: Chapter MUST document the difference between `ros-jazzy-desktop` (full) and `ros-jazzy-ros-base` (minimal) installations
- **FR-011**: Chapter MUST include a workspace creation section (`mkdir -p ~/ros2_ws/src`)
- **FR-012**: Chapter MUST document `colcon` and `rosdep` installation via `ros-dev-tools`

#### Chapter 1.2 — Core Concepts (FR-013 to FR-028)

- **FR-013**: Chapter MUST explain the computational graph model with a visual diagram showing nodes, topics, services, and actions
- **FR-014**: Chapter MUST define Nodes as the fundamental unit of computation with unique names and single-responsibility principle
- **FR-015**: Chapter MUST explain Topics as asynchronous, many-to-many, typed message channels with queue depth
- **FR-016**: Chapter MUST provide a working publisher example with `create_publisher()` and `publish()`
- **FR-017**: Chapter MUST provide a working subscriber example with `create_subscription()` and a callback function
- **FR-018**: Chapter MUST explain Services as synchronous request-response with `.srv` file structure (Request `---` Response)
- **FR-019**: Chapter MUST provide working service server and async client examples
- **FR-020**: Chapter MUST explain Actions as long-running tasks with Goal/Result/Feedback and cancellation support
- **FR-021**: Chapter MUST provide working action server and action client examples with feedback handling
- **FR-022**: Chapter MUST include a comparison table: "When to use Topics vs Services vs Actions" with humanoid robot examples
- **FR-023**: Chapter MUST explain Quality of Service (QoS) profiles: Reliability, Durability, History, Depth
- **FR-024**: Chapter MUST document QoS compatibility rules and what happens on mismatch (silent data loss)
- **FR-025**: Chapter MUST include a "Common Mistakes" section covering: service deadlock, QoS mismatch, forgetting to rebuild/source, exception propagation in callbacks, `use_sim_time` mismatch
- **FR-026**: Chapter MUST include relevant `ros2` CLI commands for introspection (`ros2 topic list/info/echo/hz`, `ros2 service list/call`, `ros2 node list/info`)
- **FR-027**: Chapter MUST use humanoid-relevant message types in examples (`sensor_msgs/JointState`, `geometry_msgs/Twist`, `trajectory_msgs/JointTrajectory`)
- **FR-028**: Chapter MUST include a practical example combining multiple communication patterns (e.g., robot perception pipeline)

#### Chapter 1.3 — Building Packages (FR-029 to FR-042)

- **FR-029**: Chapter MUST explain the ROS 2 workspace structure (`src/`, `build/`, `install/`, `log/`) and what each directory contains
- **FR-030**: Chapter MUST demonstrate `ros2 pkg create --build-type ament_python` with `--dependencies` flag
- **FR-031**: Chapter MUST explain `package.xml` format 3 with dependency tags: `<buildtool_depend>`, `<exec_depend>`, `<test_depend>`, `<depend>`
- **FR-032**: Chapter MUST explain `setup.py` with `entry_points`, `data_files` (for launch files, config, URDF), and `find_packages()`
- **FR-033**: Chapter MUST explain `setup.cfg` and its role in setting script install directories
- **FR-034**: Chapter MUST document the complete `colcon build` workflow including `--symlink-install`, `--packages-select`, and source overlay
- **FR-035**: Chapter MUST explain Python launch files using the `launch` and `launch_ros` APIs with `Node`, `DeclareLaunchArgument`, and `LaunchConfiguration`
- **FR-036**: Chapter MUST demonstrate YAML parameter files and loading them in launch files and nodes
- **FR-037**: Chapter MUST show declaring and accessing parameters in nodes with `declare_parameter()` and `get_parameter()`
- **FR-038**: Chapter MUST document common message packages (`std_msgs`, `sensor_msgs`, `geometry_msgs`, `trajectory_msgs`, `control_msgs`) with descriptions
- **FR-039**: Chapter MUST include a "Best Practices" section covering naming conventions, package organization, and dependency management
- **FR-040**: Chapter MUST demonstrate `data_files` patterns for including launch files, config YAML, and URDF files in the install space
- **FR-041**: Chapter MUST document the `ament_index` resource marker file and why it must not be deleted
- **FR-042**: Chapter MUST show runtime parameter changes with `ros2 param set` and `ros2 param get`

#### Chapter 1.4 — Python Agents (FR-043 to FR-058)

- **FR-043**: Chapter MUST explain the rclpy architecture stack: Python → rcl → rmw → DDS
- **FR-044**: Chapter MUST demonstrate a complete agent pattern: node initialization, multiple subscribers, state management, timed processing, and publishing
- **FR-045**: Chapter MUST demonstrate multi-topic communication with a humanoid state estimator example fusing joint states, IMU, and force sensor data
- **FR-046**: Chapter MUST explain timer patterns: periodic timers with `create_timer()` and one-shot timers
- **FR-047**: Chapter MUST cover error handling: try/except in callbacks, logging exceptions, graceful degradation
- **FR-048**: Chapter MUST explain Executors: `SingleThreadedExecutor` vs `MultiThreadedExecutor` with thread count configuration
- **FR-049**: Chapter MUST explain Callback Groups: `MutuallyExclusiveCallbackGroup` and `ReentrantCallbackGroup` with use cases
- **FR-050**: Chapter MUST demonstrate the service-in-callback deadlock problem and its fix using `MultiThreadedExecutor` + `MutuallyExclusiveCallbackGroup`
- **FR-051**: Chapter MUST include a "Going Further" callout introducing composable nodes for in-process zero-copy communication (not main content)
- **FR-052**: Chapter MUST document logging: `get_logger()`, severity levels, throttled logging with `log_throttle_sec`
- **FR-053**: Chapter MUST demonstrate a JointState reader pattern for humanoid robots (reading joint positions/velocities/efforts)
- **FR-054**: Chapter MUST demonstrate a JointTrajectory commander pattern for sending joint motion commands
- **FR-055**: Chapter MUST include a "Going Further" callout introducing lifecycle nodes (`LifecycleNode`) with `on_configure`, `on_activate`, `on_deactivate`, `on_cleanup` for hardware drivers (not main content)
- **FR-056**: Chapter MUST demonstrate testing Python nodes with pytest using `rclpy.init()` / `rclpy.shutdown()` in fixtures
- **FR-057**: Chapter MUST include a "Going Further" callout showing the Walk Action Server pattern: accepting goals, publishing feedback, handling cancellation (not main content)
- **FR-058**: Chapter MUST include an executor/callback group reference table summarizing when to use each combination

#### Chapter 1.5 — URDF Basics (FR-059 to FR-074)

- **FR-059**: Chapter MUST explain URDF as an XML format describing robot kinematics and dynamics as a tree of links connected by joints
- **FR-060**: Chapter MUST document link sub-elements: `<visual>` (geometry + material), `<collision>` (simplified geometry), `<inertial>` (mass + inertia matrix)
- **FR-061**: Chapter MUST explain all 4 commonly-used joint types: `revolute` (bounded rotation), `continuous` (unbounded rotation), `prismatic` (linear), `fixed` (rigid)
- **FR-062**: Chapter MUST document joint properties: `<parent>`, `<child>`, `<origin>`, `<axis>`, `<limit>` (lower, upper, effort, velocity), `<dynamics>` (damping, friction)
- **FR-063**: Chapter MUST explain the TF2 transform tree and how `robot_state_publisher` converts URDF + `JointState` messages into TF2 transforms
- **FR-064**: Chapter MUST demonstrate `xacro:property` for variables, `xacro:macro` for reusable blocks, and math expressions (`${expression}`)
- **FR-065**: Chapter MUST include a complete humanoid leg macro with the `reflect` parameter for left/right mirroring
- **FR-066**: Chapter MUST document a humanoid kinematic chain showing the standard joint naming convention: `{side}_{segment}_{axis}` (e.g., `left_hip_pitch`)
- **FR-067**: Chapter MUST demonstrate rviz2 visualization with a launch file using `robot_state_publisher` and `joint_state_publisher_gui`
- **FR-068**: Chapter MUST document URDF validation with `check_urdf` and `xacro` processing commands
- **FR-069**: Chapter MUST explain sensor attachment via fixed joints (camera, LiDAR, IMU) with correct frame placement
- **FR-070**: Chapter MUST document inertia calculation for common primitive shapes (box, cylinder, sphere) with a reusable Xacro macro
- **FR-071**: Chapter MUST explain mesh file usage (`<mesh filename="package://...">`) with scale conversion (mm to m) for STL files
- **FR-072**: Chapter MUST document the `<ros2_control>` URDF tag for hardware interface integration (command/state interfaces per joint)
- **FR-073**: Chapter MUST show `view_frames` from `tf2_tools` for generating transform tree visualization
- **FR-074**: Chapter MUST document humanoid-specific URDF considerations: coordinate frame conventions (X-forward, Y-left, Z-up), collision simplification, DOF count (30-40 typical)

#### Chapter 1.6 — Exercises (FR-075 to FR-082)

- **FR-075**: Chapter MUST include at least 5 progressive exercises plus 1 challenge exercise
- **FR-076**: Each exercise MUST include: specification, starter code or skeleton, expected output, and a verification checklist
- **FR-077**: Exercises MUST cover all major chapter topics: installation verification, pub/sub, services, multi-node systems, URDF
- **FR-078**: The challenge exercise MUST integrate concepts from at least 3 chapters (packages, agents, URDF)
- **FR-079**: Each exercise MUST have a clear "done" condition that the student can self-verify
- **FR-080**: Exercises MUST use humanoid-robotics-relevant scenarios (joint control, sensor data, robot description)
- **FR-081**: Exercise difficulty MUST progress from guided (step-by-step) to independent (specification-only)
- **FR-082**: Each exercise MUST specify estimated completion time

#### Cross-Cutting Requirements (FR-083 to FR-090)

- **FR-083**: All code examples MUST be syntactically correct and runnable on ROS 2 Jazzy with Python 3.12
- **FR-084**: All chapters MUST follow the chapter template format from feature 002 (frontmatter, learning objectives, prerequisites, estimated time, key takeaways, next steps)
- **FR-085**: All code blocks MUST include `title` attribute and `showLineNumbers` for blocks exceeding 5 lines
- **FR-086**: All chapters MUST use humanoid robotics examples as the primary context (not generic turtlesim)
- **FR-087**: All internal links MUST use Docusaurus-compatible relative paths
- **FR-088**: All chapters MUST include at least one Mermaid diagram for architectural or conceptual visualization
- **FR-089**: All chapters MUST pass `npm run build` with zero errors including frontmatter validation
- **FR-090**: All ROS 2 CLI commands MUST include expected output or description of expected output

### Key Entities

- **Node**: A single-purpose process in the ROS 2 computational graph. Has a unique name, zero or more publishers/subscribers/services/actions, parameters, and an optional lifecycle state machine
- **Topic**: A named, typed message channel for asynchronous many-to-many publish-subscribe communication. Configured with QoS profiles
- **Service**: A named, typed request-response channel for synchronous one-to-one RPC. Defined by `.srv` files
- **Action**: A named, typed goal-oriented channel for long-running tasks with periodic feedback and cancellation. Defined by `.action` files
- **Message**: A typed data structure (`.msg` file) used for topic, service, and action communication. Includes standard types (`std_msgs`, `sensor_msgs`, `geometry_msgs`, `trajectory_msgs`)
- **Package**: The organizational unit of ROS 2 software. Contains nodes, launch files, config, URDF, and metadata (`package.xml`, `setup.py`)
- **Workspace**: The development environment containing one or more packages under `src/`, with `build/`, `install/`, and `log/` directories managed by colcon
- **URDF/Xacro**: XML-based robot description format defining kinematic chains as trees of links connected by joints. Xacro adds macros, variables, and math
- **QoS Profile**: Quality of Service configuration (reliability, durability, history, depth) that governs message delivery guarantees
- **TF2**: Transform tree system that maintains spatial relationships between all coordinate frames in the robot
- **Executor**: The callback scheduling mechanism. SingleThreadedExecutor processes one callback at a time; MultiThreadedExecutor enables concurrent callbacks
- **Callback Group**: Concurrency control for callbacks within an executor. MutuallyExclusive prevents concurrent execution; Reentrant allows it
- **Lifecycle Node**: A managed node with explicit state transitions (unconfigured → inactive → active → finalized) for hardware resource management

## Clarifications

### Session 2026-02-14

- Q: Which ROS 2 distribution should be targeted? → A: Jazzy Jalisco (Ubuntu 24.04, Python 3.12, EOL 2029)
- Q: Should chapters be rewritten from scratch or surgically enhanced? → A: Surgical enhancement — preserve existing structure and validated content (~2,000 lines), add missing sections per FRs, update outdated commands (e.g., installation method), enhance with humanoid-specific examples. Do not rewrite chapters that are already strong.
- Q: Chapter 1.4 has 16 FRs for a 50-minute chapter — trim or expand? → A: Trim advanced topics. Move lifecycle nodes (FR-055), composable nodes (FR-051), and walk action server (FR-057) to "Going Further" callouts. Keep core 12 FRs as main content within 50 minutes.

## Assumptions

- Students have basic Python 3 programming skills (variables, functions, classes, imports)
- Students have basic Linux command line familiarity (terminal, file navigation, package management)
- Students have access to Ubuntu 24.04 LTS (native install, VM, or WSL2)
- Students have at least 8 GB RAM and 30 GB free disk space
- No prior ROS or robotics experience is assumed
- The textbook is self-paced; time estimates are guidelines, not constraints
- Students do not have access to physical robot hardware in Module 1 (simulation only)
- All code examples are tested against ROS 2 Jazzy release packages (not source builds)
- Implementation follows surgical enhancement approach: existing chapter content is preserved and augmented, not rewritten from scratch

## Dependencies

- **Feature 001 (Book Master Plan)**: Module structure, chapter ordering, and learning progression are defined
- **Feature 002 (Chapter Template System)**: Template format, frontmatter schema, admonition patterns, and code block standards are established
- **ROS 2 Jazzy packages**: All referenced packages must be available in the Ubuntu 24.04 apt repository
- **Docusaurus build**: All chapters must pass `npm run build` with the frontmatter validation plugin

## Out of Scope

- Gazebo simulation setup (covered in Module 2)
- NVIDIA Isaac integration (covered in Module 3)
- Real hardware deployment and physical robot control
- C++ (ament_cmake) packages — this module is Python-only
- Custom message/service/action type creation (mentioned but not implemented)
- ros2_control hardware interface plugin development (introduced conceptually, detailed in Module 3)
- MoveIt2 motion planning (referenced but not taught)
- Navigation2 stack (referenced but not taught)
- Multi-machine / distributed ROS 2 networking (DDS discovery configuration)

## Risks & Mitigations

1. **Installation fragility**: ROS 2 installation steps change between point releases. **Mitigation**: Document the `ros2-apt-source` method which is more stable, include version-pinned commands, add Docker fallback
2. **Code example bit-rot**: API changes in future Jazzy patches could break examples. **Mitigation**: Pin to `ros-jazzy-desktop` meta-package, test all examples against specific version, include version check in Exercise 1
3. **Cognitive overload**: 90 functional requirements across 6 chapters is substantial. **Mitigation**: Progressive difficulty (installation → concepts → hands-on → advanced), each chapter independently completable, exercises reinforce rather than introduce

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 6 chapter files pass `npm run build` with zero errors including frontmatter validation
- **SC-002**: Every code example in chapters 1.1–1.5 is syntactically valid Python that can be copy-pasted into a ROS 2 Jazzy environment
- **SC-003**: The installation chapter (1.1) enables a student to go from zero to verified ROS 2 installation following only the documented steps
- **SC-004**: Each chapter includes at least 3 learning objectives that are directly addressed by chapter content
- **SC-005**: All 6 exercises in Chapter 1.6 include specification, starter code, expected output, and verification checklist
- **SC-006**: At least 80% of code examples use humanoid-robotics context (joint states, trajectories, URDF, sensor fusion) rather than generic examples
- **SC-007**: The URDF chapter (1.5) includes a complete humanoid leg macro that produces valid URDF when processed with `xacro`
- **SC-008**: All chapters follow the template structure from feature 002: frontmatter with 7 required fields, learning objectives admonition, prerequisites admonition, estimated time badge, key takeaways, next steps
- **SC-009**: The "Common Mistakes" section in Chapter 1.2 covers at least 5 documented pitfalls with clear explanations and fixes
- **SC-010**: Each chapter's estimated_time in frontmatter is within 20% of the actual content depth (no chapter claims 45 minutes but requires 2 hours of reading)
