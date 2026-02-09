# Data Model: Chapter Template System

**Feature**: 002-chapter-template-system
**Date**: 2026-02-09
**Status**: Complete

---

## Entities

### 1. ChapterFrontmatter

The machine-readable metadata block at the top of every chapter file. Validated against JSON Schema at build time.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `sidebar_position` | integer | Yes | min: 1 | Sidebar navigation order |
| `title` | string | Yes | 5-100 chars | Full page title |
| `sidebar_label` | string | Yes | 3-40 chars | Sidebar display label |
| `description` | string | Yes | 50-300 chars | SEO meta description |
| `keywords` | string[] | Yes | 3-10 items, unique, 2-30 chars each | Search keywords |
| `estimated_time` | string | Yes | Pattern: `^[0-9]+ (minutes?|hours?)$` | Completion time estimate |
| `learning_objectives` | string[] | Yes | 2-6 items, 10-200 chars each | Student outcomes |
| `prerequisites` | string[] | No | Pattern per item: `^[a-z0-9-]+$`, unique | Chapter IDs for prereqs |
| `slug` | string | No | Pattern: `^/[a-z0-9/-]+$` | Custom URL path |
| `tags` | string[] | No | — | Filtering tags |
| `hide_table_of_contents` | boolean | No | default: false | Hide right-side TOC |
| `draft` | boolean | No | default: false | Exclude from production |

**Source of truth**: `specs/001-book-master-plan/contracts/frontmatter-schema.json`

---

### 2. ChapterTemplate

The single template file with inline variant guidance. Not a runtime entity — it's a development artifact that authors copy.

| Component | Description | Required for All Variants |
|-----------|-------------|--------------------------|
| Frontmatter block | YAML between `---` delimiters | Yes |
| Time badge | Bold inline text: `**Estimated Time**: X minutes` | Yes |
| Learning Objectives section | `:::info[What You'll Learn]` admonition with bullet list | Yes |
| Prerequisites section | `:::note[Prerequisites]` admonition with linked chapter list | Yes |
| Main Content area | H2/H3 sections with variant-specific guidance comments | Yes |
| Key Takeaways section | `:::tip[Key Takeaways]` admonition with 3-7 bullet points | Yes |
| Next Steps section | H2 section with 1-3 markdown links to next chapters | Yes |

---

### 3. ContentType (Enum)

Convention-based classification affecting which template sections are emphasized or optional.

| Value | Slug | Primary Focus | Code Density | Diagram Density |
|-------|------|---------------|-------------|-----------------|
| Tutorial | `tutorial` | Step-by-step instruction | High (runnable examples) | Medium |
| Concept | `concept` | Theoretical explanation | Low (illustrative only) | High |
| Hands-on Lab | `lab` | Guided exercise with goals | High (exercise code) | Low |
| Reference | `reference` | API/command documentation | High (complete snippets) | Low |

**Not enforced at build time** — conveyed through template comments and author choice (DD-3).

---

### 4. AdmonitionType (Enum)

Standard Docusaurus admonition types with project-specific pedagogical mapping.

| Type | Color | Icon | Usage |
|------|-------|------|-------|
| `note` | Gray/blue | i | Supplementary info, background context |
| `tip` | Green | Lightbulb | Best practices, shortcuts, efficiency tips |
| `info` | Blue | Circle-i | Learning objectives, prerequisites, context blocks |
| `warning` | Yellow | Exclamation | Common mistakes, version gotchas, deprecated patterns |
| `danger` | Red | Flame | Safety risks, data loss, hardware damage warnings |

---

### 5. CodeBlockStandard

Standards for code block usage across the textbook.

| Attribute | Syntax | When Required |
|-----------|--------|---------------|
| Language | ` ```python ` | Always — every code block |
| Title | `title="filename.py"` | Always — file name or purpose description |
| Line numbers | `showLineNumbers` | Code blocks > 5 lines in Python, Bash, C++, YAML |
| Line highlighting | `// highlight-next-line` or `{1,4-6}` | When specific lines are pedagogically important |

**Available languages**: python, bash, yaml, cpp, json, markup (configured in Prism)

---

### 6. StyleGuide

Reference document entity defining all authoring standards.

| Section | Content |
|---------|---------|
| Heading Hierarchy | H1 = title (auto from frontmatter), H2 = main sections, H3 = subsections, H4 = max depth |
| Admonition Usage | Per-type criteria table with examples |
| Code Block Standards | Title, line numbers, highlighting rules with before/after |
| Mermaid Diagrams | Syntax, theme integration, accessibility guidelines |
| MDX Escaping | `<` → `&lt;`, `{` → `&#123;`, rules for tables and inline code |
| Navigation | Relative paths, Next Steps format, cross-module linking |

---

## Relationships

```
ChapterFrontmatter  1──1  ChapterTemplate    (every template includes a frontmatter block)
ChapterTemplate     1──1  ContentType        (each template copy targets one content type)
ChapterTemplate     *──*  AdmonitionType     (chapters use multiple admonition types)
ChapterTemplate     *──*  CodeBlockStandard  (chapters contain multiple code blocks)
StyleGuide          1──*  AdmonitionType     (style guide defines all admonition rules)
StyleGuide          1──*  CodeBlockStandard  (style guide defines all code block rules)
```

---

## State Transitions

### Chapter Lifecycle (authoring workflow)

```
[Template] → Copy → [Draft] → Fill Content → [Review] → Build Passes → [Published]
                      ↑                          |
                      └── Fix Issues ─────────────┘
```

1. **Template**: Raw template file with placeholder comments
2. **Draft**: Author has copied and started filling content (`draft: true` in frontmatter)
3. **Review**: Content complete, submitted for accuracy and style review
4. **Published**: Build passes, all quality gates met (`draft: false` or removed)

---

## Validation Rules

| Rule | Scope | Enforcement |
|------|-------|-------------|
| Frontmatter conforms to JSON Schema | All chapters | Build-time (Docusaurus plugin) |
| All 6 mandatory sections present | Template copies | Author self-check + review |
| Heading hierarchy H1 → H2 → H3 (no skips) | All chapters | Author self-check + review |
| Code blocks have language + title | All code blocks | Author self-check + review |
| Internal links use relative paths | All links | Build-time (`onBrokenLinks: 'throw'`) |
| No unresolved HTML comment placeholders | Published chapters | Review gate |
