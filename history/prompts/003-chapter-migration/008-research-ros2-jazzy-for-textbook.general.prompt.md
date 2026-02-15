---
id: 008
title: Research ROS 2 Jazzy for Textbook Chapters
stage: general
date: 2026-02-14
surface: agent
model: claude-sonnet-4-5-20250929
feature: 003-chapter-migration
branch: 003-chapter-migration
user: human
command: research ROS 2 Jazzy Jalisco for textbook chapters
labels: ["research", "ros2", "jazzy", "urdf", "rclpy", "humanoid-robotics", "textbook"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/003-chapter-migration/008-research-ros2-jazzy-for-textbook.general.prompt.md
tests:
  - none
---

## Prompt

Do thorough research on ROS 2 Jazzy Jalisco for writing educational textbook chapters. This is for a Physical AI & Humanoid Robotics course. Research these specific areas:

1. **ROS 2 Jazzy Installation** - Current best practices for Ubuntu 24.04, key packages needed for humanoid robotics (rclpy, rviz2, ros2_control)

2. **ROS 2 Core Concepts** - Nodes, Topics, Services, Actions architecture. Focus on rclpy Python API. What are the key concepts students MUST understand? What are common misconceptions?

3. **Building ROS 2 Packages** - ament_python build system, colcon workflow, package.xml, setup.py/setup.cfg, launch files with Python launch API

4. **Python Agents with rclpy** - Creating publishers/subscribers, service clients/servers, action clients/servers. Real-world patterns for humanoid robot control (e.g., joint control, sensor reading)

5. **URDF for Humanoids** - Robot description format, joints (revolute, prismatic, fixed, continuous), links, visual/collision meshes, Xacro macros, humanoid-specific considerations (many DOF, kinematic chains)

6. **ROS 2 Jazzy specific changes** - What's new in Jazzy vs Humble? Any API changes students should know about?

Use web searches and Context7 to find authoritative information. Return detailed findings organized by topic with specific code patterns, API details, and pedagogical recommendations.

## Response snapshot

Conducted comprehensive multi-source research including:
- Official ROS 2 Jazzy documentation (docs.ros.org/en/jazzy)
- ros2_control Jazzy documentation (control.ros.org/jazzy)
- rclpy Context7 API documentation
- Karelics common mistakes blog
- Multiple web searches across all 6 topic areas

Findings cover: installation steps, core communication patterns, ament_python package structure, rclpy API patterns, URDF/Xacro format, QoS profiles, executor/callback groups, and Jazzy-specific changes vs Humble.

## Outcome

- Impact: Research gathered to inform improvements to 5 module-1 chapter files covering ROS 2 fundamentals
- Tests: none (research task)
- Files: PHR only
- Next prompts: Use findings to enhance chapter content with accurate Jazzy-specific details, additional patterns, and pedagogical recommendations
- Reflection: Existing chapters are well-structured but could benefit from: updated apt source method, ros2_control integration details, lifecycle node patterns, and more humanoid-specific examples

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Apply research findings to enhance individual chapter files
