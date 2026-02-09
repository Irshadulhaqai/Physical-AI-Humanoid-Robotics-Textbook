# Research: Chapter Template System

**Feature**: 002-chapter-template-system
**Date**: 2026-02-09
**Status**: Complete

---

## Research Questions

### RQ-1: How does Docusaurus 3.x handle frontmatter in MDX files?

**Decision**: Docusaurus 3.x parses YAML frontmatter between `---` delimiters at the top of `.md`/`.mdx` files. Frontmatter fields are available as page metadata, used for sidebar ordering (`sidebar_position`), page titles, descriptions, and custom fields. Custom fields beyond Docusaurus-known fields are accessible via the `useDocumentData` hook or `docusaurus.config.ts` but do not render automatically.

**Rationale**: The existing frontmatter schema (`contracts/frontmatter-schema.json`) defines 7 required fields and 4 optional fields. Docusaurus natively processes `sidebar_position`, `title`, `sidebar_label`, `description`, `keywords`, `slug`, `tags`, `hide_table_of_contents`, and `draft`. Custom fields like `estimated_time`, `learning_objectives`, and `prerequisites` are stored but require explicit rendering in MDX content body.

**Alternatives considered**:
- MDX exports (`export const metadata = {...}`) — more complex, less discoverable for non-developers
- Docusaurus plugin for custom frontmatter — overengineered for template-based approach

---

### RQ-2: What is the best approach for rendering learning objectives, prerequisites, and time badges from frontmatter without custom React components?

**Decision**: Use inline MDX patterns that manually render frontmatter data. Since the spec explicitly chose "native MDX patterns over custom React components" (DD-1), the template will include structured markdown sections (admonitions, lists, badges) that authors fill in manually — mirroring the frontmatter data visually but not programmatically derived from it.

**Rationale**: Custom React components that auto-render from frontmatter require: (1) swizzling or creating theme components, (2) importing in every file, (3) JSX knowledge. Manual markdown sections achieve the same visual result with zero configuration. The frontmatter remains the machine-readable source of truth; the rendered sections are the human-readable presentation.

**Pattern**:
```mdx
<!-- Learning Objectives rendered as admonition -->
:::info[What You'll Learn]
- Objective 1 from frontmatter learning_objectives
- Objective 2
:::

<!-- Prerequisites rendered as note -->
:::note[Prerequisites]
Before starting this chapter, complete:
- [Chapter Name](./chapter-link.md)
:::

<!-- Time badge as bold inline -->
**Estimated Time**: 45 minutes
```

**Alternatives considered**:
- Custom `<LearningObjectives />` React component — violates DD-1 (native MDX patterns preferred)
- Docusaurus theme swizzling to inject frontmatter rendering — too complex for ~50 chapters
- MDX `{frontMatter.learning_objectives.map(...)}` — requires JSX in content, fragile

---

### RQ-3: How do Docusaurus code block enhancements work (title, showLineNumbers, highlighting)?

**Decision**: Use Docusaurus native code block metastring syntax for all code enhancements.

**Rationale**: Docusaurus 3.x (current: 3.9.2) supports these metastring options on fenced code blocks:
- `title="filename.py"` — renders a header bar with the filename
- `showLineNumbers` — adds line numbers to the left margin
- `{1,4-6,11}` — highlights specific line numbers
- `// highlight-next-line` comment — highlights the following line
- `// highlight-start` / `// highlight-end` — highlights a range of lines

The project already configures Prism with languages: Python, Bash, YAML, C++, JSON, markup. Magic comments work with `#` (Python/Bash), `//` (C++/JSON), and `<!-- -->` (markup).

**Alternatives considered**:
- Custom code block component with props — unnecessary given native metastring support
- Rehype/remark plugins for auto-line-numbers — adds build complexity

---

### RQ-4: What Docusaurus admonition types are available and how should they map to pedagogical use?

**Decision**: Use all 5 built-in Docusaurus admonition types with pedagogically-defined usage criteria.

