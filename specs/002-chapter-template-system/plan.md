# Implementation Plan: Chapter Template System

**Branch**: `002-chapter-template-system` | **Date**: 2026-02-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-chapter-template-system/spec.md`

## Summary

Standardize chapter structure across 50+ chapters with a single reusable template file covering 4 content type variants (Tutorial, Concept, Hands-on Lab, Reference), a comprehensive style guide, native MDX component patterns for learning elements, and build-time frontmatter validation via a Docusaurus plugin.

## Technical Context

**Language/Version**: TypeScript 5.6 (Docusaurus config + plugin), MDX/Markdown (content)
**Primary Dependencies**: Docusaurus 3.9.2, React 19.x, @docusaurus/preset-classic 3.9.2, @docusaurus/theme-mermaid 3.9.2, @easyops-cn/docusaurus-search-local 0.52.3, AJV 8.x (new — frontmatter validation)
**Storage**: Static files (Markdown/MDX), no database
**Testing**: `npm run build` (zero errors), manual browser verification, AJV schema validation
**Target Platform**: GitHub Pages (static site), browsers supporting ES2020+
**Project Type**: Static documentation site (Docusaurus)
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥95, Best Practices ≥90, SEO = 100
**Constraints**: Zero custom React components (DD-1); single template file (DD-2); convention-based content types (DD-3)
**Scale/Scope**: ~50 chapters across 6 sections, single author team

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Check (PASS)

| # | Principle | Status | Notes |
|---|-----------|--------|-------|
| 1 | Content Accuracy & Technical Rigor (NON-NEGOTIABLE) | PASS | Template includes placeholder guidance; no technical claims made in template itself. Code examples in style guide will be verified against official Docusaurus 3.9.2 docs. |
| 2 | Educational Clarity & Accessibility | PASS | Template enforces prerequisites, learning objectives, and progressive structure. Content type variants address different pedagogical needs. |
| 3 | Consistency & Standards (NON-NEGOTIABLE) | PASS | This feature IS the consistency enforcement mechanism. Heading hierarchy, admonition types, code block standards, and terminology rules are codified. |
| 4 | Docusaurus Structure & Quality | PASS | Frontmatter schema validation at build time. Relative paths enforced. `onBrokenLinks: 'throw'` already configured. |
| 5 | Code Example Quality | PASS with DEVIATION | Template and style guide will contain inline code examples for demonstration purposes. These are pedagogical illustrations of MDX patterns, not runnable robot code. Deviation: examples show MDX syntax patterns, not ROS 2 code — they cannot be "run on specified platforms" per Principle 5 literal text. **Justified**: These are meta-examples (examples of how to write examples), serving pedagogical continuity. |
| 6 | Deployment & Publishing Standards | PASS | Build validation (`npm run build`) enforced. Lighthouse scores are existing infrastructure concern, not changed by this feature. |

### Post-Design Re-Check (PASS)

| Artifact | Constitution Compliance |
|----------|------------------------|
| research.md | All 6 research questions resolved with verified Docusaurus 3.9.2 patterns |
| data-model.md | 6 entities map cleanly to spec requirements; no over-engineering |
| contracts/ | 4 contract files define standards matching Principles 3, 4, 5 |
| quickstart.md | 5-step workflow enforces Principles 2 (clarity) and 6 (build validation) |

**Gate result**: PASS (1 justified deviation on Principle 5)

## Project Structure

### Documentation (this feature)

```text
specs/002-chapter-template-system/
├── plan.md                            # This file
├── spec.md                            # Feature specification
├── research.md                        # Phase 0: 6 research questions resolved
├── data-model.md                      # Phase 1: 6 entities defined
├── quickstart.md                      # Phase 1: 5-step quickstart guide
├── contracts/
│   ├── template-structure.md          # Mandatory section order contract
│   ├── content-type-variants.md       # 4 content type variant matrix
│   ├── code-block-standards.md        # Code block rules with before/after
│   └── admonition-standards.md        # Admonition usage criteria
├── checklists/
│   └── requirements.md                # 41-item implementation checklist
└── tasks.md                           # Phase 2 output (created by /sp.tasks)
```

### Source Code (repository root)

```text
my-website/
├── docs/
│   └── <module>/
│       └── <chapter>.md               # Chapters using the template
├── templates/
│   └── chapter-template.md            # THE single chapter template (NEW)
├── docs-guides/
│   ├── style-guide.md                 # Chapter authoring style guide (NEW)
│   └── migration-guide.md             # Migration instructions for existing chapters (NEW)
├── plugins/
│   └── validate-frontmatter.ts        # Build-time frontmatter validator (NEW)
├── docusaurus.config.ts               # Updated to register validation plugin
├── package.json                       # Updated to add ajv dependency
└── src/
    └── css/
        └── custom.css                 # Existing (no changes expected)
