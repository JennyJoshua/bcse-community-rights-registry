# Batch 2 — Governance Records and Evidence Portfolio

## Status
Implementation candidate on `feature/batch-2-governance-evidence`. Synthetic data only. Not merged.

## Included
- Read-only governance record catalogue with fictional meeting, representative-role and governance-document examples.
- Read-only evidence metadata catalogue with fictional provenance, source, classification and review-status examples.
- Explicit workspace scoping in fixture query helpers.
- Server-side `view_records` capability checks on both catalogue routes.
- Workspace dashboard links and synthetic record counts.
- Unit tests for workspace isolation, identifier scoping and non-verification labels.
- Mobile-responsive catalogue cards and metadata layouts.

## Record semantics
- A community assertion is displayed as an assertion, not a verified fact.
- A supplied document is not automatically authentic, adopted or legally effective.
- An official-instrument example is a fictional category placeholder; no real government instrument is reproduced or validated.
- Review status describes the state of this demo record only. It is not a legal opinion or certification.

## Important limitations
- All data is fictional and hard-coded in local application fixtures.
- File references explicitly state that no actual file exists.
- No uploads, downloads, file storage, document parsing, authenticity checks, editing, approvals or real evidence.
- No database, RLS, hosted Supabase or production identity.
- Application-level checks are not production tenant-security controls.
- No real names, contact details, genealogy, customary boundaries, sacred/secret content or legal case material may be entered.
- Do not deploy this prototype for real community use.

## Deferred
Database-backed records, RLS, private storage, malware scanning, retention/deletion, audit trails, version history, document integrity checks, legal review and community-specific data governance require separate design and approval.
