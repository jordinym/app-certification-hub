# Decision log

- **2026-11-15 — Naming:** application `Certification Hub`, GitHub repo `app-certification-hub`, Cloudflare Worker `certification-hub`.
- **2026-11-15 — Hosting:** Cloudflare Workers rather than GitHub Pages; GitHub only for source and optional CI/CD.
- **2026-11-15 — Persistence:** Cloudflare D1 (managed SQLite-compatible SQL) rather than PostgreSQL, Prisma, Firebase or deployed local SQLite.
- **2026-11-15 — Data access:** Drizzle ORM with D1 driver; schema and migrations versioned.
- **2026-11-15 — Runtime:** Next.js App Router through compatible OpenNext Cloudflare adapter; compatibility proof required in S0.
- **2026-11-15 — Security:** private-by-default deployment, enforced server access controls, no browser-exposed exam answer keys.
- **2026-11-15 — Orchestration:** one lead Codex agent; optional read-only reviewers, no mandatory multiagent setup.

- **2026-11-15 — Local development:** Docker Compose + pinned Node/npm + Wrangler/Miniflare with local D1; persistent named volume; Cloudflare production remains serverless and is not Dockerized.
