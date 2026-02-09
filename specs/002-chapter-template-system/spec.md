# Feature Specification: Chapter Template System

**Feature Branch**: `002-chapter-template-system`
**Created**: 2026-02-05
**Status**: Draft
**Input**: Book layout audit findings — standardize chapter structure across 50+ chapters with reusable MDX components, code standards, and navigation patterns.

## Context & Problem Statement

The Physical AI & Humanoid Robotics textbook (Docusaurus 3.x) has 42+ documentation files with inconsistent structure. A layout audit identified:

- **No chapter template**: Authors write from scratch each time, producing varying structures
- **Underutilized Docusaurus features**: Admonitions (tip/warning/info/danger), code block enhancements (title, line highlighting, showLineNumbers), and tabs are not used
- **Manual navigation**: No consistent "What You'll Learn" / "Key Takeaways" / "Next Steps" sections
- **No content type variants**: Tutorials, concept explainers, labs, and reference pages all follow the same format despite having different pedagogical needs

### Current State

- 42 docs files across 6 sections (Introduction, Modules 1-4, Appendices)
- Frontmatter schema exists (`contracts/frontmatter-schema.json`) with 7 required fields
- Mermaid diagrams integrated via `@docusaurus/theme-mermaid`
- Local search via `@easyops-cn/docusaurus-search-local`
- Prism syntax highlighting for Python, Bash, YAML, C++, JSON
- No custom MDX components exist

### Desired State

- Standardized chapter template with 4 content type variants
- Reusable MDX components for learning-focused UI elements
- Consistent code block practices across all chapters
- Docusaurus admonitions used systematically for pedagogical callouts
- Auto-generated prev/next navigation and key takeaways in every chapter

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Chapter from Template (Priority: P1)

As a content author, I want a chapter template so I can create consistently structured chapters without guessing the format.

**Why this priority**: This is the foundation — without the template, no other standardization can happen. Every chapter must follow a predictable structure.

**Independent Test**: Create a new chapter file using the template, verify it has all required sections and frontmatter, and confirm `npm run build` passes.

**Acceptance Scenarios**:

1. **Given** a content author starts a new chapter, **When** they copy the chapter template, **Then** the file contains all mandatory sections (frontmatter, Learning Objectives, Prerequisites, main content area, Key Takeaways, Next Steps) with placeholder instructions.
2. **Given** a chapter template for type "Tutorial", **When** the author fills in the content, **Then** the rendered page shows a time estimate badge, numbered prerequisites, learning objectives as a checklist, and step-by-step sections.
3. **Given** a chapter template for type "Concept", **When** the author fills in the content, **Then** the rendered page emphasizes explanation with diagrams and comparisons rather than step-by-step instructions.
4. **Given** a completed chapter from any template variant, **When** `npm run build` runs, **Then** it compiles with zero errors and zero warnings.

---

### User Story 2 - Display Learning Components (Priority: P1)

As a student reader, I want to see learning objectives, prerequisites, and estimated time at the top of every chapter so I can decide whether I'm ready and how long it will take.

**Why this priority**: These components directly impact learning outcomes and reader navigation. They are referenced in the existing frontmatter schema but not rendered visually.

**Independent Test**: Open any chapter page in the browser, verify the learning objectives, prerequisites, and time estimate are visually displayed in a styled section at the top of the content.

**Acceptance Scenarios**:

1. **Given** a chapter with `learning_objectives` in frontmatter, **When** the page renders, **Then** the objectives appear as a styled list near the top with a "What You'll Learn" heading.
2. **Given** a chapter with `prerequisites` listing other chapter IDs, **When** the page renders, **Then** each prerequisite appears as a linked reference to its chapter.
3. **Given** a chapter with `estimated_time` in frontmatter, **When** the page renders, **Then** a time badge (e.g., "45 minutes") is displayed visually.

---

### User Story 3 - Standardized Code Examples (Priority: P2)

As a student, I want code examples to have clear titles, appropriate line highlighting, and line numbers so I can understand what each code block demonstrates and which lines are important.

**Why this priority**: Code is the primary learning artifact in a robotics course. Inconsistent code blocks reduce comprehension. Currently ~80% of code blocks lack titles or highlighting.

