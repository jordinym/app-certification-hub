# Milestone roadmap — G0 APPROVED (HITL-G0-001, 2026-11-16)

This plan reorganizes execution only. G0 approves the documentary reconciliation; milestone G1/G2, the H01 presentation-only exception, G3 and GR are not granted. F05 and F07–F14 remain OPEN. Original S0–S4 remain the approved historical scope; original IDs/acceptance criteria must all remain covered. No automatic S1 approval follows from accepting documentation.

| Milestone | Type | Observable output | Original tasks | Prerequisites / gate |
|---|---|---|---|---|
| H00 Governance/reconcile | DOC | All 37 task IDs traced; approved SDD protocol | all | G0 human |
| H01 AppShell/navigation | UI | Responsive shell, accessible nav, design tokens, consistent empty states | S1-01 | usable UI environment demonstrated; explicit presentation-only HITL exception if S0 remains open; new G1/G2; **not S1 completion** (F03/F04) |
| H02 Catalog | FEATURE/UI | searchable catalog, filters, create/edit, version/domain, archive | S1-02..06 | H01 + S0 closed and accepted: P0+P1, A0-01..A0-10, Worker/D1 + auth + migrations; separate S1 scope and H02 G1/G2 approval (F03) |
| H03 Study plan/resources | FEATURE/UI | personal 28-week editable plan, tasks, resources, timezone | S2-01..04 and parts S2-05/06 | H02 + validated DB |
| H04 Dashboard | FEATURE/UI | real persisted metrics, upcoming tasks and filters | S2-05/06 | H03 + metric definitions |
| H05 Exam engine | FEATURE/UI | approved questions, simulations, snapshots, submit/grade | S3-01..05/07 | reviewed original content, security and DB |
| H06 Results | FEATURE/UI | scores/explanations/domain summary (post-submit) | S3-06/07 | H05 |
| H07 Release readiness | QA/RELEASE | access, recovery, mobile E2E, remote plan | S4-01..06 | H02–H06 tested |
| H08 Authorized deployment | RELEASE | protected Workers+D1 remote and verification | S4-07..08 | GR explicit authorization |

## Platform track (must not disappear)
- **P0 runtime minimal blocker**: S0-01..03/05/07. Initial scaffold/schema exist; executed Worker/D1 write/read evidence remains pending.
- **P1 reproducible Docker**: S0-04/08/09/10 and acceptance A0-01..10. Mandatory for S0 closure, but not a blocker for H01 presentation-only work if a usable UI development environment already exists.
- Report each incomplete P0/P1 task as pending. **Do not declare S0 closed** or CRUD done until acceptance met. Docker and D1 are not deferred to remote release; only nonblocking UI can run ahead with HITL approval.

## Entry gate clarification (F03/F04)
Only H01 presentation-only work may precede S0 closure with an explicit HITL exception and a demonstrated usable UI environment. H02 integrated work requires accepted S0 closure through P0+P1 and all A0 criteria. P1 cannot be deferred to H07 or remote release as a way to start H02. Current UI runtime availability is NOT VERIFIED; see `specs/H01-app-shell/design.md` for observed coupling and a proposed separation, not implementation authorization.

## UI reference mapping
`docs/ui-reference.png` has six illustrative panels: (1) dashboard → H04, (2) catalog → H02, (3) new certification → H02, (4) study plan → H03, (5) practice exam → H05, (6) results → H06. H01 establishes visual shell across panels. Sidebar, cards, progress bars, density, typography, mobile adaptation are visual references; depicted scores/providers/technology text are mock data and MUST NOT be imported as requirements. Other spec routes `/resources` and `/settings` remain in scope even when absent from the mockup.

## Manual checkpoints
H00 -> approve reconciled map; H01 -> compare screenshot to reference; H02 -> verify true D1 CRUD; H03/H04 -> real persistence/metrics; H05/H06 -> content and answer-key security; H07/H08 -> remote authorizations.
