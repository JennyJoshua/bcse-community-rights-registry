# Batch 1 — Authentication and Community Workspace Shell

## Status
Implementation candidate on `feature/batch-1-auth-workspaces`. Draft PR #3 is open; not merged. Local demonstration only.

## Included
- Local-only demonstration sign-in with five synthetic accounts.
- HMAC-signed, HTTP-only session cookie with an eight-hour expiry.
- Sign-out action.
- User workspace list and workspace detail route.
- Explicit membership and capability checks on the server before rendering a workspace.
- Synthetic roles: platform administrator, workspace administrator, records officer, community reviewer and read-only auditor.
- Tests for cross-workspace membership and role capability boundaries using Node's built-in test runner.
- `.env.example` with instructions for a local signing secret.

## Important limitations
- This is a demonstration identity adapter, not production authentication.
- Demo accounts are intentionally selectable and have no real identity verification.
- The HMAC secret must be configured locally; never commit a real secret.
- This batch has no database and therefore no database row-level security. Server-side membership and capability checks are application-level demonstration controls only.
- No real community data, sensitive personal information, evidence, customary boundaries, genealogy or sacred/secret material is permitted.
- Do not deploy this authentication adapter for real users or use it as a security control for real data.

## Local setup
1. Copy `.env.example` to `.env.local`.
2. Replace the placeholder with a unique random value of at least 32 characters.
3. Install dependencies and run `npm run dev`.
4. Open `/sign-in` and choose a synthetic account.

## Deferred
Supabase Auth, database-backed membership, RLS policies, password/email identity flows, recovery, invitation management, MFA, production deployment and real-data readiness remain out of scope and require separate review and approval.
