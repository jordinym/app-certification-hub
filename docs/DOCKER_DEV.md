# ADR-006 — Dockerized local Cloudflare development

## Goal and boundaries
Docker standardizes Node, package manager and Wrangler versions on Mac/CI. **It does not run Cloudflare's production infrastructure.** Wrangler/Miniflare emulates the Worker runtime and provides a **local D1 binding**. Remote D1 remains managed by Cloudflare.

## Implementation plan for S0
1. Verify supported Next.js / OpenNext Cloudflare / Wrangler / Drizzle / Node combinations from official docs. Record tested exact versions in `docs/COMPATIBILITY.md` and lock them.
2. Generate actual `package.json`, `package-lock.json`, `wrangler.jsonc`, `drizzle.config.ts`, app source and migrations during S0. These are **not present in this design package**.
3. Use `Dockerfile.dev`, `compose.yaml` and `.dockerignore` in this package as **starting templates**. Docker Compose must be runnable after S0 scaffolding; it is not yet runnable now.
4. Implement `npm run dev:cloudflare` to run the supported OpenNext/Workers local preview on `0.0.0.0:3000`, with live reload if supported. If adapter does not support this workflow, document a two-command development flow (`next dev` for UI and Workers preview for binding integration), with clear limitations; do not fake hot reload.
5. Configure D1 binding `DB` in Wrangler and ensure `.wrangler/state` is persisted via a named volume. The container's working directory and Wrangler persistence directory must align. Avoid accidental host/container state split.
6. Implement scripts `db:migrate:local`, `db:seed:local`, `db:backup:local` using verified Wrangler commands and explicit local selection. Remote scripts must require separate intentional invocation and approval.
7. Add local D1 persistence integration test and restart test. `docker compose down` must preserve data; `docker compose down -v` destroys the named volume.
8. Never mount local D1 state over source files or commit it to Git. Never bake secrets into images.

## Expected developer workflow after S0
```sh
docker compose build
docker compose run --rm app npm run db:migrate:local
docker compose run --rm app npm run db:seed:local
docker compose up
```
Open http://localhost:3000 once S0 has verified the binding-aware preview. Stop with `docker compose down` (do **not** use `-v` unless intentionally resetting local D1).

## Apple Silicon and architecture
Prefer official Node Linux images supporting both arm64 and amd64. Do not force `platform: linux/amd64` unless compatibility evidence requires it. Pin Node major/minor or digest after compatibility validation; lock npm dependencies. Docker Desktop is a local prerequisite, not a cloud dependency.

## Production
Deploy generated Worker using verified OpenNext/Cloudflare commands, not the Docker image. Keep Wrangler remote D1 bindings and migrations separate from local state. Public deployment requires enforced server-side access control.

## Risks and decisions to test
- Next.js `next dev` may not emulate Workers bindings; verify with adapter preview.
- Bind mounts of `node_modules` and `.wrangler/state` require explicit volumes to avoid macOS/Linux native-module issues.
- D1 local behavior may differ from production in quotas, latency and platform integrations.
- Docker alone does not eliminate adapter compatibility risks or protect production endpoints.
