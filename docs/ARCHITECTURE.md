# Architecture — Certification Hub MVP (ADR-001 to ADR-005)

## ADR-001 — Provider-agnostic modular monolith
One Next.js application on Cloudflare Workers. Modules: `catalog`, `planning`, `assessment`, `analytics`, `settings`; shared validation and database access. UI cannot access database adapters directly.

## ADR-002 — Cloudflare runtime and D1
- Next.js App Router + OpenNext Cloudflare adapter compatible with selected versions.
- Cloudflare Workers executes server code; Cloudflare D1 is persistent managed SQL (SQLite dialect).
- Drizzle ORM with D1 driver; versioned SQL migrations via Wrangler or Drizzle migration generation with Wrangler execution, choosing one documented source of truth.
- Binding example name: `DB`; configure Wrangler for local and remote environments.
- Local Wrangler D1 is separate from production D1. Never confuse local and remote migrations/seeds.
- GitHub is source control, not an application server or database.
- Avoid unsupported Node.js modules and local filesystem persistence at runtime.
- Verify adapter and binding access in an S0 proof-of-concept before implementing domain modules.

## ADR-003 — Relational domain
Tables (names illustrative, final Drizzle schema must define keys, checks and indexes):
- `providers(id, slug UNIQUE, name)`
- `certifications(id, provider_id FK, code, title, level NULL, status, UNIQUE(provider_id, code))`
- `exam_versions(id, certification_id FK, label, effective_from NULL, retired_at NULL, official_url NULL, verified_at NULL, status)`
- `exam_domains(id, exam_version_id FK, title, weight_min NULL, weight_max NULL, sort_order)`
- `learning_resources(id, certification_id NULL, exam_version_id NULL, domain_id NULL, title, url, kind, verified_at NULL)`
- `study_plans(id, certification_id FK, exam_version_id NULL, name, start_date, end_date, timezone, status)`
- `study_tasks(id, study_plan_id FK, exam_domain_id NULL, title, due_date, estimated_minutes NULL, actual_minutes NULL, status, resource_id NULL, notes NULL)`
- `questions(id, exam_version_id FK, domain_id FK, stem, question_type, review_status, source_url NULL, verified_at NULL)`
- `question_options(id, question_id FK, body, is_correct, sort_order)`
- `exam_attempts(id, exam_version_id FK, mode, status, started_at, submitted_at NULL, correct_count NULL, graded_count NULL)`
- `attempt_questions(id, attempt_id FK, question_id NULL, ordinal, question_snapshot_json, answer_key_snapshot_json)`
- `attempt_answers(id, attempt_question_id FK, selected_options_json, is_correct NULL, answered_at NULL)`
- `credential_records(id, certification_id FK, obtained_at NULL, expires_at NULL, evidence_url NULL)` (can defer).

Use ISO date-only strings for study dates, UTC timestamps for events, explicit timezone in plans, JSON TEXT with Zod validation for snapshots; store boolean values as SQLite-compatible integers. Enforce FKs, uniqueness and required indexes. Protect historical attempts from destructive deletes.

## ADR-004 — Server-side exam grading
Only reviewed/published questions are eligible. On attempt start, snapshot question content and correct answers **server-side**. Client receives sanitized options only. Validate selections, ensure same exam version/domain, compute score on server, prevent double submission and ensure atomic updates where D1 batch/transaction capabilities allow. Percentage is a practice metric, never represented as Microsoft's official scaled score.

## ADR-005 — Deployment and access
- Private-first Cloudflare Worker. Configure Cloudflare Access or equivalent before publishing personal write endpoints.
- Validate authentication/authorization server-side for every mutation. If using Cloudflare Access, validate trusted identity/JWT at the Worker rather than relying solely on hidden UI or headers that can be spoofed.
- No secrets in source. Separate Wrangler local config and remote bindings.
- Provide D1 backup/export/restore procedures and environment-specific safeguards.
- Free-tier eligibility and quotas must be checked at deployment time; never promise permanent zero cost.

## Out of scope
AI generation, automatic Microsoft/GitHub imports, SaaS users/teams, payment, Redis, Kafka, AKS, queues, cron jobs.

## ADR-006 — Reproducible local runtime
Local development is Docker Compose (one Node/Next.js/OpenNext/Wrangler container) plus a named volume for Wrangler D1 local state. No separate D1 database server. The local Worker preview must be validated against the D1 binding; `next dev` alone is not sufficient evidence. See `docs/DOCKER_DEV.md`. Production deploys to Cloudflare Workers + remote D1 without Docker. Pin and record tested versions in `docs/COMPATIBILITY.md`.


## S0 implementation notes

- Twelve base tables are defined in `src/server/db/schema.ts`; `credential_records` remains deferred. Drizzle generates SQL into `drizzle/`; Wrangler is the only migration executor. Do not edit applied migrations or use `drizzle-kit push`.
- Resources have exactly one scope (certification, version or domain). Ancestors are derived through joins; this avoids conflicting associations.
- Tasks carry a nullable `exam_version_id` when linked to a domain. Composite foreign keys enforce that the plan and domain share that version. Attempt snapshots similarly carry the version for cross-version integrity.
- JSON columns have SQL validity checks and versioned Zod contracts. Publication rules, snapshot freezing and grading are S3 services, not delivered by schema alone.
- All deletes affecting referenced history use RESTRICT. No history deletion endpoints exist in S0.
- The root Wrangler configuration is local-only. It disables workers.dev/preview URLs and uses a clearly local database identifier. No remote UUID or production config exists yet.
- The local diagnostic API is protected by a generated bearer token and same-origin checks. This is not production authentication; remote scripts fail closed until explicit setup and approval.
- `src/server/db/client.ts` owns D1 binding access. Routes and presentational components do not query DB bindings directly.