**Independent Test**: Open a chapter with code blocks, verify each has a title attribute, relevant lines are highlighted, and Python/Bash blocks show line numbers.

**Acceptance Scenarios**:

1. **Given** a code block in a chapter, **When** it follows the template standard, **Then** it has a `title` attribute describing the file or purpose (e.g., `title="talker_node.py"`).
2. **Given** a code block with important lines, **When** the author marks them with `// highlight-next-line` or the line range syntax, **Then** those lines render with a highlighted background.
3. **Given** a Python or Bash code block, **When** `showLineNumbers` is specified, **Then** line numbers appear for blocks exceeding 5 lines.

---

### User Story 4 - Pedagogical Callouts (Priority: P2)

As a content author, I want a clear guide on when to use which Docusaurus admonition type (tip, info, warning, danger, note) so the book has consistent pedagogical signaling.

**Why this priority**: Docusaurus admonitions are built-in and zero-effort but currently unused. They provide strong visual cues that improve learning retention.

**Independent Test**: Open a chapter that uses admonitions, verify each type renders with the correct color and icon, and the usage matches the style guide definitions.

**Acceptance Scenarios**:

1. **Given** a chapter with a practical suggestion, **When** the author uses `:::tip`, **Then** it renders as a green-accented callout with a lightbulb icon.
2. **Given** a chapter with a common mistake warning, **When** the author uses `:::warning`, **Then** it renders as a yellow-accented callout alerting the reader.
3. **Given** a chapter with a destructive or safety-critical note, **When** the author uses `:::danger`, **Then** it renders as a red-accented callout.
4. **Given** the style guide, **When** an author needs to choose an admonition type, **Then** the guide defines clear criteria: `note` = supplementary information, `tip` = best practice/shortcut, `info` = background context, `warning` = common mistake/gotcha, `danger` = data loss/safety risk.

---

### User Story 5 - Chapter Navigation (Priority: P3)

As a student, I want consistent "Next Steps" sections at the bottom of every chapter so I can easily navigate to the next logical chapter without going back to the sidebar.

**Why this priority**: Navigation is important for reading flow but not blocking — the sidebar already provides navigation. This is a polish feature.

**Independent Test**: Open a chapter, scroll to the bottom, verify a "Next Steps" section with links to related/next chapters exists.

**Acceptance Scenarios**:

1. **Given** a chapter at the end of content, **When** the page renders, **Then** a "Next Steps" section lists 1-3 links to the next logical chapter(s).
2. **Given** a module's last chapter, **When** the page renders, **Then** the "Next Steps" section links to the next module's overview or the exercises page.

---

### User Story 6 - Key Takeaways (Priority: P2)

As a student completing a chapter, I want a summary of key takeaways so I can verify I understood the main concepts before moving on.

**Why this priority**: Takeaways serve as a self-check mechanism. Educational research shows summaries improve retention. Currently no chapter has this section.

**Independent Test**: Open a chapter, scroll to near the bottom, verify a "Key Takeaways" section exists with 3-7 concise bullet points summarizing the chapter.

**Acceptance Scenarios**:

1. **Given** a completed chapter, **When** the page renders, **Then** a "Key Takeaways" section appears before "Next Steps" with 3-7 bullet points.
2. **Given** a Key Takeaways section, **When** a reader reviews it, **Then** each point is a single sentence summarizing one main concept from the chapter.

---

### Edge Cases

- What happens when a chapter has no prerequisites? The prerequisites section should still render but display "No prerequisites — you can start here."
- What happens when `estimated_time` is missing from frontmatter? The time badge component should not render (graceful absence, not an error).
- What happens when a code block has no meaningful title? Use the language name as fallback (e.g., "Python", "Bash").
- What happens when `<` or `>` characters appear in markdown tables? They MUST be escaped as `&lt;` / `&gt;` to avoid MDX JSX parsing errors (known issue from 001 implementation).
- What happens when a template variant doesn't match any of the 4 types? Default to the "Tutorial" variant as the most general.
- What happens when an admonition is nested inside a tab or details block? Docusaurus supports this natively; no special handling needed.

---

## Requirements *(mandatory)*

### Functional Requirements

#### Template Structure (Core)

