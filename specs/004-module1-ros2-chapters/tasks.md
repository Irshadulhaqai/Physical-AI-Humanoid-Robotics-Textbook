# Tasks: Module 1 — ROS 2 Jazzy Chapter Content

**Input**: Design documents from `/specs/004-module1-ros2-chapters/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not applicable — validation is via `npm run build` (zero errors) and manual content review.

**Organization**: Tasks are grouped by user story (one per chapter) to enable independent implementation and testing. Implementation follows surgical enhancement approach — existing content is preserved and augmented.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Content**: `my-website/docs/module-1/<chapter>.md`
- **Config**: `my-website/docusaurus.config.ts`
- **Templates**: `my-website/templates/chapter-template.md` (reference only)

---

## Phase 1: Setup

**Purpose**: Verify environment and establish baseline before any content changes

- [x] T001 Run `npm run build` in `my-website/` to establish baseline — confirm all 42 docs pass with zero errors before any modifications
- [x] T002 Read all 6 chapter files in `my-website/docs/module-1/` and document current line counts, existing sections, and gaps against spec FRs

**Checkpoint**: Build passes, content audit complete. Ready for chapter enhancements.

---

## Phase 2: US1 — Installation & Environment Setup (Priority: P1)

**Goal**: Update Chapter 1.1 with current ROS 2 Jazzy installation method, Docker alternative, humanoid packages, and expanded troubleshooting

**Independent Test**: A student with a clean Ubuntu 24.04 VM follows the chapter end-to-end and has a verified working ROS 2 Jazzy installation

### Implementation for US1

- [x] T003 [US1] Read existing `my-website/docs/module-1/installation.md` (137 lines) and identify sections needing update against FR-001 through FR-012
- [x] T004 [US1] Update installation steps in `my-website/docs/module-1/installation.md` to use `ros2-apt-source` package method (FR-001) replacing legacy GPG key method — preserve existing structure, update commands only
- [x] T005 [US1] Add system requirements section to `my-website/docs/module-1/installation.md` — minimum hardware: 8 GB RAM, 30 GB disk, multi-core CPU (FR-003)
- [x] T006 [US1] Add humanoid-robotics packages section to `my-website/docs/module-1/installation.md` — list `ros2_control`, `ros2_controllers`, `joint_state_publisher_gui`, `robot_state_publisher`, `xacro`, `moveit` with install commands (FR-006)
- [x] T007 [US1] Add Docker alternative section to `my-website/docs/module-1/installation.md` — `:::note` callout with Dockerfile or docker run command for macOS/Windows students (FR-009)
- [x] T008 [US1] Add `ros-jazzy-desktop` vs `ros-jazzy-ros-base` comparison to `my-website/docs/module-1/installation.md` — explain when to use each (FR-010)
- [x] T009 [US1] Expand Troubleshooting section in `my-website/docs/module-1/installation.md` to cover at least 5 common failures: locale, GPG/apt source, package conflicts, sourcing, command not found (FR-007)
- [x] T010 [US1] Add workspace creation section to `my-website/docs/module-1/installation.md` — `mkdir -p ~/ros2_ws/src`, colcon install, rosdep init (FR-011, FR-012)
- [x] T011 [US1] Verify `my-website/docs/module-1/installation.md` frontmatter has all 7 required fields and follows template format (FR-084)
- [x] T012 [US1] Run `npm run build` to validate Chapter 1.1 changes — zero errors (SC-001)

**Checkpoint**: Installation chapter updated with current methods. Build passes.

---

## Phase 3: US2 — Core Concepts Mastery (Priority: P1)

**Goal**: Enhance Chapter 1.2 with QoS compatibility rules, Common Mistakes section, humanoid message types, and CLI introspection commands

**Independent Test**: A student can correctly identify which communication pattern to use for 5 humanoid robot scenarios and explain QoS compatibility

### Implementation for US2

- [x] T013 [US2] Read existing `my-website/docs/module-1/core-concepts.md` (384 lines) and identify gaps against FR-013 through FR-028
- [x] T014 [US2] Add QoS profiles section to `my-website/docs/module-1/core-concepts.md` — explain Reliability, Durability, History, Depth with a comparison table showing Default, Sensor Data, Parameters, Services profiles (FR-023)
- [x] T015 [US2] Add QoS compatibility rules to `my-website/docs/module-1/core-concepts.md` — document what happens on mismatch (silent data loss), include `:::warning` admonition about Reliable subscriber + Best Effort publisher (FR-024)
- [x] T016 [US2] Add "Common Mistakes" section to `my-website/docs/module-1/core-concepts.md` with `:::warning` admonitions covering at least 5 pitfalls: (1) service deadlock in single-threaded callback, (2) QoS mismatch silent failure, (3) forgetting to rebuild/source, (4) exception propagation in callbacks, (5) `use_sim_time` mismatch (FR-025, SC-009)
- [x] T017 [US2] Update code examples in `my-website/docs/module-1/core-concepts.md` to use humanoid-relevant message types — replace `std_msgs/String` with `sensor_msgs/JointState`, `geometry_msgs/Twist`, `trajectory_msgs/JointTrajectory` where appropriate (FR-027)
- [x] T018 [US2] Add comparison table to `my-website/docs/module-1/core-concepts.md` — "When to use Topics vs Services vs Actions" with humanoid robot examples (joint streaming, calibration request, walk command) (FR-022)
- [x] T019 [US2] Add `ros2` CLI commands section to `my-website/docs/module-1/core-concepts.md` — `ros2 topic list/info/echo/hz`, `ros2 service list/call`, `ros2 node list/info` with expected output descriptions (FR-026, FR-090)
- [x] T020 [US2] Verify practical example in `my-website/docs/module-1/core-concepts.md` combines multiple communication patterns (e.g., robot perception pipeline) — enhance if needed (FR-028)
- [x] T021 [US2] Ensure all code blocks in `my-website/docs/module-1/core-concepts.md` have `title` attribute and `showLineNumbers` for blocks >5 lines (FR-085)
- [x] T022 [US2] Run `npm run build` to validate Chapter 1.2 changes — zero errors (SC-001)

**Checkpoint**: Core concepts chapter enhanced with QoS, common mistakes, and humanoid examples. Build passes.

---

## Phase 4: US3 — Package Development Workflow (Priority: P1)

**Goal**: Enhance Chapter 1.3 with data_files patterns, ament_index explanation, YAML parameter files, launch file patterns, and best practices

**Independent Test**: A student creates a package with launch files and YAML parameters, builds with colcon, and runs successfully

### Implementation for US3

- [x] T023 [US3] Read existing `my-website/docs/module-1/building-packages.md` (342 lines) and identify gaps against FR-029 through FR-042
- [x] T024 [US3] Add `data_files` patterns section to `my-website/docs/module-1/building-packages.md` — demonstrate including launch files (`glob('launch/*launch.[pxy][yma]*')`), config YAML, and URDF files in install space (FR-040)
- [x] T025 [US3] Add `ament_index` resource marker explanation to `my-website/docs/module-1/building-packages.md` — explain the `resource/` directory marker file and why it must not be deleted (FR-041)
- [x] T026 [US3] Enhance launch files section in `my-website/docs/module-1/building-packages.md` — show `DeclareLaunchArgument`, `LaunchConfiguration`, `Node` with parameters and remappings using humanoid robot example (FR-035)
- [x] T027 [US3] Add YAML parameter files section to `my-website/docs/module-1/building-packages.md` — show config YAML structure, loading in launch files, and `declare_parameter()`/`get_parameter()` in nodes (FR-036, FR-037)
- [x] T028 [US3] Add runtime parameter changes section to `my-website/docs/module-1/building-packages.md` — demonstrate `ros2 param set` and `ros2 param get` with expected output (FR-042, FR-090)
- [x] T029 [US3] Add common message packages reference to `my-website/docs/module-1/building-packages.md` — table of `std_msgs`, `sensor_msgs`, `geometry_msgs`, `trajectory_msgs`, `control_msgs` with descriptions (FR-038)
- [x] T030 [US3] Add or enhance Best Practices section in `my-website/docs/module-1/building-packages.md` — naming conventions, package organization, dependency management (FR-039)
- [x] T031 [US3] Ensure all code blocks have `title` attribute and `showLineNumbers` for blocks >5 lines (FR-085)
- [x] T032 [US3] Run `npm run build` to validate Chapter 1.3 changes — zero errors (SC-001)

**Checkpoint**: Building packages chapter enhanced with data_files, parameters, and best practices. Build passes.

---

## Phase 5: US4 — Python Agent Development (Priority: P2)

**Goal**: Enhance Chapter 1.4 with humanoid-specific patterns (JointState/JointTrajectory), executor reference table, and "Going Further" callouts for advanced topics

**Independent Test**: A student implements a multi-node system with sensor reader and trajectory commander running in a launch file

### Implementation for US4

- [x] T033 [US4] Read existing `my-website/docs/module-1/python-agents.md` (394 lines) and identify gaps against FR-043 through FR-058
- [x] T034 [US4] Add JointState reader pattern to `my-website/docs/module-1/python-agents.md` — demonstrate subscribing to `sensor_msgs/JointState`, reading positions/velocities/efforts for humanoid joints (FR-053)
- [x] T035 [US4] Add JointTrajectory commander pattern to `my-website/docs/module-1/python-agents.md` — demonstrate publishing `trajectory_msgs/JointTrajectory` with waypoints for joint motion (FR-054)
- [x] T036 [US4] Add multi-sensor fusion example to `my-website/docs/module-1/python-agents.md` — humanoid state estimator fusing joint states, IMU, and force sensors using `ReentrantCallbackGroup` and `MultiThreadedExecutor` (FR-045)
- [x] T037 [US4] Add service-in-callback deadlock demonstration to `my-website/docs/module-1/python-agents.md` — show the problem with single-threaded executor and the fix using `MultiThreadedExecutor` + `MutuallyExclusiveCallbackGroup` (FR-050)
- [x] T038 [US4] Add executor/callback group reference table to `my-website/docs/module-1/python-agents.md` — summarize when to use SingleThreaded vs MultiThreaded, MutuallyExclusive vs Reentrant (FR-058)
- [x] T039 [US4] Add `:::tip[Going Further]` callout for composable nodes in `my-website/docs/module-1/python-agents.md` — brief introduction to in-process zero-copy communication (FR-051)
- [x] T040 [US4] Add `:::tip[Going Further]` callout for lifecycle nodes in `my-website/docs/module-1/python-agents.md` — brief introduction to `on_configure`/`on_activate`/`on_deactivate`/`on_cleanup` (FR-055)
- [x] T041 [US4] Add `:::tip[Going Further]` callout for Walk Action Server in `my-website/docs/module-1/python-agents.md` — brief pattern showing goal acceptance, feedback, and cancellation (FR-057)
- [x] T042 [US4] Enhance error handling section in `my-website/docs/module-1/python-agents.md` — ensure try/except in callbacks and throttled logging are demonstrated (FR-047, FR-052)
- [x] T043 [US4] Add pytest testing section to `my-website/docs/module-1/python-agents.md` — demonstrate testing Python nodes with `rclpy.init()`/`rclpy.shutdown()` in fixtures (FR-056)
- [x] T044 [US4] Ensure all code blocks have `title` attribute and `showLineNumbers` for blocks >5 lines (FR-085)
- [x] T045 [US4] Run `npm run build` to validate Chapter 1.4 changes — zero errors (SC-001)

**Checkpoint**: Python agents chapter enhanced with humanoid patterns and Going Further callouts. Build passes.

---

## Phase 6: US5 — URDF Robot Description (Priority: P2)

**Goal**: Enhance Chapter 1.5 with complete humanoid leg Xacro macro, ros2_control URDF tags, inertia macros, and humanoid kinematic chain documentation

**Independent Test**: A student creates a Xacro humanoid lower body (pelvis + 2 legs, 6 DOF each), validates with `check_urdf`, and visualizes in rviz2

### Implementation for US5

- [x] T046 [US5] Read existing `my-website/docs/module-1/urdf-basics.md` (404 lines) and identify gaps against FR-059 through FR-074
- [x] T047 [US5] Add complete humanoid leg Xacro macro to `my-website/docs/module-1/urdf-basics.md` — define `leg` macro with `prefix` and `reflect` parameters, 6 DOF (hip yaw/roll/pitch, knee pitch, ankle pitch/roll), proper joint limits (FR-065, SC-007)
- [x] T048 [US5] Add humanoid kinematic chain documentation to `my-website/docs/module-1/urdf-basics.md` — show full tree structure (pelvis → legs → torso → arms → head) with standard naming convention `{side}_{segment}_{axis}` (FR-066)
- [x] T049 [US5] Add inertia calculation Xacro macros to `my-website/docs/module-1/urdf-basics.md` — `cylinder_inertia`, `box_inertia`, `sphere_inertia` with mass and dimension parameters (FR-070)
- [x] T050 [US5] Add `<ros2_control>` URDF section to `my-website/docs/module-1/urdf-basics.md` — demonstrate hardware interface tags with command_interface (position, velocity) and state_interface per joint (FR-072)
- [x] T051 [US5] Add mesh file usage section to `my-website/docs/module-1/urdf-basics.md` — explain `<mesh filename="package://...">`, STL scale conversion (mm to m: `scale="0.001 0.001 0.001"`), DAE with colors (FR-071)
- [x] T052 [US5] Add `view_frames` documentation to `my-website/docs/module-1/urdf-basics.md` — show `ros2 run tf2_tools view_frames` for generating transform tree PDF visualization (FR-073)
- [x] T053 [US5] Add humanoid-specific URDF considerations section to `my-website/docs/module-1/urdf-basics.md` — coordinate conventions (X-forward, Y-left, Z-up), collision simplification, typical DOF count (30-40) (FR-074)
- [x] T054 [US5] Ensure sensor attachment section covers camera, LiDAR, and IMU with correct fixed joint frame placement (FR-069)
- [x] T055 [US5] Ensure all code blocks have `title` attribute and `showLineNumbers` for blocks >5 lines (FR-085)
- [x] T056 [US5] Run `npm run build` to validate Chapter 1.5 changes — zero errors (SC-001)

**Checkpoint**: URDF chapter enhanced with humanoid leg macro, ros2_control, and inertia macros. Build passes.

---

## Phase 7: US6 — Hands-On Exercises (Priority: P2)

**Goal**: Enhance Chapter 1.6 exercises with humanoid-robotics context, complete verification checklists, and an integrated challenge exercise

**Independent Test**: A student completes Exercise 4 (Multi-Node System) end-to-end: 3 interconnected nodes, builds package, verifies data flow

### Implementation for US6

- [x] T057 [US6] Read existing `my-website/docs/module-1/exercises.md` (323 lines) and identify gaps against FR-075 through FR-082
- [x] T058 [US6] Enhance Exercise 2 (Publisher-Subscriber) in `my-website/docs/module-1/exercises.md` — use `sensor_msgs/JointState` instead of temperature data where appropriate, add humanoid joint context (FR-080)
- [x] T059 [US6] Enhance Exercise 3 (Service Implementation) in `my-website/docs/module-1/exercises.md` — use humanoid-relevant service (e.g., joint limit checking or coordinate conversion) (FR-080)
- [x] T060 [US6] Enhance Exercise 4 (Multi-Node System) in `my-website/docs/module-1/exercises.md` — use sensor→controller→actuator architecture for humanoid joint control (FR-080)
- [x] T061 [US6] Verify Exercise 5 (URDF Robot Model) in `my-website/docs/module-1/exercises.md` has complete specification, skeleton, expected output, and verification checklist (FR-076)
- [x] T062 [US6] Enhance Challenge Exercise in `my-website/docs/module-1/exercises.md` — ensure it integrates concepts from at least 3 chapters (packages, agents, URDF) and has estimated completion time (FR-078, FR-082)
- [x] T063 [US6] Verify all exercises have verification checklists with clear "done" conditions (FR-076, FR-079)
- [x] T064 [US6] Add estimated completion times to any exercises missing them (FR-082)
- [x] T065 [US6] Ensure exercise difficulty progresses from guided (step-by-step) to independent (specification-only) (FR-081)
- [x] T066 [US6] Run `npm run build` to validate Chapter 1.6 changes — zero errors (SC-001)

**Checkpoint**: Exercises enhanced with humanoid context and complete verification checklists. Build passes.

---

## Phase 8: Polish & Cross-Cutting Validation

**Purpose**: Final validation across all chapters for consistency, template compliance, and cross-cutting requirements

- [x] T067 Verify all 6 chapters have at least 1 Mermaid diagram each (FR-088) — add where missing
- [x] T068 Verify all code blocks across all chapters have `title` attribute (FR-085) — fix any remaining
- [x] T069 Verify all internal links use Docusaurus-compatible relative paths (FR-087) — fix any broken links
- [x] T070 Verify all `ros2` CLI commands include expected output or description of expected output (FR-090) — add where missing
- [x] T071 Verify at least 80% of code examples use humanoid-robotics context across all chapters (SC-006) — count and fix if below threshold
- [x] T072 Verify all chapters follow template format: frontmatter (7 fields), `:::info[What You'll Learn]`, `:::note[Prerequisites]`, `**Estimated Time**`, `:::tip[Key Takeaways]`, `## Next Steps` (FR-084, SC-008)
- [x] T073 Verify each chapter has at least 3 learning objectives addressed by content (SC-004)
- [x] T074 Update `my-website/docs/module-1/index.md` — verify links, times, and structure are consistent with enhanced chapters
- [x] T075 Run final `npm run build` — confirm all 42+ docs pass with zero errors (SC-001)
- [x] T076 Review estimated_time in each chapter's frontmatter — ensure within 20% of actual content depth (SC-010)

**Checkpoint**: All chapters validated. Build passes. Feature complete.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (US1 - Installation)**: Depends on Phase 1
- **Phase 3 (US2 - Core Concepts)**: Depends on Phase 1 (can run in parallel with US1)
- **Phase 4 (US3 - Building Packages)**: Depends on Phase 1 (can run in parallel with US1, US2)
- **Phase 5 (US4 - Python Agents)**: Depends on Phase 1 (can run in parallel with US1-US3)
- **Phase 6 (US5 - URDF Basics)**: Depends on Phase 1 (can run in parallel with US1-US4)
- **Phase 7 (US6 - Exercises)**: Depends on Phases 2-6 (exercises reference all chapter content)
- **Phase 8 (Polish)**: Depends on all previous phases

### User Story Dependencies

```
Phase 1 (Setup)
    │
    ├─→ Phase 2 (US1: Installation) ─┐
    ├─→ Phase 3 (US2: Core Concepts) ─┤
    ├─→ Phase 4 (US3: Packages) ──────┤── can run in parallel
    ├─→ Phase 5 (US4: Python Agents) ─┤
    └─→ Phase 6 (US5: URDF Basics) ───┘
                                       │
                                       ▼
                            Phase 7 (US6: Exercises)
                                       │
                                       ▼
                            Phase 8 (Polish)
```

### Parallel Opportunities

- **Chapters 1.1–1.5**: All can be enhanced in parallel since they modify different files
- **Within each chapter**: Tasks are sequential (read → enhance → validate)
- **Phase 8**: Most validation tasks can run in parallel (different concerns)

---

## Implementation Strategy

### MVP First (Phase 1 + Phase 2: Setup + Installation)

1. Complete Phase 1: Setup (verify build, audit content)
2. Complete Phase 2: US1 Installation (major update — most critical chapter)
3. **STOP and VALIDATE**: Build passes, installation steps are current
4. Students can already use the updated installation guide

### Incremental Delivery

1. Setup + US1 Installation → **Gateway chapter updated** (MVP)
2. Add US2 Core Concepts → **Conceptual foundation enhanced**
3. Add US3 Packages → **All P1 chapters complete**
4. Add US4 + US5 in parallel → **Advanced chapters enhanced**
5. Add US6 Exercises → **Practice materials updated**
6. Polish → **Feature complete**

### Single Developer Strategy (Sequential)

1. Phase 1: Setup (~15 min)
2. Phase 2: US1 Installation (~45 min)
3. Phase 3: US2 Core Concepts (~45 min)
4. Phase 4: US3 Packages (~40 min)
5. Phase 5: US4 Python Agents (~50 min)
6. Phase 6: US5 URDF (~50 min)
7. Phase 7: US6 Exercises (~30 min)
8. Phase 8: Polish (~20 min)

---

## Summary

| Metric | Count |
|--------|-------|
| **Total tasks** | 76 |
| **Setup tasks** | 2 (Phase 1) |
| **US1 Installation tasks** | 10 (Phase 2) |
| **US2 Core Concepts tasks** | 10 (Phase 3) |
| **US3 Packages tasks** | 10 (Phase 4) |
| **US4 Python Agents tasks** | 13 (Phase 5) |
| **US5 URDF tasks** | 11 (Phase 6) |
| **US6 Exercises tasks** | 10 (Phase 7) |
| **Polish tasks** | 10 (Phase 8) |
| **Parallel opportunities** | Phases 2-6 can run in parallel (different files) |
| **MVP scope** | Phases 1-2 (12 tasks — Installation chapter updated) |

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each chapter is independently enhanceable — complete one, validate, move to next
- Commit after each phase or logical group
- Stop at any checkpoint to validate independently
- `npm run build` is the universal validation — run after every phase
- Surgical enhancement: preserve existing content, add missing sections per FRs
