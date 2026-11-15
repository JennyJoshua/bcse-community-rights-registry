import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentDemoUser } from "@/lib/demo-auth";
import { signOutAction } from "@/app/sign-out/actions";

export const dynamic = "force-dynamic";

export default async function AppHomePage() {
  const user = await getCurrentDemoUser();
  if (!user) redirect("/sign-in");
  return (
    <main className="app-shell">
      <div className="notice" role="note"><strong>Synthetic data only</strong><span>This prototype contains no real community records or evidence.</span></div>
      <header className="app-header">
        <Link className="brand" href="/"><span className="brand-mark">B</span><span><strong>BCSE</strong><small>COMMUNITY RIGHTS REGISTRY</small></span></Link>
        <form action={signOutAction}><button className="secondary-button" type="submit">Sign out</button></form>
      </header>
      <section className="workspace-heading">
        <p className="eyebrow">YOUR DEMONSTRATION ACCOUNT</p>
        <h1>Welcome, {user.displayName.split(" ")[0]}</h1>
        <p className="muted">Choose one of the synthetic workspaces assigned to this account.</p>
      </section>
      <section className="workspace-grid" aria-label="Your workspaces">
        {user.memberships.map((membership) => (
          <Link className="workspace-card" href={`/workspaces/${membership.workspaceId}`} key={membership.workspaceId}>
            <span className="workspace-kicker">DEMONSTRATION WORKSPACE</span>
            <h2>{membership.workspaceName}</h2>
            <p>Your application role: <strong>{membership.role.replaceAll("_", " ")}</strong></p>
            <span className="workspace-open">Open workspace <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </section>
      <p className="fine-print">Workspace membership is synthetic application data. It does not establish customary representation, authority, legal standing or consent.</p>
    </main>
  );
}
