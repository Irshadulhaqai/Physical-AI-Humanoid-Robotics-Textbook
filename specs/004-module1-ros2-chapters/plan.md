# Implementation Plan: Module 1 — ROS 2 Jazzy Chapter Content

**Branch**: `004-module1-ros2-chapters` | **Date**: 2026-02-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-module1-ros2-chapters/spec.md`

## Summary

Surgically enhance 6 existing Module 1 chapters (~2,000 lines) with updated installation procedures, humanoid-specific code examples, common pitfalls documentation, and technical accuracy verification against ROS 2 Jazzy official documentation. Content uses native Docusaurus MDX features (admonitions, code blocks, Mermaid diagrams) — no custom React components per DD-1 from feature 002.

## Technical Context

**Language/Version**: Python 3.12 (code examples), Markdown/MDX (content), TypeScript 5.6 (Docusaurus config)
**Primary Dependencies**: Docusaurus 3.9.2, @docusaurus/theme-mermaid 3.9.2, @docusaurus/preset-classic 3.9.2, AJV 8.x (frontmatter validation)
**Storage**: Static files (Markdown), no database
**Testing**: `npm run build` (zero errors), frontmatter validation plugin, manual code syntax review
**Target Platform**: GitHub Pages (static site), browsers supporting ES2020+
**Project Type**: Static documentation site (Docusaurus) — content enhancement, not new infrastructure
**Performance Goals**: Lighthouse Performance >=90, Accessibility >=95, Best Practices >=90, SEO = 100
**Constraints**: Zero custom React components (DD-1); surgical enhancement not rewrite; all code examples must be valid ROS 2 Jazzy/Python 3.12
**Scale/Scope**: 6 chapters, ~2,000 existing lines, estimated 400-600 lines of additions/modifications

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Check (PASS)

| # | Principle | Status | Notes |
|---|-----------|--------|-------|
| 1 | Content Accuracy & Technical Rigor (NON-NEGOTIABLE) | PASS | All code examples verified against ROS 2 Jazzy docs. Installation updated to current official method. Humanoid patterns use standard message types. |
| 2 | Educational Clarity & Accessibility | PASS | Progressive difficulty (installation → concepts → packages → agents → URDF → exercises). Prerequisites explicitly defined per chapter. |
| 3 | Consistency & Standards (NON-NEGOTIABLE) | PASS | Follows chapter template from feature 002. Code block standards (title, showLineNumbers, highlighting) enforced. Admonition types per style guide. |
| 4 | Docusaurus Structure & Quality | PASS | Frontmatter validated at build time. Internal links use relative paths. Sidebar positions defined. |
| 5 | Code Example Quality | PASS | All examples syntactically correct Python 3.12. Expected outputs documented. Dependencies listed. Error handling demonstrated in Chapter 1.4. |
| 6 | Deployment & Publishing Standards | PASS | `npm run build` must pass with zero errors. Existing build pipeline unchanged. |

### Post-Design Re-Check (PASS)

| Artifact | Constitution Compliance |
|----------|------------------------|
| research.md | 6 research questions resolved with verified Jazzy documentation sources |
| data-model.md | 5 entities map to chapter content types and template requirements |
| quickstart.md | 5-step workflow enforces Principles 1 (accuracy), 2 (clarity), 6 (build validation) |

**Gate result**: PASS (no violations)

## Project Structure

### Documentation (this feature)

```text
specs/004-module1-ros2-chapters/
├── plan.md                            # This file
├── spec.md                            # Feature specification (90 FRs)
├── research.md                        # Phase 0: 6 research questions resolved
├── data-model.md                      # Phase 1: 5 entities defined
├── quickstart.md                      # Phase 1: 5-step enhancement workflow
├── checklists/
│   └── requirements.md                # 14-item spec quality checklist
└── tasks.md                           # Phase 2 output (created by /sp.tasks)
```

### Source Code (repository root)

```text
my-website/
├── docs/
│   └── module-1/
│       ├── index.md                   # Module overview (minor updates)
│       ├── installation.md            # Ch 1.1: Major update (installation method)
│       ├── core-concepts.md           # Ch 1.2: Enhancement (QoS, mistakes, humanoid examples)
│       ├── building-packages.md       # Ch 1.3: Enhancement (data_files, launch patterns)
│       ├── python-agents.md           # Ch 1.4: Enhancement (humanoid patterns, Going Further)
│       ├── urdf-basics.md             # Ch 1.5: Enhancement (humanoid Xacro, ros2_control)
│       └── exercises.md               # Ch 1.6: Enhancement (humanoid context, checklists)
├── plugins/
│   └── validate-frontmatter.ts        # Existing — validates chapter frontmatter
├── templates/
│   └── chapter-template.md            # Existing — chapter structure reference
└── docs-guides/
    ├── style-guide.md                 # Existing — authoring standards
    └── migration-guide.md             # Existing — migration reference