```

**Structure Decision**: Static documentation site with no `src/` application code beyond Docusaurus defaults. New files are content templates, documentation guides, and one Docusaurus plugin for build-time validation. No custom React components per DD-1.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Principle 5 deviation: inline MDX examples | Style guide must demonstrate MDX syntax patterns | Cannot show code block examples without including code blocks; these are meta-examples, not robot code |
| AJV dependency addition | Build-time frontmatter validation (FR-016) | Manual validation is error-prone; Docusaurus has no built-in schema validation for frontmatter |

## Phase Summary

### Phase 0: Research (COMPLETED)

**Output**: `research.md` — 6 research questions resolved:
1. Docusaurus frontmatter handling → YAML parsed, custom fields stored but not auto-rendered
2. Learning component rendering → Manual MDX patterns using admonitions (no custom React)
3. Code block enhancements → Native metastring syntax (title, showLineNumbers, highlight comments)
4. Admonition mapping → 5 types with pedagogical usage criteria defined
5. Build-time validation → Docusaurus plugin with AJV against existing JSON Schema
6. Content type variants → HTML comments in single template file, shared section order

### Phase 1: Design (COMPLETED)

**Outputs**:
- `data-model.md` — 6 entities: ChapterFrontmatter, ChapterTemplate, ContentType, AdmonitionType, CodeBlockStandard, StyleGuide
- `contracts/template-structure.md` — Mandatory 7-section order with MDX patterns
- `contracts/content-type-variants.md` — 4-variant emphasis matrix
- `contracts/code-block-standards.md` — 4 rules with before/after examples
- `contracts/admonition-standards.md` — 5-type usage criteria with frequency guidelines
- `quickstart.md` — 5-step chapter creation workflow

### Phase 2: Implementation (PENDING — via `/sp.tasks`)

**Delivery order** (from spec priority + dependency analysis):
1. **Chapter template file** — Single file, 4 variants, all mandatory sections (FR-001–FR-004) — P1 foundation
2. **Style guide document** — Heading, admonition, code block, escaping rules (FR-017) — P2 reference
3. **Frontmatter validation plugin** — AJV-based Docusaurus plugin (FR-016) — P1 quality gate
4. **Reference implementation** — Update 1 existing chapter to demonstrate template (SC-006) — validation
5. **Migration guide** — Step-by-step instructions for existing chapters (SC-010) — P2 enabler

**Estimated task count**: 7-10 tasks (will be generated by `/sp.tasks`)

## Risks (Post-Design)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AJV adds build time overhead | Low | Low | Schema validation is fast; only runs once per doc at build |
| Template too complex for authors to follow | Medium | Medium | Quickstart guide provides 5-step flow; HTML comments are removable |
| Docusaurus plugin API changes in future versions | Low | Medium | Plugin uses stable `loadContent` lifecycle; pinned to 3.9.2 |

## Decisions Log

| ID | Decision | Rationale | Spec Reference |
|----|----------|-----------|----------------|
| DD-1 | Native MDX patterns over custom React components | Zero-config, documented, familiar to MDX authors | spec.md DD-1 |
| DD-2 | Single template file, manual copy workflow | Sufficient at ~50 chapter scale | spec.md DD-2 |
| DD-3 | Content type as convention, not enforcement | Avoids build-time blocking for author flexibility | spec.md DD-3 |
| DD-4 | AJV for frontmatter validation | Industry-standard JSON Schema validator; lightweight | research.md RQ-5 |
| DD-5 | Admonitions for learning components | `:::info` for objectives, `:::note` for prerequisites, `:::tip` for takeaways | research.md RQ-2 |
