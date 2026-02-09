---
id: 2
title: Clarify Chapter Template Spec
stage: spec
date: 2026-02-05
surface: agent
model: claude-opus-4-5-20251101
feature: 002-chapter-template-system
branch: 002-chapter-template-system
user: irshad
command: sp.clarify
labels: ["clarification", "templates", "exercise-hints", "validation", "single-template"]
links:
  spec: specs/002-chapter-template-system/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-chapter-template-system/spec.md
  - specs/002-chapter-template-system/checklists/requirements.md
tests:
  - Spec validation (PASS - no unresolved placeholders, no contradictions)
---

## Prompt

/sp.clarify 002-chapter-template-system

User requested clarification workflow after spec completion. Ambiguity scan across 10 taxonomy categories found 7/10 Clear, 3/10 Partial. Three questions asked (of 5 max):

Q1: Exercise Block Hints Behavior (Interaction & UX Flow) — User chose D: Attempt-based reveal
Q2: Content Type Variant Template Structure (Constraints & Tradeoffs) — User accepted recommendation: Single template with conditional comments
Q3: Metadata Validation Timing (Completion Signals) — User accepted recommendation: On build

## Response snapshot

Conducted structured ambiguity scan and resolved 3 critical implementation decisions:

1. **Exercise hints**: Attempt-based reveal — hints unlock after submit attempt (requires client-side tracking, no server persistence)
2. **Template structure**: Single file with inline HTML comments for all 4 content types (not 4 separate files)
3. **Metadata validation**: Runs during `npm run build`; build fails with clear errors on invalid metadata

Updated spec sections: FR-001, FR-002, FR-014, FR-016, SC-001, SC-002, SC-009, Assumptions, In Scope, Key Entities. Added Clarifications section with Session 2026-02-05. Updated requirements checklist (41 items, renumbered).

## Outcome

- ✅ Impact: Resolved 3 ambiguities that would have caused rework during planning/implementation
- 🧪 Tests: Spec validation PASS (no placeholders, no contradictions, all 9 check points verified)
- 📁 Files: 2 files updated (spec.md, checklists/requirements.md)
- 🔁 Next prompts: /sp.plan 002-chapter-template-system
- 🧠 Reflection: Single-template decision simplifies implementation (1 file vs 4). Attempt-based hints add client-side complexity but improve pedagogy. Build-time validation is the right tradeoff for a static site.

## Evaluation notes (flywheel)

- Failure modes observed: None — all 3 answers integrated without contradictions
- Graders run and results (PASS/FAIL): Spec validation PASS (all 9 checks)
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Proceed to /sp.plan with clarified spec
