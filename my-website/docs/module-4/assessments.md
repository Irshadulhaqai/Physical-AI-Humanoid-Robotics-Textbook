---
sidebar_position: 7
title: "Assessments and Evaluation"
sidebar_label: "Assessments"
description: "Assessment rubrics, evaluation criteria, and submission guidelines for the Physical AI and Humanoid Robotics course including module quizzes and capstone project."
keywords: [assessment, rubric, evaluation, grading, capstone, submission]
estimated_time: "20 minutes"
prerequisites: []
learning_objectives:
  - "Understand the assessment structure for the course"
  - "Review the capstone project rubric and grading criteria"
  - "Prepare submissions that meet quality standards"
---

**Estimated Time**: 20 minutes

:::info[What You'll Learn]
- Understand the assessment structure for the course
- Review the capstone project rubric and grading criteria
- Prepare submissions that meet quality standards
:::

:::note[Prerequisites]
No prerequisites — you can start here.
:::

This page outlines the assessment structure for the Physical AI & Humanoid Robotics course, including module-level checkpoints and the capstone project evaluation.

## Assessment Overview

| Assessment | Weight | Type | Timing |
|-----------|--------|------|--------|
| Module 1 Exercises | 15% | Hands-on | End of Week 5 |
| Module 2 Exercises | 15% | Hands-on | End of Week 7 |
| Module 3 Exercises | 15% | Hands-on | End of Week 10 |
| Module 4 Exercises | 10% | Hands-on | End of Week 12 |
| Capstone Project | 35% | Project | Week 13 |
| Participation | 10% | Ongoing | Throughout |

## Module Exercises Rubric

Each module exercise set is graded on:

| Criterion | Points | Description |
|-----------|--------|-------------|
| Correctness | 40 | Code runs without errors, produces expected output |
| Completeness | 30 | All required exercises completed |
| Code Quality | 20 | Clean code, appropriate patterns, comments where needed |
| Documentation | 10 | Clear README, setup instructions if needed |

### Submission Format

```text title="submission_directory_structure"
module-X-exercises/
├── README.md              # Overview of completed exercises
├── exercise_1/
│   ├── src/               # Source code
│   └── output.txt         # Terminal output / screenshots
├── exercise_2/
│   └── ...
└── exercise_N/
    └── ...
```

## Capstone Project Rubric

### Component Scores (70 points)

#### Voice Interface (10 points)

| Score | Criteria |
|-------|----------|
| 10 | Reliable speech recognition, handles varied accents, natural TTS |
| 7-9 | Speech recognition works, occasional errors, functional TTS |
| 4-6 | Basic speech input/output, frequent errors |
| 1-3 | Minimal speech functionality |
| 0 | No voice interface |

#### Cognitive Planning (15 points)

| Score | Criteria |
|-------|----------|
| 13-15 | Handles complex multi-step tasks, re-plans on failure, contextual |
| 9-12 | Decomposes tasks into 3+ steps, basic error handling |
| 5-8 | Simple task decomposition, limited re-planning |
| 1-4 | Minimal planning capability |
| 0 | No planning component |

#### Navigation (15 points)

| Score | Criteria |
|-------|----------|
| 13-15 | Robust Nav2 integration, dynamic obstacle avoidance, multiple locations |
| 9-12 | Navigates reliably between 3+ locations, basic obstacle avoidance |
| 5-8 | Point-to-point navigation works, occasional failures |
| 1-4 | Basic movement commands only |
| 0 | No navigation |

#### Perception (15 points)

| Score | Criteria |
|-------|----------|
| 13-15 | Detects 5+ objects, estimates 3D pose, integrates with SLAM |
| 9-12 | Detects 3+ objects reliably, basic pose estimation |
| 5-8 | Detects objects with limited accuracy |
| 1-4 | Minimal detection capability |
| 0 | No perception |

#### Manipulation (15 points)

| Score | Criteria |
|-------|----------|
| 13-15 | Pick-and-place multiple objects, force feedback, reliable grasps |
| 9-12 | Pick-and-place works for 2+ objects, some failures |
| 5-8 | Basic grasping, limited objects |
| 1-4 | Gripper control only, no integrated manipulation |
| 0 | No manipulation |

### Integration Score (15 points)

| Score | Criteria |
|-------|----------|
| 13-15 | All 5 components work seamlessly, handles 3+ complete scenarios |
| 9-12 | Components connected, 2+ scenarios work end-to-end |
| 5-8 | Partial integration, some components work together |
| 1-4 | Components work independently but not integrated |
| 0 | No integration |

### Quality Score (15 points)

| Category | Points | Criteria |
|----------|--------|----------|
| Code Architecture | 5 | Clean separation, proper ROS 2 patterns, typed interfaces |
| Error Handling | 3 | Graceful failures, informative error messages, recovery |
| Documentation | 4 | README, architecture diagram, setup instructions |
| Presentation | 3 | Live demo or video, clear explanation of design decisions |

:::info[Grading Breakdown]
Component scores (70 points) test individual subsystem quality, integration scores (15 points) test end-to-end functionality, and quality scores (15 points) evaluate engineering practices. Aim for strong integration scores since that is the capstone's primary purpose.
:::

## Capstone Submission

### Required Deliverables

```text title="capstone_project_structure"
capstone-project/
├── README.md                    # Project overview and setup
├── docs/
│   ├── architecture.md          # System architecture diagram
│   ├── design-decisions.md      # Key decisions and rationale
│   └── demo-script.md           # Step-by-step demo instructions
├── src/
│   ├── capstone_robot/          # Main ROS 2 package
│   │   ├── package.xml
│   │   ├── setup.py
│   │   └── capstone_robot/
│   │       ├── voice_node.py
│   │       ├── planner_node.py
│   │       ├── perception_node.py
│   │       ├── navigation_node.py
│   │       ├── manipulation_node.py
│   │       └── coordinator.py
│   └── capstone_bringup/        # Launch and config package
│       ├── launch/
│       │   ├── capstone.launch.py
│       │   └── capstone_sim.launch.py
│       └── config/
│           ├── nav2_params.yaml
│           └── perception_params.yaml
├── test/
│   ├── test_voice.py
│   ├── test_planner.py
│   ├── test_perception.py
│   ├── test_navigation.py
│   ├── test_manipulation.py
│   └── test_integration.py
└── media/
    ├── demo_video.mp4           # 3-5 minute demo video
    └── screenshots/             # Key system states
```

### Submission Checklist

- [ ] All source code compiles with `colcon build`
- [ ] System launches with a single launch file
- [ ] README includes setup instructions
- [ ] Architecture diagram included
- [ ] At least 3 test scenarios documented
- [ ] Demo video (3-5 minutes) or live demo prepared
- [ ] Design decisions documented with rationale

:::warning[Submission Deadline]
Late submissions receive a 10% deduction per day. Ensure your repository is tagged and accessible before the deadline. Test your setup instructions on a clean environment before submitting.
:::

## Grading Scale

| Grade | Score | Description |
|-------|-------|-------------|
| A | 90-100 | Exceptional integration, all components robust |
| B | 80-89 | Strong implementation, minor issues |
| C | 70-79 | Functional system, notable gaps |
| D | 60-69 | Partially working, major gaps |
| F | &lt;60 | Incomplete or non-functional |

## Academic Integrity

- Code must be your own work or properly attributed
- Use of AI coding assistants is allowed but must be documented
- External libraries and packages must be listed in dependencies
- Collaboration on architecture discussions is encouraged; code sharing is not

:::tip[Key Takeaways]
- The capstone project is worth 35% of the total grade -- start early
- Component scores (70 pts) reward individual subsystem quality
- Integration scores (15 pts) reward end-to-end functionality
- Quality scores (15 pts) reward clean code, documentation, and presentation
- Test on a clean environment before final submission
:::

## Questions

For assessment questions, contact the course instructor or post in the course forum.
