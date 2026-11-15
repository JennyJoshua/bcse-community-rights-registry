import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentDemoUser } from "@/lib/demo-auth";
import { hasWorkspaceCapability } from "@/lib/access.mjs";
import { listGovernanceRecords } from "@/lib/registry-demo.mjs";
import { signOutAction } from "@/app/sign-out/actions";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ workspaceId: string }> };
export default async function GovernancePage({ params }: Props) {
  const { workspaceId } = await params;
  const user = await getCurrentDemoUser();
  if (!user) redirect("/sign-in");
  if (!hasWorkspaceCapability(user, workspaceId, "view_records")) notFound();
  const membership = user.memberships.find((item) => item.workspaceId === workspaceId);
  if (!membership) notFound();
  const records = listGovernanceRecords(workspaceId);
  return <main className="app-shell">
    <div className="notice" role="note"><strong>Synthetic data only</strong><span>These examples are fictional. Do not add real community or personal information.</span></div>
    <header className="app-header"><Link className="brand" href="/"><span className="brand-mark">B</span><span><strong>BCSE</strong><small>COMMUNITY RIGHTS REGISTRY</small></span></Link><form action={signOutAction}><button className="secondary-button" type="submit">Sign out</button></form></header>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/app">Your workspaces</Link><span>/</span><Link href={`/workspaces/${workspaceId}`}>{membership.workspaceName}</Link><span>/</span><span>Governance records</span></nav>
    <section className="workspace-heading"><p className="eyebrow">WORKSPACE RECORDS · DEMONSTRATION</p><h1>Governance records</h1><p className="muted">Fictional governance and representative-record examples for testing the catalogue experience.</p></section>
    <div className="registry-callout"><strong>Evidence organisation is not a legal determination.</strong><p>These entries do not establish customary authority, legal standing, ownership, representation or consent. No authenticity or legal effect has been verified.</p></div>
    <section className="record-list" aria-label="Governance records">{records.map((record) => <article className="record-card" key={record.id}><div className="record-topline"><span>{record.reference}</span><span className="record-pill">{record.recordStatus}</span></div><h2>{record.title}</h2><p>{record.summary}</p><dl className="record-meta"><div><dt>Category</dt><dd>{record.category}</dd></div><div><dt>Source type</dt><dd>{record.sourceType}</dd></div><div><dt>Record date</dt><dd>{record.dateLabel}</dd></div><div><dt>Review status</dt><dd>{record.reviewStatus}</dd></div></dl><p className="record-limitation">{record.limitation}</p></article>)}</section>
    <p className="fine-print">Read-only demonstration catalogue. Creating, editing, approving or verifying records is not included in Batch 2.</p><Link className="text-link" href={`/workspaces/${workspaceId}`}>← Return to workspace</Link>
  </main>;
}
