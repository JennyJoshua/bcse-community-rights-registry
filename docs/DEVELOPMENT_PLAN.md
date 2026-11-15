# Development Plan

## Batch 0 — Foundation (merged)
- Repository and branch workflow.
- Product boundaries, synthetic-data-only policy and architecture.
- Next.js + TypeScript application scaffold and baseline CI.

## Batch 1 — Authentication and workspace shell (merged)
- Local-only synthetic sign-in and sign-out.
- Signed HTTP-only demonstration session.
- User profile context and workspace list.
- Explicit workspace membership and role capability checks on the server.
- Cross-workspace and role-capability tests.
- No hosted Supabase, database, migrations or production identity.

## Batch 2 — Governance records and evidence portfolio (implementation candidate)
- Read-only synthetic governance and representative-record catalogue.
- Metadata-only evidence catalogue with provenance/source fields and review status.
- Explicit distinction between community assertions, supplied documents and official-instrument examples.
- Workspace-scoped server-side view capability checks.
- No uploads, database, hosted services, legal verification or real data.

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
