import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentDemoUser } from "@/lib/demo-auth";
import { hasWorkspaceCapability } from "@/lib/access.mjs";
import { listGovernanceRecords, listEvidenceItems } from "@/lib/registry-demo.mjs";
import { signOutAction } from "@/app/sign-out/actions";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ workspaceId: string }> };

export default async function WorkspacePage({ params }: Props) {
  const { workspaceId } = await params;
  const user = await getCurrentDemoUser();
  if (!user) redirect("/sign-in");
  if (!hasWorkspaceCapability(user, workspaceId, "view_workspace")) notFound();
  const membership = user.memberships.find((item) => item.workspaceId === workspaceId);
  if (!membership) notFound();
  const canViewRecords = hasWorkspaceCapability(user, workspaceId, "view_records");
  const governanceCount = canViewRecords ? listGovernanceRecords(workspaceId).length : 0;
  const evidenceCount = canViewRecords ? listEvidenceItems(workspaceId).length : 0;

  return (
    <main className="app-shell">
      <div className="notice" role="note"><strong>Synthetic data only</strong><span>No real community information may be entered into this prototype.</span></div>
      <header className="app-header">
        <Link className="brand" href="/"><span className="brand-mark">B</span><span><strong>BCSE</strong><small>COMMUNITY RIGHTS REGISTRY</small></span></Link>
        <form action={signOutAction}><button className="secondary-button" type="submit">Sign out</button></form>
      </header>
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/app">Your workspaces</Link><span>/</span><span>{membership.workspaceName}</span></nav>
      <section className="workspace-heading">
        <p className="eyebrow">COMMUNITY WORKSPACE · DEMONSTRATION</p>
        <h1>{membership.workspaceName}</h1>
        <p className="muted">Signed in as {user.displayName}. Your application role is <strong>{membership.role.replaceAll("_", " ")}</strong>.</p>
      </section>
      <div className="registry-callout"><strong>Records are organised, not adjudicated.</strong><p>Entries in this prototype do not establish customary ownership, representative authority, legal standing or consent. No legal verification is performed.</p></div>
      <section className="registry-module-grid" aria-label="Workspace modules">
        <Link className="registry-module-card" href={`/workspaces/${workspaceId}/governance`}><span className="module-number">01 · GOVERNANCE</span><h2>Governance records</h2><p>Browse synthetic meeting and representative-record examples.</p><span className="module-count">{governanceCount} demo records <span aria-hidden="true">→</span></span></Link>
        <Link className="registry-module-card" href={`/workspaces/${workspaceId}/evidence`}><span className="module-number">02 · EVIDENCE</span><h2>Evidence portfolio</h2><p>Review source, provenance, classification and review-status examples.</p><span className="module-count">{evidenceCount} demo entries <span aria-hidden="true">→</span></span></Link>
      </section>
      <p className="fine-print">All records are fictional metadata fixtures. Editing, uploading, verification, permissions and real-data use remain disabled.</p>
      <Link className="text-link" href="/app">← Return to workspace list</Link>
    </main>
  );
}
