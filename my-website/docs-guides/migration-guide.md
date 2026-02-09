# Chapter Migration Guide

**Purpose**: Step-by-step instructions for updating existing chapters to the new template structure. This guide covers the 42 existing chapters that predate the Chapter Template System.

**Reference implementation**: See `docs/module-1/core-concepts.md` for a complete example of a migrated chapter.

---

## Migration Checklist (Per Chapter)

For each chapter, complete these steps in order:

### 1. Frontmatter Verification

- [ ] All 7 required fields present: `sidebar_position`, `title`, `sidebar_label`, `description`, `keywords`, `estimated_time`, `learning_objectives`
- [ ] `estimated_time` matches pattern: `"N minutes"` or `"N hours"` (e.g., `"45 minutes"`)
- [ ] `learning_objectives` has 2-6 items, each 10-200 characters
- [ ] `description` is 50-300 characters
- [ ] `keywords` has 3-10 unique items
- [ ] `prerequisites` values use kebab-case (e.g., `installation`, not `Installation` or `ros2-installation`)

### 2. Remove Manual H1 Heading

- [ ] Delete any `# Title` line — Docusaurus auto-generates H1 from `title` frontmatter

### 3. Add Time Badge

- [ ] Add `**Estimated Time**: X minutes` immediately after frontmatter
- [ ] Value must match `estimated_time` in frontmatter

### 4. Add Learning Objectives Section

- [ ] Add `:::info[What You'll Learn]` admonition after the time badge
- [ ] Include 2-6 bullet points mirroring `learning_objectives` frontmatter

### 5. Add Prerequisites Section

- [ ] Add `:::note[Prerequisites]` admonition after learning objectives
- [ ] Link each prerequisite to its chapter using relative paths
- [ ] If no prerequisites: use "No prerequisites — you can start here."

### 6. Add Key Takeaways Section

- [ ] Add `:::tip[Key Takeaways]` admonition before the Next Steps section
- [ ] Include 3-7 bullet points, each a single sentence summarizing one concept

### 7. Update Next Steps Section

- [ ] Ensure a `## Next Steps` section exists at the end
- [ ] Include 1-3 links using relative paths
- [ ] Add brief descriptions for each link

### 8. Update Code Blocks

- [ ] Add `title="filename.ext"` to every code block
- [ ] Add `showLineNumbers` to blocks exceeding 5 lines (Python, Bash, C++, YAML)
- [ ] Add `# highlight-next-line` comments to pedagogically important lines
- [ ] Verify language identifier is present (python, bash, yaml, cpp, json, markup)

### 9. Add Admonitions

- [ ] Add appropriate admonitions based on content type:
  - Tutorial: `:::tip` (shortcuts) + `:::warning` (gotchas)
  - Concept: `:::info` (context) + `:::note` (supplementary)
  - Lab: `:::danger` (safety) + `:::warning` (errors)
  - Reference: `:::note` (version notes) + `:::warning` (deprecations)

### 10. Validate

- [ ] Run `npm run build` — must pass with zero errors
- [ ] Check the validation plugin output for this specific file

---

## Migration Order

Migrate chapters in this recommended order:

1. **Module 1 content pages** (already have most frontmatter fields)
2. **Module 2-4 content pages**
3. **Introduction content pages**
4. **Hardware guide content pages**
5. **Appendices content pages**
6. **Index/overview pages** (these often need `estimated_time` and `learning_objectives` added)
7. **intro.md** (homepage — needs `sidebar_position` fix and missing fields)

---

## Common Migration Issues

### MDX Escaping Pitfalls

**Problem**: Build fails with "Unexpected token" or JSX parsing error.

**Cause**: Raw `<`, `>`, `{`, or `}` characters in markdown text (especially tables).

**Fix**:
```markdown
<!-- WRONG -->
| Operator | Description |
|----------|-------------|
| < | Less than |

<!-- RIGHT -->
| Operator | Description |
|----------|-------------|
| &lt; | Less than |
```

Characters to escape outside code blocks:
- `<` → `&lt;`
- `>` → `&gt;`
- `{` → `&#123;`
- `}` → `&#125;`

### Missing Frontmatter Fields

**Problem**: Validation plugin warns about missing `estimated_time` or `learning_objectives`.

**Fix**: Add the missing fields to frontmatter:
```yaml
---
# ... existing fields ...
estimated_time: "30 minutes"  # Estimate reading + hands-on time
learning_objectives:
  - "First objective the student will achieve"
  - "Second objective"
---
```

**Guidelines for estimating time**:
- Short concept page: `"15 minutes"`
- Tutorial with code: `"30 minutes"` to `"45 minutes"`
- Hands-on lab: `"45 minutes"` to `"2 hours"`
- Reference page: `"15 minutes"` to `"30 minutes"`

### Heading Hierarchy Fixes

**Problem**: Heading levels are skipped (e.g., H2 directly to H4).

**Fix**: Ensure proper nesting: H2 → H3 → H4 (never skip levels).

```markdown
<!-- WRONG -->
## Main Section
#### Deep Subsection

<!-- RIGHT -->
## Main Section
### Subsection
#### Deep Subsection (only if truly needed)
```

### Code Block Formatting

**Problem**: Code blocks missing language, title, or line numbers.

**Fix template**:
````markdown
<!-- Before -->
```
some code here
```

<!-- After -->
```python title="descriptive_name.py" showLineNumbers
some code here
```
````

### Link Path Conversions

**Problem**: Absolute URLs or paths used for internal links.

**Fix**:
```markdown
<!-- WRONG -->
[Link](https://site.com/docs/module-1/installation)
[Link](/docs/module-1/installation)

<!-- RIGHT (same directory) -->
[Link](./installation.md)

<!-- RIGHT (different directory) -->
[Link](../module-1/installation.md)
```

### Prerequisites Pattern Mismatch

**Problem**: Validation error: `prerequisites/0: must match pattern "^[a-z0-9-]+$"`.

**Cause**: Prerequisites contain spaces, uppercase letters, or special characters.

**Fix**: Use kebab-case chapter IDs only:
```yaml
# WRONG
prerequisites: ["ROS 2 Installation", "core concepts"]

# RIGHT
prerequisites: ["installation", "core-concepts"]
```

---

## Build Validation

After migrating each chapter (or batch of chapters), run:

```bash
cd my-website && npm run build
```

Check the output for:
- `[validate-frontmatter] Warnings` — files still needing migration
- `[validate-frontmatter] ERRORS` — files with schema violations
- `[SUCCESS]` — build passed

The goal is to reduce warnings to zero as migration progresses. Once all chapters are migrated, set `strict: true` in `docusaurus.config.ts` to enforce validation.