**Mapping**:
| Admonition | Docusaurus Rendering | Pedagogical Use |
|------------|---------------------|-----------------|
| `:::note` | Gray/blue, info icon | Supplementary info, background context |
| `:::tip` | Green, lightbulb | Best practices, shortcuts, efficiency tips |
| `:::info` | Blue, info circle | Learning objectives, prerequisites, context |
| `:::warning` | Yellow, exclamation | Common mistakes, gotchas, version differences |
| `:::danger` | Red, flame/exclamation | Safety risks, data loss, hardware damage (`HARDWARE`) |

**Rationale**: Docusaurus renders these with distinct colors and icons. Constitution Principle 3 (Consistency & Standards) already mandates these exact labels. Constitution Principle 5 (Code Example Quality) requires safety warnings marked with `HARDWARE` — mapping to `:::danger`.

**Alternatives considered**:
- Custom admonition types via `@theme/Admonition` swizzling — not needed, 5 types are sufficient
- MDX `<Admonition>` component syntax — works but less readable than `:::` syntax

---

### RQ-5: What is the best approach for build-time frontmatter validation?

**Decision**: Create a Docusaurus plugin that validates frontmatter against the existing JSON Schema during the build process. Use the `ajv` JSON Schema validator library.

**Rationale**: The spec (FR-016) requires that metadata validation runs during `npm run build` and fails with clear error messages. Docusaurus has a plugin system with lifecycle hooks (`contentLoaded`, `postBuild`). A `docusaurus-plugin-frontmatter-validator` plugin can:
1. Load all docs during `loadContent`
2. Validate each doc's frontmatter against `contracts/frontmatter-schema.json`
3. Report errors with file paths and specific field violations
4. Fail the build if validation errors exist

**Implementation approach**:
```typescript
// my-website/plugins/validate-frontmatter.ts
import Ajv from 'ajv';
import type { LoadContext, Plugin } from '@docusaurus/types';

export default function validateFrontmatter(context: LoadContext): Plugin {
  return {
    name: 'validate-frontmatter',
    async contentLoaded({ content, actions }) {
      // Validate each doc against schema
    },
  };
}
```

**Alternatives considered**:
- Pre-build script (separate `npm run validate`) — spec says validation on `npm run build`, not separate step
- Remark plugin — runs per-file but harder to fail the build with clear aggregate errors
- CI-only validation — spec explicitly says build-time, not CI-only

---

### RQ-6: How should content type variants be structured within a single template file?

**Decision**: Use HTML comments as content type markers within a single `.md` template file. Each section has comments indicating which content types require/emphasize that section.

**Rationale**: The spec (FR-001, FR-002, DD-3) mandates a single template file with inline comments. The 4 content types share the same mandatory section order but differ in emphasis and optional sections:

| Section | Tutorial | Concept | Hands-on Lab | Reference |
|---------|----------|---------|-------------|-----------|
| Frontmatter | Required | Required | Required | Required |
| Learning Objectives | Required | Required | Required | Required |
| Prerequisites | Required (specific) | Required (general) | Required (specific) | Optional |
| Main Content | Step-by-step | Explanatory | Guided exercise | API/command docs |
| Code Examples | Extensive | Illustrative | Exercise-focused | Complete references |
| Diagrams | Supporting | Central | Minimal | Structural |
| Key Takeaways | Required | Required | Required | Required |
| Next Steps | Required | Required | Required | Optional |

**Pattern**:
```markdown
<!-- CONTENT TYPE: Tutorial — Step-by-step guided instruction -->
<!-- CONTENT TYPE: Concept — Theoretical explanation with diagrams -->
<!-- CONTENT TYPE: Hands-on Lab — Guided exercise with objectives -->
<!-- CONTENT TYPE: Reference — API/command documentation -->
```

**Alternatives considered**:
- 4 separate template files — rejected per DD-2 and clarification session
- Docusaurus tabs wrapping variant sections — confusing for authors copying a template
- MDX conditional rendering — over-engineered for a copy-and-fill workflow
