# Contract: Content Type Variants

**Feature**: 002-chapter-template-system
**Date**: 2026-02-09

---

## Overview

Four content types share the same mandatory section order but differ in emphasis, optional sections, and authoring guidance.

## Variant Matrix

| Section | Tutorial | Concept | Hands-on Lab | Reference |
|---------|----------|---------|-------------|-----------|
| Frontmatter | Required | Required | Required | Required |
| Time Badge | Required | Required | Required | Required |
| Learning Objectives | Required | Required | Required | Required |
| Prerequisites | Required (specific chapters) | Required (general knowledge) | Required (specific chapters + tools) | Optional |
| Step-by-step Instructions | **Primary** | Not used | **Primary** | Not used |
| Conceptual Explanations | Supporting | **Primary** | Minimal | Minimal |
| Diagrams (Mermaid) | Supporting | **Central** | Minimal | Structural |
| Code Examples | Extensive (runnable) | Illustrative (short) | Exercise-focused | Complete (reference) |
| Tables/Comparisons | Supporting | **Central** | Minimal | **Central** |
| Exercises/Challenges | Optional | Not used | **Primary** | Not used |
| Safety Warnings | When applicable | When applicable | **Required** (hardware labs) | When applicable |
| Key Takeaways | Required | Required | Required | Required |
| Next Steps | Required | Required | Required | Optional |

## Variant Guidance

### Tutorial
- **Focus**: "Follow along and build X"
- **Main content pattern**: Numbered steps with code blocks at each step
- **Code blocks**: Runnable, cumulative (each builds on previous)
- **Admonitions**: `:::tip` for shortcuts, `:::warning` for gotchas
- **Example chapters**: installation.md, building-packages.md

### Concept
- **Focus**: "Understand how X works and why"
- **Main content pattern**: Explanation → Diagram → Comparison → Example
- **Code blocks**: Short illustrative snippets, not full programs
- **Admonitions**: `:::info` for context, `:::note` for supplementary detail
- **Example chapters**: what-is-physical-ai.md, core-concepts.md

### Hands-on Lab
- **Focus**: "Complete this guided exercise"
- **Main content pattern**: Objective → Setup → Exercise steps → Validation
- **Code blocks**: Exercise code with highlighted key lines
- **Admonitions**: `:::danger` for hardware safety, `:::warning` for common errors
- **Example chapters**: exercises.md files in each module

### Reference
- **Focus**: "Look up how to use X"
- **Main content pattern**: Command/API → Parameters → Examples → Notes
- **Code blocks**: Complete reference snippets with all options
- **Admonitions**: `:::note` for version notes, `:::warning` for deprecations
- **Example chapters**: troubleshooting.md, resources.md
