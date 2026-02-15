# Quickstart: Module 1 Chapter Enhancement

**Feature**: 004-module1-ros2-chapters
**Date**: 2026-02-14

## 5-Step Enhancement Workflow

### Step 1: Read Existing Chapter
Read the current chapter file in `my-website/docs/module-1/`. Identify:
- What content is already strong (preserve)
- What sections are missing per the functional requirements
- What content needs updating (e.g., outdated installation commands)

### Step 2: Research & Verify
For each section being added or updated:
- Verify against official ROS 2 Jazzy documentation (docs.ros.org/en/jazzy/)
- Confirm code syntax is valid Python 3.12 / rclpy
- Check that CLI commands produce expected output on Jazzy

### Step 3: Enhance Content
Apply surgical updates following these rules:
- **Add** missing sections identified by FRs (e.g., Common Mistakes, QoS compatibility)
- **Update** outdated content (e.g., installation method)
- **Enhance** with humanoid-specific examples (joint states, trajectories, URDF)
- **Preserve** existing structure, headings, and working content
- Do NOT rewrite sections that are already accurate and complete

### Step 4: Validate Template Compliance
Ensure chapter follows feature 002 template:
- Frontmatter has all 7 required fields
- `:::info[What You'll Learn]` admonition with learning objectives
- `:::note[Prerequisites]` admonition with linked chapter references
- `**Estimated Time**: X minutes` badge
- `:::tip[Key Takeaways]` admonition with 3-7 points
- `## Next Steps` section with relative links

### Step 5: Build Validation
```bash
cd my-website && npm run build
```
- Zero errors required
- Frontmatter validation must pass for all 42+ docs
- No broken internal links

## Content Standards

### Code Blocks
```markdown
```python title="joint_reader.py" showLineNumbers
# highlight-next-line
from sensor_msgs.msg import JointState
```                                        (close fence)
```

- Always include `title` attribute
- Add `showLineNumbers` for blocks > 5 lines
- Use `// highlight-next-line` for pedagogically important lines
- Available languages: python, bash, yaml, xml, cpp, json, text

### Admonitions
- `:::info[What You'll Learn]` — chapter learning objectives
- `:::note[Prerequisites]` — chapter prerequisites
- `:::tip[Key Takeaways]` — end-of-chapter summary
- `:::warning` — common mistakes, gotchas
- `:::danger` — safety-critical information

### Humanoid Context (SC-006)
At least 80% of code examples should use humanoid robotics context:
- `sensor_msgs/JointState` instead of `std_msgs/String`
- `trajectory_msgs/JointTrajectory` instead of generic publishers
- Joint names like `left_hip_pitch`, `right_knee_pitch`
- Sensor topics like `/imu/data`, `/joint_states`, `/left_foot/force`

### Internal Links
```markdown
[Installation](./installation.md)
[Core Concepts](./core-concepts.md)
[Module 2: Digital Twin](../module-2-digital-twin/index.md)
```
Always use relative paths. Never use absolute URLs for internal content.
