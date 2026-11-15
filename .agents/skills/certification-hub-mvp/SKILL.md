---
name: certification-hub-mvp
description: Implement the provider-agnostic Certification Hub MVP using Cloudflare Workers, D1, Drizzle and Next.js with guarded incremental delivery.
---

# Certification Hub MVP — local project skill

## Trigger
Use when implementing, reviewing or planning work in this repository.

## Sources of truth
Read `AGENTS.md`, `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`, `docs/UI_SPEC.md`, `docs/BACKLOG.md`. Mockup is visual only.

## Workflow
1. State task scope, dependencies and acceptance tests.
2. Confirm Next.js/OpenNext/Cloudflare Workers/D1/Drizzle version compatibility before scaffolding.
3. Keep server-only D1 repositories and provider-agnostic domain logic.
4. Implement a single vertical slice, run tests and report exact commands/results.
5. Require explicit approval before remote resource creation, paid changes, deployment or next sprint.

## Non-negotiables
- No Prisma/PostgreSQL/Firebase; D1 is persistent managed SQL, not a deployed `.db` file.
- No exposed answer keys or public write endpoints.
- Local and remote D1 migration commands must be clearly distinct.
- No fabricated official exam facts or copied exam questions.
- Do not add AI question generation or multiagent complexity to MVP.
- Optional reviewers are read-only; one lead agent owns integration.

## Docker local development
Read `docs/DOCKER_DEV.md` and `docs/COMPATIBILITY.md`. In S0 pin a verified toolchain, make the Docker Compose templates executable, prove Wrangler D1 local persistence and keep production deployment separate. Do not claim Docker emulates all Cloudflare production features.
