<!--
Sync Impact Report
==================
Version change: N/A → 1.0.0 (Initial ratification)
Modified principles: N/A (Initial creation)
Added sections: All (Initial creation)
  - Header & Governance
  - Six Core Principles
  - Content Development Workflow
  - Quality Gates & Review Process
Removed sections: N/A
Templates verified:
  ✅ spec-template.md - Aligned (user stories, acceptance criteria)
  ✅ plan-template.md - Aligned (constitution check section present)
  ✅ tasks-template.md - Aligned (phase structure, checkpoints)
Follow-up TODOs: None
-->

# Project Constitution: Physical AI Humanoid Robotics Textbook

**Version**: 1.0.0
**Ratification Date**: 2026-02-02
**Last Amended**: 2026-02-02
**Status**: Active

## Purpose

This constitution establishes the governing principles for the Physical AI Humanoid Robotics Textbook project. The project delivers educational content about humanoid robotics using Docusaurus, deployed to GitHub Pages, developed with Spec-Kit Plus and Claude Code for AI/spec-driven development.

All contributors (human and AI) MUST adhere to these principles. Violations require explicit justification and constitution amendment.

---

## Core Principles

### Principle 1: Content Accuracy & Technical Rigor (NON-NEGOTIABLE)

All technical claims, formulas, code examples, and research references MUST be accurate and verifiable.

**Requirements**:
- Code examples MUST be syntactically correct and runnable on specified platforms
- Mathematical formulas MUST be verified against authoritative sources
- Research citations MUST link to peer-reviewed or official documentation
- Version-specific content (ROS 2 Jazzy, Isaac Sim, Gazebo Harmonic) MUST match stated versions
- Hardware specifications MUST reflect actual product capabilities

**Rationale**: Technical education requires precision. Inaccurate content damages learner trust and causes debugging frustration.

---

### Principle 2: Educational Clarity & Accessibility

Content MUST progress logically from fundamentals to advanced topics with clear learning pathways.

**Requirements**:
- Each module MUST define prerequisites explicitly
- Concepts MUST be introduced before being used
- Jargon MUST be defined on first use and linked to glossary
- Examples MUST precede abstract explanations where pedagogically appropriate
- Difficulty progression MUST be explicit (beginner → intermediate → advanced labels)

**Rationale**: Learners with varying backgrounds need clear pathways. Jumping to advanced concepts without foundation creates barriers.

---

### Principle 3: Consistency & Standards (NON-NEGOTIABLE)

Uniform terminology, formatting, and structure MUST be enforced across all content.

**Requirements**:
- Terminology MUST match glossary definitions exactly (e.g., "ROS 2" not "ROS2" or "ros2")
- Code block language identifiers MUST be consistent (python, bash, xml, cpp)
- Heading hierarchy MUST follow H1 → H2 → H3 without skipping levels
- Admonition types MUST use standard labels: `:::note`, `:::tip`, `:::warning`, `:::danger`, `:::info`
- File naming MUST use kebab-case (e.g., `voice-to-action.md`)

**Rationale**: Inconsistency creates cognitive load and suggests carelessness. Standards enable automation and maintenance.

---

### Principle 4: Docusaurus Structure & Quality

Documentation MUST be navigable, searchable, and maintainable with proper metadata and organization.

**Requirements**:
- Every content page MUST have frontmatter with `sidebar_position` and `title`
- Sidebar configuration MUST reflect logical content hierarchy
- Internal links MUST use relative paths, not absolute URLs
- Images MUST have alt text for accessibility
- Search plugin MUST index all content pages

**Rationale**: Documentation usability depends on navigation and discoverability. Poor structure defeats the purpose of comprehensive content.

---

### Principle 5: Code Example Quality

All code MUST be runnable, well-documented, pedagogically sound, and include safety warnings where appropriate.

**Requirements**:
- Code blocks MUST specify the language for syntax highlighting
- Expected outputs MUST be shown for commands and scripts
- Hardware-interacting code MUST include safety warnings (⚠️ HARDWARE)
- Dependencies MUST be listed before code that requires them
- Error handling MUST be demonstrated for real-world scenarios

**Rationale**: Learners will copy-paste code. Broken or unsafe examples cause frustration and potential harm.

---

### Principle 6: Deployment & Publishing Standards

Published content MUST build successfully, load quickly, and meet quality gates.

**Requirements**:
- `yarn build` MUST complete with zero errors
- Lighthouse Performance score MUST be ≥90
- Lighthouse Accessibility score MUST be ≥95
- Lighthouse Best Practices score MUST be ≥90
- Lighthouse SEO score MUST be 100
- All internal links MUST resolve (no 404s)
- All external links MUST point to live resources

**Rationale**: Published educational content represents project quality. Broken builds and slow pages undermine credibility.

---

## Content Development Workflow

### Spec-Driven Chapter Creation

1. **Specification** (`/sp.specify`): Define chapter learning objectives, prerequisites, and acceptance criteria
2. **Planning** (`/sp.plan`): Research accurate content, design structure, identify code examples
3. **Task Generation** (`/sp.tasks`): Break chapter into reviewable content chunks
4. **Implementation** (`/sp.implement`): Write content following principles above
5. **Review Gate**: Human verification of technical accuracy before merge

### Content Types

| Type | Purpose | Quality Gate |
|------|---------|--------------|
| Concept pages | Explain theory and fundamentals | Technical accuracy review |
| Tutorial pages | Step-by-step guided exercises | Code execution verification |
| Reference pages | API/command documentation | Version accuracy check |
| Exercise pages | Practice problems | Solution verification |

---

## Quality Gates & Review Process

### Pre-Merge Gates

- [ ] All code blocks tested on target platform
- [ ] Mermaid diagrams render correctly
- [ ] Internal links validated
- [ ] Word count within target range
- [ ] Frontmatter complete
- [ ] `yarn build` passes

### Review Criteria

- Technical accuracy (verified against official docs)
- Educational clarity (logical flow, prerequisites met)
- Consistency (terminology, formatting, style)
- Accessibility (alt text, heading hierarchy)

### Review Roles

- **Content Author**: Creates content following principles
- **Technical Reviewer**: Verifies accuracy and code correctness
- **Editorial Reviewer**: Checks clarity, consistency, accessibility

---

## Governance

### Amendment Process

1. Propose change with rationale
2. Assess impact on existing content and templates
3. Version bump according to semantic versioning:
   - **MAJOR**: Principle removal or incompatible redefinition
   - **MINOR**: New principle or material expansion
   - **PATCH**: Clarification or typo fix
4. Update dependent templates if affected
5. Document in Sync Impact Report

### Compliance Review

- Constitution check required before planning phase
- Re-check after design phase if scope changes
- Violations MUST be documented with justification

### Version History

| Version | Date | Change Summary |
|---------|------|----------------|
| 1.0.0 | 2026-02-02 | Initial ratification |
