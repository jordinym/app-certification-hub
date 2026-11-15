# Certification Hub — Cloudflare D1 MVP design package

**Application:** Certification Hub  
**GitHub repository:** `app-certification-hub`  
**Cloudflare Worker project:** `certification-hub`  
**Proposed public address:** `certification-hub.<your-subdomain>.workers.dev` (actual hostname assigned by Cloudflare).  
**Status:** design package and Codex instructions; **application code not yet implemented**.

## Stack decision
- Next.js App Router, TypeScript strict, Tailwind CSS, Zod.
- Cloudflare Workers for server-side execution using a compatible OpenNext Cloudflare adapter.
- Cloudflare D1 (SQLite-compatible managed SQL), Drizzle ORM and versioned SQL migrations.
- Wrangler for local development, deployment and D1 local/remote management.
- Vitest and Playwright; server-side exam scoring.

**Do not use Prisma, PostgreSQL, a local production SQLite file, Firebase, or GitHub Pages hosting.**
GitHub hosts the source and GitHub Actions may deploy to Cloudflare. D1 holds persistent data.

## Contents
- `AGENTS.md`: rules and bounded agent roles.
- `CODEX_START.md`: copy/paste first prompt.
- `.agents/skills/certification-hub-mvp/SKILL.md`: local workflow.
- `docs/PRODUCT_SPEC.md`: provider-agnostic MVP scope.
- `docs/UI_SPEC.md`: screens and flows.
- `docs/ui-reference.png`: illustrative mockups, not source of truth.
- `docs/ARCHITECTURE.md`: Cloudflare runtime, D1 and domain model.
- `docs/DEPLOYMENT.md`: local/remote workflow, security and backups.
- `docs/BACKLOG.md`: incremental delivery.
- `docs/agents/ROLES.md`: optional read-only reviewers.

## Starting sequence
1. Create an empty private GitHub repository named `app-certification-hub`.
2. Extract this package at the repository root, including hidden `.agents`.
3. Open the repository in Codex; paste `CODEX_START.md`.
4. Codex first validates runtime/toolchain compatibility and proposes S0; **wait for approval before coding**.
5. Do not deploy a publicly accessible writable application until access protection is verified.

## Scope
Initial seeded study goals: AZ-900, AI-901, AI-200, AZ-104, AZ-305. The 28-week calendar is an editable personal plan, **not official exam scheduling**. Provider-specific details must be sourced and versioned, never fabricated.

## Codex skill (important)
The skill is included at `.agents/skills/certification-hub-mvp/SKILL.md`. On macOS, press Command+Shift+. in Finder to show hidden `.agents`. The GitHub repository name is `app-certification-hub`.

## Local development with Docker (Sprint 0 target)
`Dockerfile.dev`, `compose.yaml`, `.dockerignore` and `.nvmrc` are included as templates. **This package is not runnable yet**: Codex must generate Next.js source, package manifests/lockfile, Wrangler bindings, Drizzle schema/migrations and scripts in Sprint 0. See `docs/DOCKER_DEV.md` and `docs/COMPATIBILITY.md`.

After S0 verification, expected commands: `docker compose build`, `docker compose run --rm app npm run db:migrate:local`, `docker compose run --rm app npm run db:seed:local`, `docker compose up`. `docker compose down` preserves D1 volume; `docker compose down -v` deletes it.
