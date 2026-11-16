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

## S0 operational boundary

The root `wrangler.jsonc` is **local-only**. Remote npm scripts currently exit with an error. Never deploy that configuration or reuse its local bearer token as production authentication. S0 has not created a Worker, remote D1 or Access application.

Before enabling remote scripts, prepare a separate reviewed configuration with the real database UUID, remote-only secrets and no local access bypass. Every remote migration/seed/export command must select that configuration and `--remote` explicitly. Use OpenNext for the application build/deploy path; do not deploy the Docker image.

## Future manual Access setup (requires separate authorization)

1. Keep application routes disabled while creating/configuring the authorized Worker and D1 resources.
2. In the dashboard, open **Workers & Pages**, choose `certification-hub`, and open its **Access** tab.
3. Enable Worker protection and choose **All traffic**, covering production and previews.
4. Select an Access policy restricted to the one approved identity. Do not use an entire email domain as a substitute for single-user authorization.
5. Apply the policy; record issuer, audience and intended session duration for the server validator.
6. Configure JWT signature/issuer/audience/expiry validation and the identity allowlist in application code before enabling routes.
7. Test each actual hostname: anonymous access, invalid/expired token, wrong identity and valid identity. Test mutations directly, not only browser navigation.
8. Only after those checks, authorize normal use and verify remote D1 persistence. Keep unexpected hosts/previews disabled or protected.

Dashboard path verified against [Cloudflare's Worker Access documentation](https://developers.cloudflare.com/workers/configuration/cloudflare-access/). This runbook is preparation, not evidence that Access is enabled. Recheck account availability, quotas and billing before creating resources. Do not change account-wide protection for unrelated Workers without separate authorization.