- **FR-001**: System MUST provide a single chapter template file covering 4 content type variants (Tutorial, Concept, Hands-on Lab, Reference) using inline comments to differentiate variant-specific guidance.
- **FR-002**: The chapter template MUST be a single file with inline HTML comments that define guidance for four content type variants (Tutorial, Concept, Hands-on Lab, Reference). Comments explain which sections are required, optional, or emphasized for each content type. All variants share the mandatory section order: Frontmatter → Learning Objectives → Prerequisites → Main Content → Key Takeaways → Next Steps.
- **FR-003**: Template frontmatter MUST conform to the existing JSON Schema at `contracts/frontmatter-schema.json` (7 required fields: sidebar_position, title, sidebar_label, description, keywords, estimated_time, learning_objectives).
- **FR-004**: Templates MUST include placeholder instructions (as HTML comments) explaining what content goes in each section and how to fill it out.

#### MDX Components

- **FR-005**: System MUST provide an MDX component or pattern for rendering learning objectives from frontmatter as a styled list with a "What You'll Learn" heading.
- **FR-006**: System MUST provide an MDX component or pattern for rendering prerequisites from frontmatter as linked references to other chapters.
- **FR-007**: System MUST provide an MDX component or pattern for rendering estimated time from frontmatter as a visual badge.
- **FR-008**: System MUST provide a "Key Takeaways" section pattern — a styled summary block with 3-7 bullet points.

#### Code Block Standards

- **FR-009**: All code blocks in template examples MUST use the `title` attribute to describe the file or purpose.
- **FR-010**: Code blocks exceeding 5 lines MUST include `showLineNumbers` for Python, Bash, C++, and YAML.
- **FR-011**: Code blocks MUST use Docusaurus line highlighting (`// highlight-next-line`, `// highlight-start` / `// highlight-end`) to mark key lines.
- **FR-012**: Templates MUST document the available Prism languages: Python, Bash, YAML, C++, JSON, markup.

#### Docusaurus Admonitions

- **FR-013**: Templates MUST include a style guide defining when to use each admonition type: `:::note` (supplementary info), `:::tip` (best practice / shortcut), `:::info` (background context), `:::warning` (common mistake / gotcha), `:::danger` (data loss / safety risk).
- **FR-014**: Each content type variant section in the template MUST include at least one admonition example demonstrating proper usage. For exercise blocks with progressive hints, hints MUST unlock sequentially after users attempt to submit code/answer (attempt-based reveal requiring client-side attempt tracking).

#### Navigation

- **FR-015**: Every chapter template MUST include a "Next Steps" section at the bottom with markdown links to 1-3 related or subsequent chapters.
- **FR-016**: The template MUST use Docusaurus relative file paths (`./filename.md` or `../module/filename.md`) for internal links. Chapter metadata (frontmatter) MUST be validated during the build process (`npm run build`). Build MUST fail with clear error messages if any chapter has invalid or missing required metadata fields.

#### Style Guide

- **FR-017**: System MUST provide a chapter style guide document defining: heading hierarchy (H1 = title, H2 = main sections, H3 = subsections), maximum nesting depth (H4), admonition usage rules, code block standards, Mermaid diagram guidelines, and MDX escaping rules (`<` → `&lt;`, `{` → `&#123;`).

### Key Entities

- **ChapterTemplate**: A single markdown/MDX file template with placeholders, inline variant-specific guidance via HTML comments, and author instructions. Covers all 4 content types: Tutorial, Concept, Hands-on Lab, Reference.
- **LearningComponent**: A visual UI element rendered from frontmatter data (learning objectives, prerequisites, time estimate). Implemented as either MDX components or markdown patterns.
- **StyleGuide**: A reference document defining code, admonition, heading, and navigation standards for all chapter authors.
- **ContentType**: An enum-like classification (Tutorial | Concept | Hands-on Lab | Reference) that determines which template sections are mandatory vs. optional.

---

## Assumptions & Scope

### In Scope

- Single chapter template file with inline comments for 4 content type variants, stored in a `templates/` directory
- Style guide document for content authors
- MDX component patterns for learning objectives, prerequisites, time badge, key takeaways
- Code block and admonition usage standards
- Migration guide for updating existing 42 chapters (guidance only, not execution)

