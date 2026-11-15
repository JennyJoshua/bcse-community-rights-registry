import Link from "next/link";
import { DEMO_USERS } from "@/lib/demo-auth";
import { signInAction } from "./actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function SignInPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <main className="app-shell">
      <div className="notice" role="note">
        <strong>Prototype environment</strong>
        <span>Demonstration accounts and synthetic workspaces only. Never enter real community or personal information.</span>
      </div>
      <header className="app-header">
        <Link className="brand" href="/"><span className="brand-mark">B</span><span><strong>BCSE</strong><small>COMMUNITY RIGHTS REGISTRY</small></span></Link>
        <Link className="text-link" href="/">Back to overview</Link>
      </header>
      <section className="auth-panel">
        <p className="eyebrow">BATCH 1 · LOCAL DEMONSTRATION</p>
        <h1>Sign in to the workspace</h1>
        <p className="muted">Choose a synthetic account to explore the role-based workspace shell. These are not real users.</p>
        {error === "setup" && <p className="form-error" role="alert">Local setup is incomplete. Configure BCSE_DEMO_SESSION_SECRET using the instructions in .env.example.</p>}
        {error === "invalid" && <p className="form-error" role="alert">Please select a valid demonstration account.</p>}
        <form action={signInAction} className="account-list">
          {DEMO_USERS.map((user) => (
            <button className="account-option" type="submit" name="userId" value={user.id} key={user.id}>
              <span className="account-avatar" aria-hidden="true">{user.displayName.split(" ").map((part) => part[0]).join("")}</span>
              <span className="account-details"><strong>{user.displayName}</strong><small>{user.email}</small><small>{user.memberships.map((membership) => membership.role.replaceAll("_", " ")).join(" · ")}</small></span>
              <span className="account-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </form>
        <p className="fine-print">Local prototype only. This demonstration sign-in is not production identity verification or a security approval for real information.</p>
      </section>
    </main>
  );
}
