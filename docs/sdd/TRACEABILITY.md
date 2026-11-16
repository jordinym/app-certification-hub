# Original task traceability — PROPOSED EXECUTION MAPPING

**Do not treat this file as approval.** Every source ID is kept, with scope and full acceptance definitions still owned by original `docs/IMPLEMENTATION_PLAN.md`. Current S0 status is a snapshot from `docs/S0_REPORT.md` on 2026-11-15, not a live verification.

| Legacy ID | Original work (short label) | Type | Proposed milestone | Acceptance/evidence focus |
|---|---|---|---|---|
| S0-01 | toolchain/package lock | PLATFORM | P0 | npm/versions installation evidence |
| S0-02 | Next/OpenNext/Wrangler scaffold | PLATFORM | P0 | Worker build; scaffold exists but runtime not verified |
| S0-03 | Worker → Drizzle → D1 read/write spike | PLATFORM | P0 | real Worker D1 read/write pending |
| S0-04 | Dockerfile/Compose/bootstrap | INFRA-LOCAL | P1 | fresh Compose start pending |
| S0-05 | base schema + constraints | DATA | P0 | migration generated; runtime constraints pending |
| S0-06 | idempotent seed | DATA | P0 | implemented; runtime execution pending |
| S0-07 | auth boundary and local health | SECURITY | P0 | implemented; denial tests pending |
| S0-08 | scripts + local backup/restore | INFRA-LOCAL | P1 | scripts implemented; run pending |
| S0-09 | integrated start/persistence/navigation tests | QA-LOCAL | P1 | pending |
| S0-10 | docs and S0 closure report | DOC | P1 | initial report present; cannot close |
| S1-01 | AppShell/navigation/tokens | UI | H01 | desktop/mobile accessibility |
| S1-02 | catalog search/filter | UI+FEATURE | H02 | real D1 search/filter |
| S1-03 | create/edit provider and cert | FEATURE | H02 | provider-agnostic CRUD |
| S1-04 | versions/domains detail | FEATURE | H02 | coherent metadata |
| S1-05 | archive + duplicate errors | FEATURE | H02 | history preserved |
| S1-06 | catalog repos/auth/forms/E2E | QA | H02 | persist/reload flows |
| S2-01 | timezone/date-only contract | FEATURE | H03 | date correctness |
| S2-02 | 28-week editable plans | FEATURE | H03 | user-editable |
| S2-03 | tasks/status/minutes | FEATURE | H03 | accurate persistence |
| S2-04 | resources/provenance | FEATURE | H03 | validated resource links |
| S2-05 | plans + dashboard | UI+FEATURE | H03/H04 | real derived metrics |
| S2-06 | dates/aggregates/mobile tests | QA | H03/H04 | timezone and persistence |
| S3-01 | reviewed question contracts | FEATURE | H05 | original reviewed only |
| S3-02 | selection/empty state | FEATURE | H05 | no invalid attempts |
| S3-03 | attempt start/snapshots | FEATURE | H05 | historical integrity |
| S3-04 | answers/navigation/submit | FEATURE | H05 | no key leakage |
| S3-05 | server grading/idempotency | FEATURE | H05 | concurrent safe |
| S3-06 | result review/domain summary | UI+FEATURE | H06 | only post-submit |
| S3-07 | security/concurrency/E2E | QA | H05/H06 | no keys in pre-submit payload |
| S4-01 | private read/write audit | SECURITY | H07 | deny by default |
| S4-02 | Access JWT and identity | SECURITY | H07 | verify sig/issuer/audience |
| S4-03 | Access/bindings runbook | RELEASE | H07 | protected previews/hostnames |
| S4-04 | remote config/cost assessment | RELEASE | H07 | no assumed free tier |
| S4-05 | backup/restoration/migrations | RELEASE | H07 | restoration proof |
| S4-06 | mobile/a11y/end-to-end audit | QA | H07 | journey testing |
| S4-07 | create/migrate/seed/deploy | RELEASE | H08 | explicit remote authorization |
| S4-08 | remote verification/runbook | RELEASE | H08 | real remote evidence |

## Preserved S0 acceptance gates (original IDs A0-01..A0-10)

| ID | Required evidence (summary) |
|---|---|
| A0-01 | `npm ci` in clean container, reproducible lockfile |
| A0-02 | `docker compose up --build` clean state and reachable app |
| A0-03 | Worker request read/write via D1 binding and Drizzle |
| A0-04 | migrate/seed twice without duplicate/loss |
| A0-05 | persisted record survives Compose down/up without `-v` |
| A0-06 | invalid inserts/inconsistent foreign relations rejected |
| A0-07 | unauthorized mutation and unconfigured remote denied |
| A0-08 | typecheck, lint, tests in Docker actually executed |
| A0-09 | export/restore in isolated DB state preserves relations |
| A0-10 | client artifacts contain no secrets/private state |

## Source snapshot caveats
- `S0_REPORT.md` says base scaffold, 12 tables, seed, protection, integration/E2E scripts implemented, and initial **9 unit tests** passed; Docker complete build, Worker/D1, migration, persistence and E2E remain pending. No claim that S0 complete.
- `ui-reference.png` depicts six mock screens; reference footer's illustrative tech stack and metrics are NOT approved technical requirements. Written architecture overrides mock content.
- Proposed H01 UI-only sequencing deviates from original S1 entry requirement (S0 closed). It MUST be separately approved as a limited, presentation-only exception; it does not waive S0's entry gate for real persisted features or close S1.
