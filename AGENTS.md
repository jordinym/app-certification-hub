# Certification Hub — Operating instructions for Codex (SDD / HITL v3)

## Mission and non-negotiables
Personal, private-by-default, single-user, provider-agnostic Certification Hub. Keep the approved stack: Next.js App Router, strict TypeScript, Tailwind, Zod, OpenNext Cloudflare Workers, D1, Drizzle, Wrangler, Docker Compose (local), Vitest and Playwright. No alternative stack without explicit user approval. Local and remote D1 must remain separated. Protect server mutations, secrets, user data, and exam answer keys; no unreviewed published questions. Do not invent official exam data.

## Canonical sources and precedence
`docs/README.md` is the canonical documentation index; its “Fuentes por responsabilidad” and “Precedencia cuando existe conflicto” govern source selection:
1. Explicit user approvals, security and scope limits.
2. Original requirement baseline and architecture decisions: `docs/PRODUCT_SPEC.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/COMPATIBILITY.md`, `docs/BACKLOG.md` and `docs/IMPLEMENTATION_PLAN.md`.
3. The milestone's explicitly accepted spec/design in `specs/<milestone>/`.
4. Derived tasks, plans, roadmap and traceability; preserve original IDs and acceptance conditions. These do not replace the baseline or grant execution permission.
5. `docs/ui-reference.png`: appearance only, never official data, fictitious statistics or an alternative stack.

`docs/sdd/ACTIVE_MILESTONE.md` plus explicit human authorization determine executable scope. `docs/sdd/EXECUTION_POLICY.md` is the canonical execution/gate policy; `docs/sdd/MILESTONE_ROADMAP.md` defines proposed sequencing and mandatory platform work. A proposal is not approval. On conflicting sources at the same level, STOP and request a HITL decision; do not silently reconcile them.

## Reading budget and entrypoint
At start read this file, `docs/README.md`, `docs/sdd/ACTIVE_MILESTONE.md`, `docs/sdd/EXECUTION_POLICY.md`, the active milestone's `spec.md`, `design.md`, `tasks.md` and `verification.md` if present, and `git status --short`. Consult only sections relevant to the request and active task; do not recursively read the repository or every milestone.
Read further sources only for an identified dependency, citing file and section. Use `docs/DOCKER_DEV.md` and `docs/DEPLOYMENT.md` only for relevant authorized operations. Preserve baseline content and historical `docs/S0_REPORT.md` evidence; never rewrite history. Do not read legacy `docs/agents/ROLES.md` or old version directories. If a mandatory baseline is missing, STOP without deleting anything.

## Active permissions and hard HITL gates
Apply the exact gates in `docs/sdd/EXECUTION_POLICY.md`, section “Gates”:
- **G0**: human approval of reconciliation and milestone roadmap after the H00 report.
- **G1**: explicit approval of each milestone's spec/design, including scope, UI and data/security decisions.
- **G2**: separate authorization of exactly one bounded task, with its exact ID and `tasks.md` checkbox. A checkbox alone is not human authorization.
- **G3**: human acceptance of actual verification evidence and UI screenshot when relevant. Authorization of the next task or milestone is separate.
- **GR**: explicit authorization for remote deployment, Access, migrations or costs, even after sprint/milestone approval.

Execute only one authorized task per execution. Never advance autonomously to another task or milestone, self-approve evidence, or infer permission from a general “continue”, a historical S0/sprint approval, documentation acceptance or existing code. Determine allowed files and commands before acting. Explicitly scoped user instructions govern that request; they do not implicitly change the active milestone, accept gates or authorize unrelated work.

While the active milestone is H00 **AUDIT / ONLY READ**, implementation authorization is **NONE**: local inspection and a read-only report only. No file edits, code changes, Docker, npm, installs, tests, builds, data mutations or deploy under H00 authorization. Do not start H00 automatically from this entrypoint. When explicitly requested, use `prompts/H00_READONLY_RECONCILE.md` within active permissions and stop after the report for G0. A separately authorized entrypoint correction does not execute or approve H00.

## Execution budget and anti-loop
Follow `docs/sdd/EXECUTION_POLICY.md`, sections “Anti-loop stop rules” and “Evidence format”:
- At most **2 repair attempts for the same root cause**; then record blocker, evidence and alternatives and STOP. If a command fails twice, do not retry with cosmetic variations or pivot automatically to infrastructure changes.
- No unbounded loops, continuous watchers, interactive commands, background jobs, reinstall loops or automatic next-task execution. No full-suite retries without a changed hypothesis; run relevant narrow checks first when authorized.
- Before each command record its purpose and expected output; use bounded process timeout where supported. If unsupported, avoid commands prone to hanging and report the limitation. Markdown does not enforce wall-clock limits.
- CI or Docker build: once only when explicitly part of the authorized task; one diagnostic retry only if justified. No broad dependency upgrades, silent downgrades or provider switches.
- Never run `docker compose down -v`, broad delete/reset, destructive migration, remote CLI, deploy or create paid resources without specific authorization; apply GR as required.
- Preserve existing uncommitted changes. One lead write agent; optional bounded, read-only specialist review only for a precise risk and when permitted by the request. No swarm.

## Architecture / sequencing guardrails
`docs/sdd/MILESTONE_ROADMAP.md`, section “Platform track (must not disappear)”, remains mandatory:
- **P0**: Worker/D1 runtime foundation, S0-01..03/05/07; require actual runtime write/read evidence and protection gates for integrated CRUD/exams/deployment.
- **P1**: reproducible local Docker, S0-04/08/09/10 and A0-01..10; mandatory for S0 closure. Docker and D1 are not deferred to remote release.
Report unfinished P0/P1 tasks as pending. Do not declare S0 closed or CRUD complete before acceptance conditions are met. H01 presentation-only work may precede full Docker reproducibility only with a usable UI environment and explicit HITL authorization; H01 is not S1 completion. UI fixtures must be clearly labeled local layout data, never fake persistent metrics. Infrastructure blockers never waive Worker/D1, authentication, migration or security gates; separately authorize any nonblocking UI work.

## Delivery and stop
Return active milestone/task and objective; original IDs; changed files; environment and actual commands/results with PASS/FAIL/NOT RUN; UI evidence when applicable; security impact; blockers/unresolved issues; cost/loop observations if available; and the next proposed decision. Update only explicitly allowed tracking files. Never fabricate completion or treat code presence as tested behavior; use `implemented-unverified` until supported by evidence. Only a human can accept the result.
End every execution with **STOP — awaiting HITL approval**. Do not start the next task.
