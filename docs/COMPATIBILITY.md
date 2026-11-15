# Sprint 0 compatibility evidence (to be completed by Codex)

**Not verified yet.** `Dockerfile.dev` and `.nvmrc` currently propose Node 22 as a **candidate**, not a certified combination.

Record exact tested versions, official reference URLs, test date and outcome for:
- Node image and architecture (Apple Silicon arm64, optional amd64)
- Next.js App Router
- OpenNext Cloudflare adapter
- Wrangler / Miniflare
- Drizzle ORM and D1 driver
- TypeScript, npm and test tooling

Required proof: D1 binding available in Worker runtime; local migration/seed; persisted read/write after container restart; preview port reachable from Mac; `npm ci` reproducible; no unsupported Node APIs.

If incompatible, pause and request approval before switching stack or relaxing requirements.