```

**Structure Decision**: No new files or directories. All work is enhancement of existing 7 files (6 chapters + index) in `my-website/docs/module-1/`.

## Implementation Strategy

### Enhancement Scope Per Chapter

| Chapter | Existing Lines | Enhancement Type | Key Additions |
|---------|---------------|------------------|---------------|
| 1.1 Installation | 137 | **Major update** | ros2-apt-source method, Docker alternative, humanoid packages, expanded troubleshooting |
| 1.2 Core Concepts | 384 | **Enhancement** | QoS compatibility table, Common Mistakes section (5+ pitfalls), humanoid message types |
| 1.3 Building Packages | 342 | **Enhancement** | data_files patterns, ament_index explanation, YAML parameter files, best practices |
| 1.4 Python Agents | 394 | **Enhancement** | JointState/JointTrajectory patterns, executor reference table, "Going Further" callouts |
| 1.5 URDF Basics | 404 | **Enhancement** | Humanoid leg Xacro macro, ros2_control tags, inertia macros, kinematic chain |
| 1.6 Exercises | 323 | **Enhancement** | Humanoid context in exercises, verification checklists, challenge exercise integration |
| index.md | ~60 | **Minor update** | Verify links and consistency |

### Execution Order

Chapters should be enhanced in dependency order:
1. **Ch 1.1 Installation** (P1, no dependencies — gateway chapter)
2. **Ch 1.2 Core Concepts** (P1, depends on 1.1 for verification)
3. **Ch 1.3 Building Packages** (P1, depends on 1.2 for concepts)
4. **Ch 1.4 Python Agents** (P2, depends on 1.2 + 1.3)
5. **Ch 1.5 URDF Basics** (P2, depends on 1.2, partially parallel with 1.4)
6. **Ch 1.6 Exercises** (P2, depends on all above)
7. **index.md** (final — update after all chapters done)

### Parallel Opportunities

- Ch 1.4 (Python Agents) and Ch 1.5 (URDF Basics) can be enhanced in parallel after Ch 1.3 is complete
- Cross-cutting validation (FR-083 to FR-090) runs after all chapter enhancements

### Validation Strategy

After each chapter enhancement:
1. Verify frontmatter has all 7 required fields
2. Check template compliance (learning objectives, prerequisites, time badge, key takeaways, next steps)
3. Run `npm run build` to confirm zero errors
4. Review code examples for syntactic correctness

Final validation:
1. Full `npm run build` — all 42+ docs pass
2. Verify all internal links resolve
3. Spot-check humanoid context ratio (>= 80% of code examples)
4. Verify Common Mistakes section has 5+ pitfalls in Ch 1.2

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| DD-1: Implementation approach | Surgical enhancement | Preserve 2,000 lines of validated content; add missing sections per FRs |
| DD-2: ROS 2 distribution | Jazzy Jalisco | Ubuntu 24.04 LTS, Python 3.12, EOL 2029, current official docs |
| DD-3: Component approach | Native Docusaurus admonitions | Per feature 002 DD-1: zero custom React components |
| DD-4: Ch 1.4 scope management | Trim advanced topics | Lifecycle nodes, composable nodes, walk action server → "Going Further" callouts |
| DD-5: Installation method | ros2-apt-source package | Current official method, simpler than legacy GPG key approach |
| DD-6: Code example context | Humanoid robotics | JointState, JointTrajectory, URDF humanoid patterns instead of turtlesim |

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Installation steps change in Jazzy patch | High | Medium | Pin to `ros-jazzy-desktop` meta-package; document version check |
| Existing content has hidden dependencies on current structure | Medium | Low | Read each chapter fully before modifying; preserve heading structure |
| Code examples may not compile without ROS 2 environment | Medium | Medium | Verify syntax manually; use established ROS 2 patterns from official docs |
| Build breaks from new content | High | Low | Run `npm run build` after each chapter; incremental commits |

## Estimated Effort

| Phase | Effort | Description |
|-------|--------|-------------|
| Ch 1.1 Installation | Major | Rewrite installation steps, add Docker, add humanoid packages, expand troubleshooting |
| Ch 1.2 Core Concepts | Medium | Add QoS table, Common Mistakes, humanoid message examples |
| Ch 1.3 Building Packages | Medium | Add data_files, ament_index, YAML params, best practices |
| Ch 1.4 Python Agents | Medium | Add humanoid patterns, Going Further callouts, executor table |
| Ch 1.5 URDF Basics | Major | Add humanoid leg macro, ros2_control, inertia macros |
| Ch 1.6 Exercises | Medium | Enhance humanoid context, add checklists |
| Validation & Polish | Light | Build validation, link checks, consistency review |
