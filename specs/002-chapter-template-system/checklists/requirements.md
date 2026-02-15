# Requirements Checklist: Chapter Template System

**Purpose**: Track implementation completeness of all functional requirements and success criteria for the Chapter Template System feature.
**Created**: 2026-02-05
**Updated**: 2026-02-09 (post-implementation)
**Feature**: [spec.md](../spec.md)

## Template Structure (FR-001 to FR-004)

- [x] CHK001 Single chapter template file created with inline comments covering all 4 content type variants (Tutorial, Concept, Hands-on Lab, Reference)
- [x] CHK002 Template includes mandatory section order: Frontmatter → Learning Objectives → Prerequisites → Main Content → Key Takeaways → Next Steps
- [x] CHK003 Inline comments explain which sections are required/optional/emphasized per content type
- [x] CHK004 Template frontmatter validates against `contracts/frontmatter-schema.json`
- [x] CHK005 Template includes HTML comment placeholders with author instructions

## MDX Components (FR-005 to FR-008)

- [x] CHK006 Learning objectives render as styled list with "What You'll Learn" heading
- [x] CHK007 Prerequisites render as linked references to other chapters
- [x] CHK008 Estimated time renders as visual badge
- [x] CHK009 Key Takeaways section pattern defined with 3-7 bullet point guidance
- [x] CHK010 Components handle missing/empty frontmatter gracefully (no errors)

## Code Block Standards (FR-009 to FR-012)

- [x] CHK011 Template code blocks use `title` attribute (e.g., `title="talker_node.py"`)
- [x] CHK012 Code blocks >5 lines include `showLineNumbers`
- [x] CHK013 Template demonstrates line highlighting syntax (`// highlight-next-line`, `// highlight-start/end`)
- [x] CHK014 Available Prism languages documented (Python, Bash, YAML, C++, JSON, markup)

## Docusaurus Admonitions (FR-013 to FR-014)

- [x] CHK015 Style guide defines `:::note` usage criteria (supplementary info)
- [x] CHK016 Style guide defines `:::tip` usage criteria (best practice / shortcut)
- [x] CHK017 Style guide defines `:::info` usage criteria (background context)
- [x] CHK018 Style guide defines `:::warning` usage criteria (common mistake / gotcha)
- [x] CHK019 Style guide defines `:::danger` usage criteria (data loss / safety risk)
- [x] CHK020 Template includes at least one admonition example per content type variant
- [ ] CHK021 Exercise block hints use attempt-based reveal (client-side tracking) — *Deferred: out of scope per spec (interactive exercises are out of scope)*

## Navigation & Validation (FR-015 to FR-016)

- [x] CHK022 Template includes "Next Steps" section at bottom
- [x] CHK023 All internal links use Docusaurus-compatible relative paths
- [x] CHK024 Cross-module links resolve correctly (`../module-N/filename.md`)
- [x] CHK025 Metadata validation runs during `npm run build`
- [x] CHK026 Build fails with clear error messages on invalid/missing required metadata

## Style Guide (FR-017)

- [x] CHK027 Heading hierarchy defined (H1=title, H2=main, H3=sub, H4=max depth)
- [x] CHK028 Admonition usage rules documented with examples
- [x] CHK029 Code block standards documented with before/after examples
- [x] CHK030 Mermaid diagram guidelines included
- [x] CHK031 MDX escaping rules documented (`<` → `&lt;`, `{` → `&#123;`)

## Success Criteria Verification

- [x] CHK032 SC-001: Single template file covers all 4 content type variants with complete inline guidance
- [x] CHK033 SC-002: New chapter from template passes `npm run build` with zero errors (includes metadata validation)
- [x] CHK034 SC-003: All 6 mandatory sections present in template
- [x] CHK035 SC-004: Style guide covers all 5 admonition types
- [x] CHK036 SC-005: Code block standards with before/after examples in style guide
- [x] CHK037 SC-006: At least 1 existing chapter updated as reference implementation
- [x] CHK038 SC-007: Template frontmatter validates against JSON Schema
- [x] CHK039 SC-008: All internal links resolve correctly
- [x] CHK040 SC-009: MDX patterns render correctly; zero build failures from invalid metadata
- [x] CHK041 SC-010: Migration guide with step-by-step instructions exists

## Notes

- Check items off as completed: `[x]`
- CHK021 (Exercise block hints) deferred — interactive exercises are explicitly out of scope per spec
- Validation plugin runs in non-strict mode during migration; set `strict: true` after all chapters migrated
- **Clarification applied**: Single template file (not 4 separate), attempt-based hints, build-time validation
