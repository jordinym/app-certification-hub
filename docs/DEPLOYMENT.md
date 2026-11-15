# Cloudflare D1 — local and remote operations

## Local development
1. Install Node.js and a supported package manager.
2. Use Wrangler local development with D1 binding `DB` and a local D1 database.
3. Apply schema migrations and idempotent seeds explicitly to **local** D1.
4. Run Next.js through the adapter's documented local preview path; verify runtime bindings are available, not just that `next dev` renders UI.
5. Execute unit tests and a local integration test that creates/reads a certification from D1.

Codex must determine and document **exact current CLI commands** after selecting compatible package versions. Avoid copying outdated commands into scripts.

## Cloudflare setup (manual, after S0 approval)
- Create Cloudflare account/project, Worker named `certification-hub`, and D1 database (suggested name `certification-hub-db`).
- Configure `DB` binding in Wrangler with real Cloudflare database identifier (never invent ID).
- Apply **remote** migrations explicitly and seed non-sensitive catalog data only.
- Protect the Worker using Cloudflare Access or another validated access layer before opening write routes; test an anonymous request is denied and authenticated request is allowed.
- Deploy to the actual assigned `*.workers.dev` hostname or configured custom domain.
- Configure GitHub Actions only after manual deployment succeeds; store API tokens as GitHub secrets with minimum permissions.

## Data and costs
- D1 is managed SQLite-compatible SQL, not a local `.db` file in production.
- D1 local development uses separate local state. Do not commit generated state, secrets or user attempt history.
- Confirm free-tier quotas/availability and any billing requirements at setup time.
- Backup/export D1 before destructive schema changes; document tested restoration procedure. A git repository is not a data backup.
- Explicit `local`/`remote` flags in scripts and migration runbooks; require confirmation for remote destructive operations.

## Acceptance
- Local catalog read/write persists across application restarts.
- Remote deployment serves UI and uses remote D1.
- Unauthorized requests cannot read personal study data or mutate anything.
- A newly created provider/certification survives deploy and restart.
- Never claim the above passed until actually verified.

## Docker-first developer setup
See `docs/DOCKER_DEV.md` for the Docker Compose workflow, persistent `.wrangler/state` volume and explicit local migration/seed commands. `compose.yaml` and `Dockerfile.dev` are templates; Codex must generate app files, scripts and lockfile in S0 before they can run. Docker does not deploy to Cloudflare and does not replace remote D1 access controls.
