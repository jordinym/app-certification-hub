# Optional reviewer roles — not mandatory subagents

Codex lead agent owns all edits, integration and final decisions. Subagents are optional and **read-only**; use only when supported and useful.

## domain-reviewer
Inspect D1 schema, Drizzle migrations, foreign keys, indexes, exam versioning, snapshots, idempotency, and absence of provider-specific business logic. Report prioritized findings, no code edits.

## ux-reviewer
Compare implemented screens with `docs/UI_SPEC.md` and `docs/ui-reference.png`. Inspect responsive layout, keyboard accessibility, empty/loading/error states, provider filters, form validation. Report findings, no edits.

## qa-security-reviewer
Inspect Cloudflare Worker access controls, D1 binding use, answer-key leakage, unsafe migrations, secrets, score calculation and tests. Verify unauthorized remote requests are rejected. Report findings, no edits.

## Invocation policy
Use one bounded review per milestone when risk warrants it; do not create parallel write agents or invoke reviewers as ceremony. If subagents unavailable, lead agent performs checklist review and states that no delegation occurred.

## Docker-specific review
QA reviewer also checks version pinning, lockfile use, Apple Silicon compatibility, local D1 state volume, separation of local and remote commands, and that no secrets are baked into images.
