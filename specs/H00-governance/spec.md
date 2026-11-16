# H00 — Specification (proposed)

## Outcome
Introduce executable, reviewable SDD/HITL documentation without discarding original product scope, 37 legacy task IDs, verified S0 work, decisions or UI visual reference.

## Inputs
`docs/BACKLOG.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/PRODUCT_SPEC.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/S0_REPORT.md`, `.agents/roles/spec-reviewer.md`, `.agents/roles/architecture-reviewer.md`, `.agents/roles/ui-reviewer.md`, `.agents/roles/qa-reviewer.md`, `AGENTS.md`, current source tree, and `docs/ui-reference.png`.

## Acceptance
1. Each original S0-01..10, S1-01..06, S2-01..06, S3-01..07, S4-01..08 maps to one or more milestones with no deletions.
2. All 10 S0 acceptance A0-01..10 remain gates to declaring S0 complete.
3. Verified vs merely implemented vs pending S0 activities are accurately distinguished using report and repository evidence.
4. Six referenced visual panels map to deliverables. `/resources` and `/settings` stay in scope despite not appearing as dedicated panels.
5. Remote deployment remains unapproved; stack and security invariants preserved.
6. HITL approval required before new work, each task and remote operations.
7. No source code, Docker, dependency installs, network deployments or business features modified during H00.

## Out of scope
Implementation, UI recreation, fixing Docker, refactoring application code, changing the stack or approving S1.
