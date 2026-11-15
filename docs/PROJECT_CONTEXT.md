# BCSE Community Rights Registry — Project Context

- Product: BCSE Community Rights Registry
- Repository: `JennyJoshua/bcse-community-rights-registry`
- Document ID: BCSE-PRD-001
- Specification: Notion page, Product and Technical Specification v0.1
- Current phase: Batch 0 — project foundation
- Data policy: synthetic demonstration data only
- Deployment: not authorised
- Hosted database: not authorised
- Production use: not authorised

## Purpose

Provide digital tools for communities to organise governance records, supporting evidence, access permissions, objections and portable exports while retaining authority over their heritage and decisions.

## Product boundary

The software records information supplied or approved by users. It must not determine customary ownership, decide who represents a community, certify consent, adjudicate competing claims, issue legal titles, or replace statutory agencies, courts, mediators or qualified legal practitioners.

## Initial user roles

- Platform administrator
- Workspace administrator
- Records officer
- Community reviewer
- Read-only auditor
- External viewer (no access by default)

Role labels do not themselves establish customary authority or legal standing.

## Initial modules

1. Community workspace
2. Governance and representation records
3. Evidence portfolio
4. Access and permissions
5. Objections and complaints
6. Audit and export

## Data classification for prototype

- `PUBLIC_DEMO`: safe synthetic data intended for public demonstration
- `INTERNAL_DEMO`: synthetic operational examples
- `RESTRICTED_DEMO`: synthetic examples used to test restricted workflows
- `SACRED_SECRET_PLACEHOLDER`: metadata-only placeholder; never enter actual sacred or secret content

## Non-negotiable safeguards

- No real community or sensitive personal data in development, tests, issues or demos.
- No precise customary boundaries, genealogy or sacred/secret material.
- No public disclosure of objections or disputed claims by default.
- No AI adjudication or automated credibility scoring.
- No commercial licensing, land transactions, payments or royalty workflows in the initial product.
- No external access unless explicitly granted through a future reviewed permission model.
- Community data portability and exit must be designed before any real-data pilot.

## Approval gates

Separate explicit approval is required before creating a hosted database, applying hosted migrations, connecting production authentication/storage, deploying publicly, purchasing services, or using real community data. Legal, governance, privacy and security readiness must be independently reviewed before a real-data pilot.

## Next batches

- Batch 0: foundation and guardrails
- Batch 1: authentication and workspace shell
- Batch 2: governance records and evidence portfolio
- Batch 3: access controls and permission workflows
- Batch 4: objections, audit and export
- Batch 5: security review and readiness assessment
