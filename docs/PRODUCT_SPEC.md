# Product specification — Certification Hub MVP

## Vision
Personal, provider-agnostic certification preparation: discover/manage certifications, schedule learning, track daily progress, practice with original reviewed questions, inspect results.

## Names
App: **Certification Hub**. GitHub repository: **`app-certification-hub`**. Cloudflare Worker: **`certification-hub`**. Suggested D1 database: **`certification-hub-db`**.

## MVP users and initial data
One authorized user. Seed Microsoft as provider with AZ-900, AI-901, AI-200, AZ-104 and AZ-305; seed GitHub provider with no invented certification catalog. Additional providers and certifications must be creatable in UI. Initial 28-week Azure plan is user-editable and not an official schedule.

## Must-have user journeys
1. Browse certifications by provider, view version and domains, create/edit custom provider and certification.
2. Create or view study plan, complete dated tasks, record minutes and open official external resources.
3. Create practice attempt using published original questions; answer and submit; see score, explanations and weak domains.
4. Review progress across providers and certifications.

## Rules
- Provider and certification definitions are data, not code branches.
- Exam versions are independently versioned; preserve historical results.
- Store source URLs and verification dates when known; unknown official data remains unset.
- No provider-specific passing thresholds; practice percentage is not an official scaled score.
- Only reviewed/published original questions appear in simulations; never copy exam dumps.
- Prevent unprotected access to personal study history and mutation endpoints.
- Support accessible mobile layouts, loading, empty, error and confirmation states.

## Out of scope
Automatic content sync, AI generation, multiple accounts, public catalog publishing, social features, payments, notifications, SaaS billing, adaptive algorithms.

## Success criteria
New GitHub or other certification can be created with no code changes; study plan and attempt persisted in D1; five Azure seeds remain; local runtime works; protected remote deployment is feasible.
