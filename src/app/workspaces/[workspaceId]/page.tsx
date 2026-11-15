import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { canAccessWorkspace, getCurrentDemoUser } from "@/lib/demo-auth";
import { signOutAction } from "@/app/sign-out/actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ workspaceId: string }> };

export default async function WorkspacePage({ params }: Props) {
  const { workspaceId } = await params;
  const user = await getCurrentDemoUser();
  if (!user) redirect("/sign-in");
  if (!canAccessWorkspace(user, workspaceId)) notFound();
  const membership = user.memberships.find((item) => item.workspaceId === workspaceId);
  if (!membership) notFound();

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
      <section className="workspace-overview">
        <div><span className="overview-number">01</span><h2>Workspace shell ready</h2><p>This space is a synthetic demonstration. Governance records, evidence and permissions are not enabled in Batch 1.</p></div>
        <aside><strong>Access boundary</strong><p>You can open this workspace because your demonstration account has an explicit membership record.</p><p>Changing the workspace address does not grant access to another workspace.</p></aside>
      </section>
      <Link className="text-link" href="/app">← Return to workspace list</Link>
    </main>
  );
}
