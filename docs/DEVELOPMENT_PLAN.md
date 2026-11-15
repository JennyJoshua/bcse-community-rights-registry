# Development Plan

## Batch 0 — Foundation (merged)
- Repository and branch workflow.
- Product boundaries, synthetic-data-only policy and architecture.
- Next.js + TypeScript application scaffold and baseline CI.

## Batch 1 — Authentication and workspace shell (implementation candidate; PR #3 open)
- Local-only synthetic sign-in and sign-out.
- Signed HTTP-only demonstration session.
- User profile context and workspace list.
- Explicit workspace membership and role capability checks on the server.
- Cross-workspace and role-capability tests.
- No hosted Supabase, database, migrations or production identity.

## Batch 2 — Governance and evidence
- Synthetic governance and representative records.
- Evidence metadata and synthetic file fixtures.
- Clear distinction between user assertions and official instruments.

## Batch 3 — Access and permissions
- Workspace-scoped access controls.
- Purpose-specific permission records and revocation workflow.
- No assumption that software permission equals legally valid consent.

## Batch 4 — Objections, audit and export
- Confidential objection intake and status tracking.
- Auditable actions and controlled export.
- No public exposure of disputed claims by default.

## Batch 5 — Security and readiness
- Threat modelling, access-control tests and dependency review.
- Privacy, legal and governance readiness checklist.
- Independent review before any real-data pilot.

## Working rules
- Work in small reviewable batches and feature branches.
- Tests must use synthetic fixtures only.
- No secrets in repository.
- No merge to `main`, production deployment, hosted database, paid service or material scope expansion without explicit approval.
