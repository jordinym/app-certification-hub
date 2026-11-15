# UI specification — Certification Hub MVP

## Visual direction
Use `docs/ui-reference.png` as illustrative reference: professional navy/blue SaaS dashboard, restrained cards, readable tables, progress bars, clear states, responsive desktop/tablet/mobile. Avoid copying sample values as real progress.

## Navigation / routes
- `/` dashboard: aggregate progress, current plan, next tasks, provider filter.
- `/certifications` catalog: provider filters, search, certification cards, add certification.
- `/certifications/new` creation: provider (existing or new), code, name, optional level; version/domain metadata only when verified or manually entered.
- `/certifications/[id]` detail: versions, domains, resources and plan links.
- `/plans` study plans and daily task checklist; weekly/calendar views.
- `/simulations` practice exam list/start; select certification, version and available published question set.
- `/simulations/[attemptId]` timed practice attempt: question, options, navigation, submit confirmation; no answer key exposed.
- `/results/[attemptId]` results, review, explanation, domain breakdown.
- `/resources` official resource links, source metadata.
- `/settings` timezone and study preferences.

## Screen behaviors
- Every write operation validates server-side and persists to D1.
- Catalog creation handles duplicate provider/code with actionable errors.
- Plan tasks support not-started, in-progress and completed states; log actual minutes.
- Practice attempts have loading, no-questions, in-progress, submission, submitted and error states.
- Scoring and answer review appear only after submission.
- Dashboard reflects D1 persisted data, not static mockup percentages.
- Mobile: sidebar becomes accessible navigation; tables adapt without truncating essential actions.
- Accessibility: keyboard controls, labels, contrast, focus states and semantic progress.

## Design tokens
Primary azure-blue `#0078D4`, deep navy `#102A43`, light background `#F3F6FA`, success `#107C10`, warning `#FFB900`; use semantic design tokens rather than scattered hex values.

## Implementation notes
Reusable `AppShell`, `Sidebar`, `MetricCard`, `ProgressBar`, `CertificationCard`, `ProviderFilter`, `TaskRow`, `QuestionCard`, `ResultSummary`, `EmptyState`, `ConfirmDialog`. No Cloudflare-specific API details in presentational components.

## MVP scope boundary
The image may show invented sample scores, provider counts and certification names; treat these as visual placeholders only. Do not add extra functionality merely because it appears in the image.
