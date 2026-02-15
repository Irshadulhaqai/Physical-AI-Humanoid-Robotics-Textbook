# Data Model: Module 1 — ROS 2 Jazzy Chapter Content

**Feature**: 004-module1-ros2-chapters
**Date**: 2026-02-14

## Content Hierarchy

```
Module 1 (index.md)
├── Chapter 1.1: Installation (installation.md)
├── Chapter 1.2: Core Concepts (core-concepts.md)
├── Chapter 1.3: Building Packages (building-packages.md)
├── Chapter 1.4: Python Agents (python-agents.md)
├── Chapter 1.5: URDF Basics (urdf-basics.md)
└── Chapter 1.6: Exercises (exercises.md)
```

## Entities

### Chapter

A Docusaurus Markdown page within Module 1.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| sidebar_position | integer | Yes | Order in sidebar (2-7, 1 reserved for index) |
| title | string | Yes | Full chapter title |
| sidebar_label | string | Yes | Short label for sidebar |
| description | string | Yes | SEO meta description |
| keywords | string[] | Yes | SEO keywords |
| estimated_time | string | Yes | Reading time (e.g., "45 minutes") |
| prerequisites | string[] | Yes | Chapter slugs (empty array if none) |
| learning_objectives | string[] | Yes | 3-6 measurable objectives |

**Validation**: Frontmatter validated by `validate-frontmatter.ts` plugin at build time against JSON schema.

### Code Example

An inline code block within a chapter demonstrating a ROS 2 concept.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| language | string | Yes | Prism language: python, bash, yaml, xml, cpp, json |
| title | string | Yes | Descriptive filename or label |
| showLineNumbers | boolean | Conditional | Required if block > 5 lines |
| highlight lines | comment | Optional | `// highlight-next-line` or `// highlight-start/end` |

**Context**: At least 80% of code examples must use humanoid-robotics context (SC-006).

### Exercise

A hands-on practice task in Chapter 1.6.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| number | integer | Yes | Sequential (1-6, where 6 is challenge) |
| title | string | Yes | Exercise name |
| estimated_time | string | Yes | Completion time |
| specification | markdown | Yes | What to build |
| starter_code | code block | Yes | Skeleton or minimal starting point |
| expected_output | text | Yes | What success looks like |
| verification_checklist | markdown list | Yes | Self-check items |

**Progression**: Exercises 1-5 progress from guided to independent. Exercise 6 (challenge) integrates 3+ chapters.

### Mermaid Diagram

An inline Mermaid diagram visualizing architecture or concepts.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | string | Yes | flowchart, sequence, graph |
| theme | string | No | neutral (default) or dark |
| purpose | string | Yes | What concept it illustrates |

**Constraint**: At least 1 per chapter (FR-088). Already supported by @docusaurus/theme-mermaid.

### Admonition

A Docusaurus callout block for pedagogical emphasis.

| Type | Usage | Color |
|------|-------|-------|
| :::info | Learning objectives, background context | Blue |
| :::note | Prerequisites, supplementary info | Gray |
| :::tip | Key takeaways, best practices, shortcuts | Green |
| :::warning | Common mistakes, gotchas | Orange |
| :::danger | Data loss risk, safety critical | Red |

## Relationships

```
Module 1
  └── has 6 Chapters (ordered by sidebar_position)
       ├── has 3-6 Learning Objectives (in frontmatter + :::info admonition)
       ├── has 0+ Prerequisites (linked to other chapters)
       ├── has 5+ Code Examples (inline, with title + language)
       ├── has 1+ Mermaid Diagrams (inline)
       ├── has 2+ Admonitions (:::tip, :::warning, etc.)
       └── Chapter 1.6 has 6 Exercises (progressive + challenge)
```

## Content Type Mapping

| Chapter | Content Type | Primary Pattern |
|---------|-------------|-----------------|
| 1.1 Installation | Tutorial | Step-by-step with verification |
| 1.2 Core Concepts | Concept | Explanation + diagrams + examples |
| 1.3 Building Packages | Tutorial | Step-by-step with code |
| 1.4 Python Agents | Concept + Tutorial | Patterns with implementation |
| 1.5 URDF Basics | Reference + Tutorial | Format spec + hands-on |
| 1.6 Exercises | Hands-on Lab | Specification + skeleton + checklist |
