# AGENTS.md — Certification Hub MVP

Read in this order: `README.md`, `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`, `docs/UI_SPEC.md`, `docs/BACKLOG.md`, `docs/agents/ROLES.md`. View `docs/ui-reference.png` for visual direction only. Written specifications override example mockup data.

## Mission and identity
Build **Certification Hub**, GitHub repo **`app-certification-hub`**, a private-by-default, single-user, provider-agnostic study tracker and original practice-exam application. Seed Microsoft AZ-900, AI-901, AI-200, AZ-104, AZ-305 and an empty GitHub provider.

## Hard architecture constraints
- Next.js App Router + strict TypeScript + Tailwind + Zod.
- **Cloudflare Workers + D1 + Drizzle ORM**; use the current compatible OpenNext Cloudflare adapter.
- Wrangler manages local development, D1 migrations, preview and deployment.
- No Prisma, PostgreSQL, production file-based SQLite, Firebase, Vercel or GitHub Pages runtime.
- Keep D1 bindings and Drizzle behind server-side repositories. No D1 credentials or answer keys in browser bundles.
- D1 local and remote are separate databases. Explicitly select environment for every migration/seed command; never run remote destructive commands implicitly.
- Confirm actual compatible package versions and deployment scripts from official docs during S0; do not assume an outdated adapter API.
- If Next.js + OpenNext adapter cannot support required D1 bindings in the chosen versions, STOP and report evidence/tradeoffs. Do not silently switch stack.

## Security and integrity
- Default remote deployment must be protected (Cloudflare Access or another validated access-control method). Do not publish write endpoints without enforced authentication and authorization.
- Validate access on every server mutation, not just in UI. Avoid placing sensitive answer keys in client responses before submission.
- Do not assume Cloudflare Access protection is automatically enabled; document exact manual dashboard setup and test access.
- Only original, reviewed practice questions; no dumps or copying commercial exams.
- Version exam domains and snapshot attempt questions; grading is server-side, transactional/idempotent where feasible.
- No unverified claims about official exam versions, scoring, fees, or pass thresholds.
- Keep user-specific D1 data out of Git. Secrets only in Cloudflare secrets/environment, never in repository.

## Simplicity
One modular monolith; no microservices, Redis, queues, AI question generation, provider API sync, multi-tenancy, or paid service requirement for MVP.
Single user is an access model, not permission to omit protection for public hosting.

## Agent orchestration
Default: **one lead Codex agent** responsible for integration. Do NOT spawn subagents by default. Optional bounded read-only reviews:
- `domain-reviewer`: D1 schema, data integrity, provider independence.
- `ux-reviewer`: UI spec, accessibility and mobile states.
- `qa-security-reviewer`: access protection, key leakage, grading and deployment checks.
See `docs/agents/ROLES.md`. Delegation is conditional on actual agent capabilities; no simultaneous overlapping write agents.

## Work protocol
1. Inspect docs; identify conflicts; confirm compatibility and acceptance criteria.
2. Propose smallest S0 plan, dependencies, migration strategy and risks; await approval.
3. Implement one vertical slice; test locally with Wrangler and D1 local.
4. Run typecheck, lint, unit tests and relevant integration/E2E tests; report actual results.
5. Explain manual Cloudflare setup; never claim deployment succeeded unless verified.
6. Request approval before remote resource creation, deployment, paid plans, or moving to next sprint.

## Delivery sequence
S0 runtime spike + bootstrap + D1 schema/migrations/seeds → S1 catalog → S2 plan/dashboard → S3 exam engine/results → S4 security, tests, deployment and backups.

## ADR-006 — Docker local development (mandatory in S0)
- Read `docs/DOCKER_DEV.md` and `docs/COMPATIBILITY.md` before implementing.
- Maintain `Dockerfile.dev`, `compose.yaml`, `.dockerignore`, `.nvmrc`; choose exact tested Node image/version during S0.
- Docker runs Wrangler/Miniflare and D1 **local**; it is not the Cloudflare production runtime. Remote deployment still uses Wrangler/OpenNext, not Docker.
- Generate and lock `package.json`/`package-lock.json` in S0; `npm ci` must work in container. Persist `.wrangler/state` in a named volume; avoid host/node_modules native mismatch.
- Verify `docker compose up --build`, migrations, seed, D1 restart persistence, app port and tests. Report exact results, do not claim unexecuted commands pass.
- The Docker files in this design package are templates and **cannot run until S0 scaffolds the app**.