### Out of Scope

- Actually migrating all 42 existing chapters to the new template (separate feature)
- Custom React components (prefer native Docusaurus/MDX patterns first)
- Interactive exercises or quiz components
- PDF/print export formatting
- Multi-language (i18n) support
- CI/CD validation pipeline for frontmatter/structure (separate feature)
- Custom CSS theming beyond Docusaurus defaults

### Assumptions

- Docusaurus 3.x with MDX support remains the platform
- The existing frontmatter schema (`contracts/frontmatter-schema.json`) is authoritative and will not change
- Content authors have basic MDX knowledge (can use `:::admonition` syntax, code block attributes)
- The `@docusaurus/theme-mermaid` plugin remains available for diagram rendering
- No custom React component development is needed — all patterns can be achieved with MDX and native Docusaurus features
- Exercise block hint tracking uses client-side state management only (no server-side persistence or correctness validation)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A single chapter template file exists covering all 4 content type variants (Tutorial, Concept, Hands-on Lab, Reference) with complete inline guidance and no unresolved placeholders.
- **SC-002**: A new chapter created from any template variant passes `npm run build` with zero errors on first attempt. Metadata validation runs automatically during build.
- **SC-003**: Every template variant includes all 6 mandatory sections (frontmatter, learning objectives, prerequisites, main content, key takeaways, next steps).
- **SC-004**: The style guide document covers all 5 admonition types with usage criteria and examples.
- **SC-005**: The style guide document defines code block standards (title, showLineNumbers, highlighting) with before/after examples.
- **SC-006**: At least 1 existing chapter is updated as a reference implementation demonstrating the complete template in practice.
- **SC-007**: The chapter template frontmatter validates against the existing JSON Schema at `contracts/frontmatter-schema.json`.
- **SC-008**: All internal links in templates use Docusaurus-compatible relative paths that resolve correctly.
- **SC-009**: MDX component patterns for learning objectives, prerequisites, and time badge render correctly in the Docusaurus dev server. Build produces zero failures related to invalid metadata or template structure.
- **SC-010**: The migration guide provides clear, step-by-step instructions for updating existing chapters to the new template structure.

---

## Design Decisions

### DD-1: Native MDX Patterns vs. Custom React Components

**Decision**: Use native Docusaurus MDX patterns (admonitions, code block attributes, markdown) over custom React components.

**Rationale**: Custom components require JSX imports in every file, add build complexity, and increase maintenance burden. Native patterns are zero-config, documented by Docusaurus, and familiar to MDX authors. If limitations are found, custom components can be added incrementally.

### DD-2: Template Files vs. Docusaurus Plugin

**Decision**: Provide template files that authors manually copy, rather than a Docusaurus plugin or CLI scaffolding tool.

**Rationale**: The textbook has ~50 chapters total. A copy-and-fill workflow is sufficient at this scale. A plugin would add maintenance cost disproportionate to the benefit.

### DD-3: Content Type as Convention, Not Enforcement

**Decision**: Content types (Tutorial, Concept, Lab, Reference) are conveyed through template choice and optional frontmatter metadata — not enforced by build tooling.

**Rationale**: Build-time enforcement adds complexity and blocks authors. Convention-based guidance with clear templates is sufficient for a small author team.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Authors ignore templates and write freestyle | Medium | Make templates the path of least resistance; provide migration guide |
| MDX escaping issues (`<`, `{`) in new content | High | Document all escaping rules prominently in style guide; add to edge cases checklist |
| Template structure becomes outdated as Docusaurus evolves | Low | Pin Docusaurus version; review templates on major version upgrades |

---

## Clarifications *(optional)*

### Session 2026-02-05

- Q: How should Exercise Block progressive hints be revealed to learners? → A: Attempt-based reveal — hints unlock after users try submitting code/answer (requires client-side attempt tracking, no server-side persistence)
- Q: Should content type variants have separate template files or be part of one template? → A: Single template with conditional comments explaining which sections apply to which content type
- Q: When should chapter metadata validation occur in the authoring workflow? → A: On build — validation runs during `npm run build` as a pre-deployment check; build fails with clear errors on invalid metadata
