# MVP backlog — Cloudflare D1

Detailed execution plan: [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md). It defines task IDs, dependencies, acceptance tests and approval gates for S0–S4. The plan is approved; S0 is in progress. See [S0_REPORT.md](S0_REPORT.md) for actual verification results.

| Sprint | Vertical slice | Exit gate |
|---|---|---|
| **S0** | Compatibility spike; Next.js + OpenNext Cloudflare + Wrangler + D1 binding; Drizzle schema, migrations and idempotent seeds | Local Worker reads/writes local D1; five Azure certifications + GitHub provider seeded; lint/typecheck/unit tests; documented commands |
| **S1** | Provider and certification catalog, add/edit provider/certification/version/domain | New non-Microsoft certification without code change; unique constraints and validation; responsive UI |
| **S2** | Study plan, task tracking, dashboard and resource links | 28-week editable plan; task status/hours persist in D1; correct date-only handling |
| **S3** | Reviewed question bank, exam attempt, server grading, result analytics | No answer-key leakage; attempt snapshot; idempotent submission; E2E test |
| **S4** | Deployment hardening, protected access, D1 backup/export, accessibility, release checklist | Unauthorized request denied; remote migrations controlled; tests pass; deployed only after approval |

## Scope control
- One lead agent. No agent swarm, plugin framework, AI question generation, payments, multiuser roles, event-driven architecture or background sync.
- Initial practice question set is original and reviewed; do not generate unverifiable official facts.
- Hosting and data storage must remain separated from GitHub source code.

## S0 compatibility gate
If selected Next.js/OpenNext adapter cannot reliably access D1 in the Cloudflare runtime, pause and present a minimal alternate architecture (e.g. React/Vite + Worker API + D1) for explicit approval. Do not silently substitute technologies.

## Definition of done
Documented and reproducible setup; migration/seed success; validation/tests; source-backed exam metadata; privacy/access controls for public deployment; ability to add provider-agnostic certifications.

## S0 additional acceptance — Docker
- Validate exact compatible runtime versions and record them in `docs/COMPATIBILITY.md`.
- Make `docker compose up --build` work after scaffolding, exposing the app on localhost:3000 or a documented alternative.
- Run local D1 migrations/seeds in Docker and prove persistence across `docker compose down` / `up` (without `-v`).
- Verify D1 binding from Worker-compatible runtime, not only Next.js dev server.
- Ensure `npm ci`, lint, typecheck and tests run in container; document observed results.
