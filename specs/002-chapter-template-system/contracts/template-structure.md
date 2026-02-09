# Contract: Chapter Template Structure

**Feature**: 002-chapter-template-system
**Date**: 2026-02-09

---

## Mandatory Section Order

Every chapter file MUST contain these sections in this exact order:

```
1. Frontmatter (YAML between --- delimiters)
2. Time Badge (bold inline text)
3. Learning Objectives (:::info admonition)
4. Prerequisites (:::note admonition)
5. Main Content (H2/H3 sections — variant-specific)
6. Key Takeaways (:::tip admonition)
7. Next Steps (H2 section with links)
```

## Section Contracts

### 1. Frontmatter

```yaml
---
sidebar_position: <integer, min 1>
title: "<string, 5-100 chars>"
sidebar_label: "<string, 3-40 chars>"
description: "<string, 50-300 chars>"
keywords: [<3-10 unique strings, 2-30 chars each>]
estimated_time: "<N minutes|hours>"
learning_objectives:
  - "<string, 10-200 chars>"   # min 2, max 6
prerequisites:                  # optional
  - "<kebab-case chapter ID>"
---
```

**Validated by**: `contracts/frontmatter-schema.json` via build-time plugin

### 2. Time Badge

```markdown
**Estimated Time**: 45 minutes
```

- MUST match `estimated_time` frontmatter value
- Renders as bold text near page top

### 3. Learning Objectives

```markdown
:::info[What You'll Learn]
- Objective 1 (matches frontmatter learning_objectives)
- Objective 2
- Objective 3
:::
```

- 2-6 bullet points
- MUST mirror `learning_objectives` frontmatter values
- Uses `:::info` admonition (blue)

### 4. Prerequisites

```markdown
:::note[Prerequisites]
Before starting this chapter, complete:
- [Chapter Title](./relative-path.md)
:::
```

- Links MUST use relative Docusaurus paths
- If no prerequisites: display "No prerequisites — you can start here."
- Uses `:::note` admonition (gray/blue)

### 5. Main Content

- H2 sections for major topics
- H3 subsections within H2
- H4 maximum nesting depth
- Never use H1 (auto-generated from `title` frontmatter)
- Content type determines emphasis (see content-type-variants.md)

### 6. Key Takeaways

```markdown
:::tip[Key Takeaways]
- Takeaway 1 — single sentence summarizing one concept
- Takeaway 2
- Takeaway 3
:::
```

- 3-7 bullet points
- Each point: one sentence, one concept
- Uses `:::tip` admonition (green)

### 7. Next Steps

```markdown
## Next Steps

Continue your learning journey:
- [Next Chapter Title](./next-chapter.md) — brief description
- [Related Chapter](../module/chapter.md) — brief description
```

- 1-3 linked chapters
- Relative Docusaurus paths only
- Module-ending chapters link to next module overview
