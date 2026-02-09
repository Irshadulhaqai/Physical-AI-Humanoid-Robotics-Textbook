# Tasks: Chapter Template System

**Input**: Design documents from `/specs/002-chapter-template-system/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in the feature specification. Validation is via `npm run build` (zero errors).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing. User stories are ordered by priority (P1 first) with dependency awareness.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Content**: `my-website/docs/<module>/<chapter>.md`
- **Templates**: `my-website/templates/`
- **Guides**: `my-website/docs-guides/`
- **Plugins**: `my-website/plugins/`
- **Config**: `my-website/docusaurus.config.ts`, `my-website/package.json`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure and install dependencies needed by all user stories

- [x] T001 Create `my-website/templates/` directory for chapter template files
- [x] T002 Create `my-website/docs-guides/` directory for authoring guide documents
- [x] T003 Create `my-website/plugins/` directory for custom Docusaurus plugins
- [x] T004 Install `ajv` dependency in `my-website/package.json` for build-time frontmatter validation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the frontmatter validation plugin — MUST be complete before template and guide work to ensure build-time validation is in place

- [x] T005 Create frontmatter validation Docusaurus plugin in `my-website/plugins/validate-frontmatter.ts` — loads `specs/001-book-master-plan/contracts/frontmatter-schema.json`, validates all docs frontmatter using AJV, reports errors with file paths and field names, fails build on invalid metadata (FR-016, DD-4)
- [x] T006 Register validation plugin in `my-website/docusaurus.config.ts` — add to `plugins` array with path to `./plugins/validate-frontmatter.ts`
- [x] T007 Verify build passes with existing chapters — run `npm run build` in `my-website/` to confirm the validation plugin works with current 42 chapters and produces zero errors (SC-002, SC-009)

**Checkpoint**: Build-time validation is operational. All subsequent content changes will be automatically validated.

---

## Phase 3: User Story 1 — Create Chapter from Template (Priority: P1)

**Goal**: Provide a single chapter template file covering 4 content type variants (Tutorial, Concept, Hands-on Lab, Reference) with complete inline guidance and placeholder instructions.

**Independent Test**: Copy template to `my-website/docs/`, fill in frontmatter and minimal content, run `npm run build` — must pass with zero errors.

### Implementation for User Story 1

- [x] T008 [US1] Create the single chapter template file at `my-website/templates/chapter-template.md` — include YAML frontmatter block with all 7 required fields as placeholders conforming to `contracts/frontmatter-schema.json` (FR-001, FR-003)
- [x] T009 [US1] Add content type variant guidance to `my-website/templates/chapter-template.md` — add HTML comments marking which sections are required/optional/emphasized for each of the 4 content types: Tutorial, Concept, Hands-on Lab, Reference (FR-001, FR-002). Follow the variant matrix from `contracts/content-type-variants.md`
- [x] T010 [US1] Add Time Badge section to `my-website/templates/chapter-template.md` — bold inline `**Estimated Time**: X minutes` with HTML comment explaining it must match `estimated_time` frontmatter. Place after frontmatter, before Learning Objectives (contracts/template-structure.md section 2)
- [x] T011 [US1] Add Learning Objectives section to `my-website/templates/chapter-template.md` — `:::info[What You'll Learn]` admonition with placeholder bullet items and HTML comment explaining 2-6 objectives mirroring frontmatter `learning_objectives` (FR-005, contracts/template-structure.md section 3)
- [x] T012 [US1] Add Prerequisites section to `my-website/templates/chapter-template.md` — `:::note[Prerequisites]` admonition with placeholder linked chapter references and HTML comment for "no prerequisites" edge case (FR-006, contracts/template-structure.md section 4)
- [x] T013 [US1] Add Main Content area to `my-website/templates/chapter-template.md` — H2/H3 placeholder sections with variant-specific HTML comments explaining Tutorial (step-by-step), Concept (explanation+diagram), Hands-on Lab (objective+exercise), Reference (command+params) patterns (FR-002, FR-004)
- [x] T014 [US1] Add Key Takeaways section to `my-website/templates/chapter-template.md` — `:::tip[Key Takeaways]` admonition with 3-7 placeholder bullet points and HTML comment explaining single-sentence-per-concept rule (FR-008, contracts/template-structure.md section 6)
- [x] T015 [US1] Add Next Steps section to `my-website/templates/chapter-template.md` — H2 section with placeholder markdown links using relative paths and HTML comment about 1-3 links, cross-module linking for final chapters (FR-015, contracts/template-structure.md section 7)
- [x] T016 [US1] Add admonition examples to `my-website/templates/chapter-template.md` — include at least one admonition example per content type variant section demonstrating proper usage: `:::tip` for Tutorial, `:::info` for Concept, `:::danger` for Lab, `:::note` for Reference (FR-014)
- [x] T017 [US1] Add code block examples to `my-website/templates/chapter-template.md` — include example code blocks with `title`, `showLineNumbers`, and `// highlight-next-line` demonstrating the standards from `contracts/code-block-standards.md`. List available Prism languages: python, bash, yaml, cpp, json, markup (FR-009, FR-010, FR-011, FR-012)
- [x] T018 [US1] Validate template — copy `my-website/templates/chapter-template.md` to a temporary location under `my-website/docs/`, fill all frontmatter placeholders with valid sample data, run `npm run build` to confirm zero errors. Remove temporary file after validation (SC-001, SC-002, SC-003, SC-007)

**Checkpoint**: Chapter template is complete, covers all 4 variants, includes all 7 mandatory sections, and passes build validation.

---

## Phase 4: User Story 2 — Display Learning Components (Priority: P1)

**Goal**: The learning components (objectives, prerequisites, time badge) are already embedded as native MDX patterns in the template. This phase validates they render correctly and documents the patterns.

**Independent Test**: Open a chapter using the template patterns in browser, verify learning objectives appear as blue `:::info` admonition, prerequisites as gray `:::note` admonition, and time badge as bold text.

**Note**: US2 is satisfied by the MDX patterns created in US1 (DD-1, DD-5). This phase focuses on validation and documenting the patterns for independent reference.

### Implementation for User Story 2

- [x] T019 [US2] Verify learning objectives rendering — create a test chapter in `my-website/docs/` using the template, fill `learning_objectives` frontmatter and `:::info[What You'll Learn]` section, run `npm run build` and confirm rendered output shows styled blue admonition (FR-005, SC-009)
- [x] T020 [US2] Verify prerequisites rendering with linked references — in the test chapter, fill `prerequisites` frontmatter and `:::note[Prerequisites]` section with relative links to existing chapters (e.g., `[Installation](../module-1/installation.md)`), verify links resolve on build (FR-006, SC-008)
- [x] T021 [US2] Verify time badge rendering — confirm `**Estimated Time**: 45 minutes` renders as bold text at top of content (FR-007)
- [x] T022 [US2] Verify no-prerequisites edge case — create/modify test chapter with empty `prerequisites` array, confirm `:::note[Prerequisites]` displays "No prerequisites — you can start here." without errors (Edge Case from spec)
- [x] T023 [US2] Remove test chapter — clean up any temporary test files from `my-website/docs/` after validation

**Checkpoint**: All learning component patterns render correctly in Docusaurus. Build passes.

---

## Phase 5: User Story 6 — Key Takeaways (Priority: P2)

**Goal**: Key Takeaways section pattern is already embedded in the template. Validate rendering and demonstrate in a real chapter.

**Independent Test**: Open a chapter with Key Takeaways section, verify `:::tip[Key Takeaways]` renders as green admonition with bullet points.

### Implementation for User Story 6

- [x] T024 [US6] Verify Key Takeaways rendering — confirm `:::tip[Key Takeaways]` renders as green admonition with lightbulb icon and 3-7 bullet points in a test build (FR-008, SC-003)

**Checkpoint**: Key Takeaways pattern verified.

---

## Phase 6: User Story 3 — Standardized Code Examples (Priority: P2)

**Goal**: Document code block standards with before/after examples so authors apply consistent formatting.

**Independent Test**: Open the style guide, verify code block standards section has clear rules with before/after examples.

### Implementation for User Story 3

- [x] T025 [P] [US3] Write code block standards section in `my-website/docs-guides/style-guide.md` — document all 4 rules from `contracts/code-block-standards.md`: language identifier (always), title attribute (always), showLineNumbers (>5 lines), line highlighting (pedagogically important). Include before/after examples (FR-009, FR-010, FR-011, SC-005)
- [x] T026 [P] [US3] Write available Prism languages section in `my-website/docs-guides/style-guide.md` — list all 6 configured languages (python, bash, yaml, cpp, json, markup) with descriptions of when to use each (FR-012)
- [x] T027 [US3] Add output block guidance to `my-website/docs-guides/style-guide.md` — document how to show command output using `text` language and `title="Output"` pattern from `contracts/code-block-standards.md` Rule 5

**Checkpoint**: Code block standards documented with actionable examples.

---

## Phase 7: User Story 4 — Pedagogical Callouts (Priority: P2)

**Goal**: Document admonition usage criteria so authors consistently use the right callout type.

**Independent Test**: Open the style guide, verify admonition section covers all 5 types with usage criteria, examples, and "do NOT use for" guidance.

### Implementation for User Story 4

- [x] T028 [P] [US4] Write admonition usage section in `my-website/docs-guides/style-guide.md` — document all 5 types (note, tip, info, warning, danger) with: usage criteria, example, "do NOT use for" guidance, custom title syntax. Follow `contracts/admonition-standards.md` (FR-013, SC-004)
- [x] T029 [P] [US4] Write admonition frequency guidelines in `my-website/docs-guides/style-guide.md` — document expected density per content type: Tutorial 2-4, Concept 1-3, Lab 3-5, Reference 1-2 (from `contracts/admonition-standards.md`)
- [x] T030 [US4] Write admonition nesting rules in `my-website/docs-guides/style-guide.md` — document: can nest in `<details>`, can contain code blocks, can contain Mermaid, should NOT nest inside other admonitions, require empty lines in Tabs

**Checkpoint**: Admonition standards documented with clear decision criteria.

---

## Phase 8: User Story 5 — Chapter Navigation (Priority: P3)

**Goal**: Ensure template and style guide document Next Steps section patterns for consistent end-of-chapter navigation.

**Independent Test**: Open a chapter with Next Steps, verify links to next chapters render correctly.

### Implementation for User Story 5

- [x] T031 [US5] Write navigation section in `my-website/docs-guides/style-guide.md` — document Next Steps pattern: 1-3 links, relative paths only, module-ending chapters link to next module overview (FR-015, FR-016)
- [x] T032 [US5] Write internal linking rules in `my-website/docs-guides/style-guide.md` — document relative path patterns: `./chapter.md` (same directory), `../module/chapter.md` (different directory), never use absolute URLs for internal content (SC-008)

**Checkpoint**: Navigation patterns documented.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Complete remaining deliverables — style guide foundation, reference implementation, migration guide, and final validation.

### Style Guide Foundation

- [x] T033 Write heading hierarchy section in `my-website/docs-guides/style-guide.md` — document H1 (auto from title, never manual), H2 (main sections), H3 (subsections), H4 (max depth). No heading level skipping allowed (FR-017)
- [x] T034 Write Mermaid diagram guidelines in `my-website/docs-guides/style-guide.md` — document syntax basics, theme configuration (`neutral`/`dark`), diagram types used (flowchart, sequence, graph), accessibility notes (FR-017)
- [x] T035 Write MDX escaping rules in `my-website/docs-guides/style-guide.md` — document: `<` → `&lt;` and `>` → `&gt;` in tables, `{` → `&#123;` outside code blocks, explain MDX JSX parsing and why escaping is required. Include before/after examples (FR-017, Edge Case from spec)
- [x] T036 Add style guide frontmatter and introduction to `my-website/docs-guides/style-guide.md` — add document title, purpose statement, table of contents, and relationship to chapter template

### Reference Implementation

- [x] T037 Update existing chapter `my-website/docs/module-1/core-concepts.md` as reference implementation — apply full template structure: add `:::info[What You'll Learn]` section from existing `learning_objectives` frontmatter, add `:::note[Prerequisites]` section from existing `prerequisites` frontmatter, add `**Estimated Time**` badge, add `:::tip[Key Takeaways]` section with 3-7 points, update Next Steps section with proper relative links (SC-006)
- [x] T038 Add code block standards to reference implementation `my-website/docs/module-1/core-concepts.md` — add `title` attributes to all code blocks, add `showLineNumbers` to blocks >5 lines, add `// highlight-next-line` comments to pedagogically important lines (FR-009, FR-010, FR-011)
- [x] T039 Add admonitions to reference implementation `my-website/docs/module-1/core-concepts.md` — add at least one `:::tip` and one `:::warning` admonition demonstrating proper usage for a Concept-type chapter
- [x] T040 Validate reference implementation — run `npm run build` to confirm zero errors with updated chapter. Verify all internal links resolve (SC-002, SC-008)

### Migration Guide

- [x] T041 [P] Create migration guide at `my-website/docs-guides/migration-guide.md` — write step-by-step instructions for updating existing chapters to the new template structure. Include: (1) checklist of changes per chapter, (2) frontmatter verification steps, (3) mandatory section addition order, (4) code block update checklist, (5) admonition addition guidance, (6) build validation command (SC-010)
- [x] T042 [P] Add common migration issues section to `my-website/docs-guides/migration-guide.md` — document: MDX escaping pitfalls, missing frontmatter fields, heading hierarchy fixes, code block formatting, link path conversions

### Final Validation

- [x] T043 Run full build validation — execute `npm run build` in `my-website/` to confirm zero errors across all files including template, reference implementation, and validation plugin (SC-002, SC-009)
- [x] T044 Verify all success criteria — confirm SC-001 through SC-010 are met: template covers 4 variants (SC-001), build passes (SC-002), 6 mandatory sections (SC-003), admonition guide (SC-004), code block guide (SC-005), reference implementation (SC-006), frontmatter validates (SC-007), relative paths (SC-008), MDX renders (SC-009), migration guide exists (SC-010)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all content phases
- **Phase 3 (US1 - Template)**: Depends on Phase 2 — BLOCKS US2, US6 (they validate patterns from US1)
- **Phase 4 (US2 - Learning Components)**: Depends on Phase 3
- **Phase 5 (US6 - Key Takeaways)**: Depends on Phase 3, can run in PARALLEL with Phase 4
- **Phase 6 (US3 - Code Standards)**: Depends on Phase 2, can run in PARALLEL with Phases 3-5
- **Phase 7 (US4 - Callouts)**: Depends on Phase 2, can run in PARALLEL with Phases 3-6
- **Phase 8 (US5 - Navigation)**: Depends on Phase 2, can run in PARALLEL with Phases 3-7
- **Phase 9 (Polish)**: Depends on all user story phases — reference implementation needs template + style guide complete

### User Story Dependencies

```
Phase 1 (Setup) → Phase 2 (Foundational/Plugin)
                       │
                       ├─→ Phase 3 (US1: Template) ─→ Phase 4 (US2: Learning Components)
                       │                            ─→ Phase 5 (US6: Key Takeaways)
                       │
                       ├─→ Phase 6 (US3: Code Standards)   ← parallel with US1
                       ├─→ Phase 7 (US4: Callouts)         ← parallel with US1
                       └─→ Phase 8 (US5: Navigation)       ← parallel with US1

All Phases ─→ Phase 9 (Polish: Style Guide Foundation + Reference Implementation + Migration Guide)
```

### Parallel Opportunities

Within phases:
- **Phase 1**: T001, T002, T003 can run in parallel (different directories)
- **Phase 6**: T025, T026 can run in parallel (different sections of same file — marked [P])
- **Phase 7**: T028, T029 can run in parallel (different sections of same file — marked [P])
- **Phase 9**: T041, T042 can run in parallel with T033-T036 (different files)

Cross-phase parallelism (after Phase 2 completes):
- US1 (template) + US3 (code standards guide) + US4 (callouts guide) + US5 (navigation guide) can all proceed simultaneously
- US2 and US6 must wait for US1

---

## Parallel Example: After Phase 2

```text
# These can run in parallel once foundational phase completes:
Stream A: T008-T018 (US1 — Chapter template)
Stream B: T025-T027 (US3 — Code block standards in style guide)
Stream C: T028-T030 (US4 — Admonition standards in style guide)
Stream D: T031-T032 (US5 — Navigation in style guide)

# After Stream A completes:
Stream E: T019-T023 (US2 — Learning component validation)
Stream F: T024 (US6 — Key Takeaways validation)
```

---

## Implementation Strategy

### MVP First (Phases 1-3: Setup + Plugin + Template)

1. Complete Phase 1: Setup (create directories, install ajv)
2. Complete Phase 2: Foundational (build validation plugin, register, verify)
3. Complete Phase 3: User Story 1 (complete chapter template)
4. **STOP and VALIDATE**: Copy template, fill content, `npm run build` passes
5. Authors can already start using the template at this point

### Incremental Delivery

1. Setup + Foundational + US1 → **Template usable** (MVP)
2. Add US2 validation + US6 validation → **Learning components verified**
3. Add US3 + US4 + US5 to style guide → **Complete authoring standards**
4. Polish: Reference implementation + Migration guide → **Full feature complete**

### Single Developer Strategy (Sequential)

1. Phases 1-2: Setup + Plugin (~30 min)
2. Phase 3: Template (~60 min)
3. Phases 4-5: Validation (~20 min)
4. Phases 6-8: Style guide sections (~45 min)
5. Phase 9: Polish + reference + migration (~60 min)

---

## Summary

| Metric | Count |
|--------|-------|
| **Total tasks** | 44 |
| **Setup tasks** | 4 (Phase 1) |
| **Foundational tasks** | 3 (Phase 2) |
| **US1 (Template) tasks** | 11 (Phase 3) |
| **US2 (Learning Components) tasks** | 5 (Phase 4) |
| **US6 (Key Takeaways) tasks** | 1 (Phase 5) |
| **US3 (Code Standards) tasks** | 3 (Phase 6) |
| **US4 (Callouts) tasks** | 3 (Phase 7) |
| **US5 (Navigation) tasks** | 2 (Phase 8) |
| **Polish tasks** | 12 (Phase 9) |
| **Parallel opportunities** | 8 tasks marked [P], plus 4 cross-phase parallel streams |
| **MVP scope** | Phases 1-3 (18 tasks) |

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each phase or logical group
- Stop at any checkpoint to validate independently
- `npm run build` is the universal validation — run after every phase
- No custom React components — all patterns use native Docusaurus MDX features (DD-1)
