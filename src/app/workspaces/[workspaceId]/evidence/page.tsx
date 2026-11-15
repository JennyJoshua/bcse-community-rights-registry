import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentDemoUser } from "@/lib/demo-auth";
import { hasWorkspaceCapability } from "@/lib/access.mjs";
import { listEvidenceItems } from "@/lib/registry-demo.mjs";
import { signOutAction } from "@/app/sign-out/actions";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ workspaceId: string }> };
export default async function EvidencePage({ params }: Props) {
  const { workspaceId } = await params;
  const user = await getCurrentDemoUser();
  if (!user) redirect("/sign-in");
  if (!hasWorkspaceCapability(user, workspaceId, "view_records")) notFound();
  const membership = user.memberships.find((item) => item.workspaceId === workspaceId);
  if (!membership) notFound();
  const items = listEvidenceItems(workspaceId);
  return <main className="app-shell">
    <div className="notice" role="note"><strong>Synthetic data only</strong><span>Catalogue entries are fictional metadata. No real files are stored or uploaded.</span></div>
    <header className="app-header"><Link className="brand" href="/"><span className="brand-mark">B</span><span><strong>BCSE</strong><small>COMMUNITY RIGHTS REGISTRY</small></span></Link><form action={signOutAction}><button className="secondary-button" type="submit">Sign out</button></form></header>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/app">Your workspaces</Link><span>/</span><Link href={`/workspaces/${workspaceId}`}>{membership.workspaceName}</Link><span>/</span><span>Evidence portfolio</span></nav>
    <section className="workspace-heading"><p className="eyebrow">EVIDENCE CATALOGUE · DEMONSTRATION</p><h1>Evidence portfolio</h1><p className="muted">A metadata-only catalogue showing how source, provenance, classification and review status may be recorded.</p></section>
    <div className="registry-callout"><strong>Catalogue status is not verification.</strong><p>A source label does not prove authenticity, accuracy, legal effect or current validity. Official-instrument examples are placeholders only.</p></div>
    <section className="record-list" aria-label="Evidence catalogue">{items.map((item) => <article className="record-card" key={item.id}><div className="record-topline"><span>{item.reference}</span><span className="record-pill">{item.classification}</span></div><h2>{item.title}</h2><p>{item.evidenceType}</p><dl className="record-meta"><div><dt>Source</dt><dd>{item.source}</dd></div><div><dt>Source date</dt><dd>{item.sourceDate}</dd></div><div><dt>Review status</dt><dd>{item.reviewStatus}</dd></div><div><dt>File reference</dt><dd>{item.fileLabel}</dd></div></dl><p className="record-limitation">{item.provenanceNote}</p></article>)}</section>
    <p className="fine-print">No file upload, download, document inspection or authenticity assessment is implemented in this batch.</p><Link className="text-link" href={`/workspaces/${workspaceId}`}>← Return to workspace</Link>
  </main>;
}
