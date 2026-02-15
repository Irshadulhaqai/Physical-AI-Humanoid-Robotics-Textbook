# Research: Module 1 — ROS 2 Jazzy Chapter Content

**Feature**: 004-module1-ros2-chapters
**Date**: 2026-02-14
**Status**: Complete

## Research Questions

### RQ-1: What is the current official ROS 2 Jazzy installation method?

**Decision**: Use the `ros2-apt-source` package method (not the legacy manual GPG key method)
**Rationale**: The official ROS 2 Jazzy documentation now uses a dedicated `ros2-apt-source` Debian package that automates repository setup. This is simpler, more maintainable, and less error-prone than the manual GPG key + sources.list approach used in older tutorials.
**Alternatives considered**:
- Manual GPG key method (legacy, still works but more steps and more failure modes)
- Docker-only approach (rejected as primary — not suitable for rviz2/GUI tools without extra setup)
- Source build (rejected — too complex for introductory module)
**Source**: docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debs.html

### RQ-2: What are the key differences between ROS 2 Jazzy and Humble that affect chapter content?

**Decision**: Document Jazzy-specific patterns; do not maintain Humble compatibility
**Rationale**: Jazzy targets Ubuntu 24.04/Python 3.12 (current LTS). Key differences:
- Installation uses `ros2-apt-source` package (new)
- `ros2_control`: `get_state()` renamed to `get_lifecycle_state()`, `cmd_vel` requires TwistStamped
- TimerInfo available in timer callbacks (new API)
- Service recording/playback via ros2bag (new)
- RViz2 regex filtering for TF frames (useful for humanoids with 40+ frames)
- Python rclpy API itself is largely unchanged between Humble and Jazzy
**Alternatives considered**: Dual-version coverage (rejected — adds complexity without value since Jazzy is the current LTS target)
**Source**: docs.ros.org/en/jazzy/Releases/Release-Jazzy-Jalisco.html

### RQ-3: What existing chapter content can be preserved vs. needs updating?

**Decision**: Surgical enhancement — preserve existing content structure, update specific sections
**Rationale**: Audit of existing 6 chapters (2,000 lines total) shows:
- **installation.md** (137 lines): Needs update — uses old GPG key method. Add ros2-apt-source, Docker alternative, humanoid packages
- **core-concepts.md** (384 lines): Strong content. Add QoS compatibility rules table, expand Common Mistakes section, add humanoid message type examples
- **building-packages.md** (342 lines): Good coverage. Add `data_files` patterns for URDF/config, add `ament_index` resource marker explanation
- **python-agents.md** (394 lines): Good foundation. Add JointState/JointTrajectory humanoid patterns, enhance executor/callback group section, add "Going Further" callouts for advanced topics
- **urdf-basics.md** (404 lines): Good structure. Add complete humanoid leg Xacro macro, add ros2_control URDF tags, add inertia calculation macros
- **exercises.md** (323 lines): Well-structured exercises. Enhance humanoid context, add verification checklists where missing
**Source**: Direct file audit of my-website/docs/module-1/*.md

### RQ-4: What humanoid-specific ROS 2 patterns should be emphasized?

**Decision**: Focus on 5 key humanoid patterns across chapters
**Rationale**: Students need practical patterns they'll use in Modules 2-4:
1. **JointState reading** (sensor_msgs/JointState) — subscribing to joint positions/velocities/efforts
2. **JointTrajectory commanding** (trajectory_msgs/JointTrajectory) — sending motion commands
3. **Multi-sensor fusion** — fusing joint state + IMU + force sensors with ReentrantCallbackGroup
4. **Humanoid URDF with Xacro** — leg macro with reflect parameter, 6 DOF per leg
5. **QoS for sensor data** — Best Effort for high-frequency sensors, Reliable for commands
**Alternatives considered**: Including MoveIt2/Nav2 patterns (rejected — out of scope for Module 1)
**Source**: ROS 2 documentation, ros2_control getting started guide

### RQ-5: What common student mistakes should be documented?

**Decision**: Document top 6 mistakes with clear explanations and fixes
**Rationale**: Based on ROS 2 community forums and teaching experience:
1. **Service deadlock in callbacks** — calling service from single-threaded callback. Fix: MultiThreadedExecutor
2. **QoS mismatch** — Reliable subscriber + Best Effort publisher = silent drop. Fix: Match profiles
3. **Forgetting to source** — workspace overlay not active. Fix: Add to .bashrc, verify with `echo $ROS_DISTRO`
4. **Forgetting to rebuild** — even with symlink-install, entry_points need rebuild. Fix: Always rebuild after setup.py changes
5. **Exception propagation** — unhandled exception in callback crashes node silently. Fix: try/except wrapper
6. **use_sim_time mismatch** — some nodes on sim time, others on wall time. Fix: Set consistently via launch parameter
**Source**: Karelics blog, ROS Discourse forums, ROS 2 callback groups documentation

### RQ-6: What diagram types are needed across chapters?

**Decision**: Use Mermaid.js diagrams (already configured in Docusaurus via @docusaurus/theme-mermaid)
**Rationale**: Each chapter needs at least 1 diagram per FR-088:
- **Ch 1.1**: Installation verification flow (flowchart)
- **Ch 1.2**: Computational graph model (flowchart), QoS compatibility matrix (table in Mermaid or markdown)
- **Ch 1.3**: Workspace structure (flowchart), build workflow (sequence)
- **Ch 1.4**: rclpy architecture stack (flowchart), executor model (flowchart)
- **Ch 1.5**: URDF kinematic tree (flowchart), TF2 transform tree (flowchart)
- **Ch 1.6**: Multi-node system architecture (flowchart)
**Alternatives considered**: draw.io/SVG images (rejected — Mermaid is already integrated and renders at build time)
**Source**: Existing chapter content already uses Mermaid successfully
