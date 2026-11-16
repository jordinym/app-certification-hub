# Execution policy — bounded Codex / HITL

## Status machine
`proposed -> spec-approved -> task-authorized -> implemented-unverified -> verified -> accepted`.
On failure: `blocked`; if rejected: return to `proposed` or `task-authorized` explicitly. The agent MUST NOT transition to `accepted` without user approval.

## Gates
- G0: Approve reconciliation/milestone roadmap after H00 report. No code at H00.
- G1: Approve each milestone's `spec.md` and `design.md` (scope, UI, data/security decisions).
- G2: Authorize one task (`tasks.md` checkbox + exact ID). A task may include related changes but must be demonstrably bounded.
- G3: Human accept test evidence + UI screenshot if relevant; authorize next task/milestone separately.
- GR: Explicit remote deploy/Access/migration/cost approval even if a sprint or milestone was approved.

## Anti-loop stop rules
- Two repair attempts for the same root cause; no automatic pivot to new infrastructure solutions.
- No background/repeated builds, reinstall loops, open-ended watch mode, test suite retries without changed hypothesis.
- Each command must have a reason, expected result and bounded execution; use timeout when supported; avoid claiming that Markdown ensures wall-clock enforcement.
- Infra blockers: separate product-visible work that does not require DB; blocked features stay blocked; never waive D1/security gates.
- CI or Docker build may be run ONCE when explicitly part of the current authorized task, with one diagnostic retry only if justified.
- After blocker, write evidence + options (fix / defer nonblocking work / request decision), STOP. Never downgrade versions or switch providers silently.

## Evidence format
`Task ID | legacy IDs | git commit/changes | environment | commands/result | UI evidence | security impact | unresolved | next decision`.
Acceptance is not a test invocation; it is demonstrated behavior.
