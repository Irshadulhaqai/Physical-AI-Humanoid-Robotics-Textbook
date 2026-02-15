# Contract: Admonition Standards

**Feature**: 002-chapter-template-system
**Date**: 2026-02-09

---

## Admonition Types and Usage Criteria

### `:::note` — Supplementary Information
**Color**: Gray/blue | **Icon**: Info

**Use when**: Providing background context that enriches understanding but isn't essential to the main content flow.

```markdown
:::note
ROS 2 uses DDS (Data Distribution Service) as its middleware layer.
This enables flexible quality-of-service configurations.
:::
```

**Do NOT use for**: Critical warnings, best practices, or learning objectives.

---

### `:::tip` — Best Practices & Shortcuts
**Color**: Green | **Icon**: Lightbulb

**Use when**: Sharing efficiency tips, best practices, keyboard shortcuts, or recommended approaches.

```markdown
:::tip[Pro Tip]
Use `ros2 topic echo --once /topic_name` to capture a single message
without flooding your terminal.
:::
```

**Do NOT use for**: Warnings about common mistakes or safety issues.

---

### `:::info` — Context & Learning Blocks
**Color**: Blue | **Icon**: Circle-i

**Use when**: Presenting learning objectives, prerequisites, or providing essential context blocks.

```markdown
:::info[What You'll Learn]
- Create ROS 2 publisher and subscriber nodes
- Configure Quality of Service profiles
- Debug topic communication issues
:::
```

**Do NOT use for**: Supplementary "nice to know" info (use `:::note` instead).

---

### `:::warning` — Common Mistakes & Gotchas
**Color**: Yellow | **Icon**: Exclamation triangle

**Use when**: Alerting readers to common errors, version-specific gotchas, deprecated patterns, or non-obvious behavior.

```markdown
:::warning[Common Mistake]
Do not call `rclpy.spin()` before creating all publishers and subscribers.
The node will start processing callbacks immediately, potentially missing
early messages.
:::
```

**Do NOT use for**: Safety-critical or hardware damage scenarios (use `:::danger`).

---

### `:::danger` — Safety & Data Loss
**Color**: Red | **Icon**: Flame/exclamation

**Use when**: Warning about potential hardware damage, data loss, safety risks, or irreversible actions. Maps to Constitution Principle 5 (`HARDWARE` warnings).

```markdown
:::danger[Hardware Safety]
Never send velocity commands to a real robot without first testing in simulation.
Unexpected motor movements can cause physical injury or damage equipment.
:::
```

**Do NOT use for**: Recoverable mistakes or minor gotchas (use `:::warning`).

---

## Admonition with Custom Title

All admonitions support custom titles via bracket syntax:

```markdown
:::tip[Performance Tip]
Content here.
:::
```

If no custom title is provided, Docusaurus uses the type name (Note, Tip, Info, Warning, Danger).

## Nesting Rules

- Admonitions CAN be nested inside `<details>` blocks
- Admonitions CAN contain code blocks
- Admonitions CAN contain Mermaid diagrams
- Admonitions SHOULD NOT be nested inside other admonitions
- Admonitions inside Tabs components require empty lines around Markdown syntax

## Frequency Guidelines

| Content Type | Expected Admonition Density |
|-------------|---------------------------|
| Tutorial | 2-4 per chapter (tips + warnings) |
| Concept | 1-3 per chapter (notes + info) |
| Hands-on Lab | 3-5 per chapter (warnings + danger + tips) |
| Reference | 1-2 per chapter (notes + warnings) |
