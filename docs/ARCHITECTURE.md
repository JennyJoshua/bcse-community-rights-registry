# Architecture and Security Boundaries

## Proposed stack

- Next.js App Router + TypeScript
- Supabase PostgreSQL for relational data
- Supabase Auth for identity
- Supabase private Storage for synthetic demonstration files
- Zod or equivalent runtime validation at trust boundaries
- Vitest for unit tests
- Playwright for browser-level tests

This is a proposed architecture, not a claim that any provider is configured. Local-first development precedes any hosted service.

## Logical boundaries

1. Presentation layer: accessible, low-bandwidth interface.
2. Application layer: validated use cases and explicit authorisation checks.
3. Data layer: workspace-scoped records and immutable audit events where appropriate.
4. File layer: private object storage, metadata separate from file bytes.
5. External boundary: email, hosting, AI or other subprocessors disabled until reviewed.

## Security requirements

- Deny by default.
- Verify workspace membership and role on the server for every protected operation.
- Enforce tenant isolation in the database, not only in UI code.
- Plan for row-level security before creating any hosted schema.
- Keep privileged service keys server-only; never expose them to browser code.
- Validate and limit uploads; scan files before any real-data use.
- Avoid sensitive content in logs, analytics, URLs and error messages.
- Record actor, action, target, timestamp and outcome in audit events without duplicating confidential payloads.
- Export only records the requesting user is authorised to access.

## Data model candidates

`profiles`, `workspaces`, `workspace_members`, `governance_records`, `representative_records`, `evidence_items`, `evidence_files`, `permission_records`, `objection_cases`, `audit_events`.

All future schema and policy changes require review for workspace isolation, least privilege, deletion/retention, export and dispute confidentiality.

## Explicitly out of scope

No ownership determinations, legal certificates, statutory beneficiary identification, land dealing, commercial/research licensing, benefit payments, royalties, or automated consent/representation decisions.
