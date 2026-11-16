# Certification Hub — Operating instructions for Codex (SDD / HITL v3)

## Mission and non-negotiables
Personal, private-by-default, single-user, provider-agnostic Certification Hub. Keep the approved stack: Next.js App Router, strict TypeScript, Tailwind, Zod, OpenNext Cloudflare Workers, D1, Drizzle, Wrangler, Docker Compose (local), Vitest and Playwright. No alternative stack without explicit user approval. Local and remote D1 must remain separated. Protect server mutations, secrets, user data, and exam answer keys; no unreviewed published questions. Do not invent official exam data.

## Sources and reading budget
At start read only: this file, `docs/sdd/ACTIVE_MILESTONE.md`, the ACTIVE milestone's `spec.md`, `design.md`, `tasks.md`, and `verification.md` if they exist, and `git status --short`. Read other source documents only for an identified dependency, quoting file and section. Authoritative requirements remain `docs/PRODUCT_SPEC.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/BACKLOG.md`, `docs/IMPLEMENTATION_PLAN.md`; original task IDs and acceptance conditions must be preserved. `docs/ui-reference.png` is visual reference only; do not import fictitious statistics or its illustrative stack.

## Hard HITL gates
- **PLAN**: describe milestone, mapping to legacy IDs, prerequisites, exclusions, acceptance criteria, risks and proposed tasks. STOP until user explicitly approves the spec/design.
- **BUILD**: after separate explicit approval, implement **one checked/authorized task** only. Do not continue automatically to the next task or milestone.
- **VERIFY**: record actual command, environment, result, screenshot/visual review when applicable, and open issues. STOP for user acceptance; no self-approval.
- Do not treat an old sprint approval as authorization to change scope, deploy, run destructive commands or perform a different milestone. H00 is documentation-only. Previous S0 execution authorization stays on record, but H00 explicitly restricts this session to planning.

## Execution budget and anti-loop
- At most **2 attempted repairs of the same root cause**; stop with blocker and alternatives afterward.
- No unbounded loops, continuous watchers, interactive commands, background jobs or automatic next-task execution.
- Before running a command record the purpose and expected output; use bounded process timeout where tooling supports it. If unsupported, avoid commands prone to hanging and report the limitation.
- No repeated full-suite, Docker rebuild, dependency reinstall, or broad dependency upgrades as default; run relevant narrow checks first.
- If a command fails twice, do not retry with cosmetic variations. Summarize evidence and ask for decision.
- Never run `docker compose down -v`, broad delete/reset, destructive migration, remote CLI, deploy, or create paid resources without specific authorization.
- Do not fabricate completion or mark code presence as tested behavior. Use `implemented-unverified` when appropriate.
- One lead write agent; optional specialist review only when it will resolve a precise risk, bounded and read-only. Do not launch a swarm.

## Delivery contract
Each execution returns: active milestone/task, objective; changed files; actual tests with PASS/FAIL/NOT RUN; blockers; mapping to original IDs; cost/loop observations if available; next proposed action; and **STOP — awaiting HITL approval**. Update only allowed tracking files, without silently rewriting historical `S0_REPORT.md` evidence.

## Architecture / sequencing guardrails
Do not reinterpret H01 UI as completion of S1. UI can use explicitly labeled local fixtures for layout validation, not fake persistent metrics. Worker/D1 compatibility and protections are hard gates for any integrated CRUD, exams, or deployment. Docker reproducibility remains an accepted project requirement even if non-blocking UI work proceeds first.

## Fuente única activa tras migración v3
`docs/README.md` es el índice canónico. No leer `docs/agents/ROLES.md` heredado ni carpetas de versiones antiguas. Conservar el contenido exacto de los documentos baseline importados desde el checkout; el instalador construye una sola estructura. Si falta un baseline obligatorio, STOP, sin borrar nada.
