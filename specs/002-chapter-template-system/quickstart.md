# Quickstart: Chapter Template System

**Feature**: 002-chapter-template-system
**Date**: 2026-02-09

---

## Create a New Chapter in 5 Steps

### Step 1: Copy the Template

```bash
cp my-website/templates/chapter-template.md my-website/docs/<module>/<chapter-name>.md
```

Use kebab-case for filenames (e.g., `voice-to-action.md`).

### Step 2: Choose Your Content Type

Open the copied file. Decide which content type your chapter is:

| Type | Use When |
|------|----------|
| **Tutorial** | Teaching step-by-step how to build/do something |
| **Concept** | Explaining theory, architecture, or "how it works" |
| **Hands-on Lab** | Providing a guided exercise with specific goals |
| **Reference** | Documenting APIs, commands, or configuration |

Read the HTML comments in the template — they tell you which sections to emphasize or skip for your content type.

### Step 3: Fill the Frontmatter

Replace all placeholder values:

```yaml
---
sidebar_position: 3
title: "Your Chapter Title Here"
sidebar_label: "Short Label"
description: "50-300 character SEO description of this chapter."
keywords: [keyword1, keyword2, keyword3]
estimated_time: "45 minutes"
learning_objectives:
  - "First learning objective (10-200 chars)"
  - "Second learning objective"
prerequisites:
  - "previous-chapter-id"
---
```

All 7 fields are required. See `contracts/frontmatter-schema.json` for full validation rules.

### Step 4: Write Your Content

Follow the mandatory section order:

1. **Time Badge**: `**Estimated Time**: 45 minutes`
2. **Learning Objectives**: `:::info[What You'll Learn]` with 2-6 bullets
3. **Prerequisites**: `:::note[Prerequisites]` with linked chapter references
4. **Main Content**: H2/H3 sections following your content type pattern
5. **Key Takeaways**: `:::tip[Key Takeaways]` with 3-7 summary bullets
6. **Next Steps**: Links to 1-3 related chapters

### Step 5: Validate

```bash
cd my-website && npm run build
```

The build will:
- Validate frontmatter against the JSON Schema
- Check all internal links resolve
- Verify MDX compiles without errors

Fix any errors and re-run until the build passes with zero errors.

---

## Quick Reference

### Code Block Format
````markdown
```python title="my_script.py" showLineNumbers
# highlight-next-line
important_code_here()
```
````

### Admonition Quick Guide
```markdown
:::note        → Background context (gray)
:::tip         → Best practice / shortcut (green)
:::info        → Learning objectives / context blocks (blue)
:::warning     → Common mistake / gotcha (yellow)
:::danger      → Safety risk / data loss (red)
```

### MDX Escaping
| Character | Escape To | When |
|-----------|----------|------|
| `<` | `&lt;` | In tables, inline text (not code blocks) |
| `>` | `&gt;` | In tables |
| `{` | `&#123;` | Outside code blocks when not JSX |
| `}` | `&#125;` | Outside code blocks when not JSX |

---

## Common Mistakes

1. **Missing frontmatter field** → Build fails with schema validation error. Check all 7 required fields.
2. **H1 heading in content** → Docusaurus auto-generates H1 from `title`. Start content with H2.
3. **Absolute links** → Use `./chapter.md` or `../module/chapter.md`, never full URLs for internal links.
4. **Unescaped `<` in tables** → MDX interprets as JSX. Use `&lt;` instead.
5. **Code block without title** → Add `title="filename.ext"` or `title="Description"` to every code block.
