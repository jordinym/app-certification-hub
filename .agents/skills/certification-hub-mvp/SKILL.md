---
name: certification-hub-mvp
description: Route Certification Hub work through the canonical SDD/HITL entrypoint and preserve technical boundaries.
---
# Certification Hub — SDD/HITL adapter

Use when working in this repository. Follow `AGENTS.md` and `CODEX_START.md`; use `docs/README.md` for canonical sources, `docs/sdd/ACTIVE_MILESTONE.md` plus explicit human approval for scope, and `docs/sdd/EXECUTION_POLICY.md` for gates, execution budget, evidence and stopping rules. Do not duplicate or override that protocol here. Read only context relevant to the authorized task. This skill grants no execution permission and does not start H00 or advance milestones.

Preserve the approved stack: Next.js App Router, strict TypeScript, Tailwind, Zod, OpenNext Cloudflare Workers, D1, Drizzle, Wrangler, local Docker Compose, Vitest and Playwright. Preserve mandatory P0/P1 requirements per `docs/sdd/MILESTONE_ROADMAP.md`, section “Platform track (must not disappear)”; UI progress does not close S0 or waive Worker/D1 and Docker acceptance.

Keep the product personal, private-by-default, single-user and provider-agnostic. Separate local and remote D1, protect server mutations and remote write endpoints, and never expose secrets, user data or exam answer keys. Do not publish unreviewed questions or invent official exam data. Stack changes and remote operations require the explicit approvals specified by the canonical entrypoint and policy.
