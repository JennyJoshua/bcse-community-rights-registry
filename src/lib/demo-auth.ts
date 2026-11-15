import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export type WorkspaceRole =
  | "platform_administrator"
  | "workspace_administrator"
  | "records_officer"
  | "community_reviewer"
  | "read_only_auditor";

export type DemoUser = {
  id: string;
  displayName: string;
  email: string;
  memberships: { workspaceId: string; workspaceName: string; role: WorkspaceRole }[];
};

export const DEMO_USERS: DemoUser[] = [
  {
    id: "demo-platform",
    displayName: "Alex Morgan",
    email: "alex@example.test",
    memberships: [
      { workspaceId: "coastal-demo", workspaceName: "Coastal Community (Demo)", role: "platform_administrator" },
      { workspaceId: "forest-demo", workspaceName: "Forest Community (Demo)", role: "platform_administrator" },
    ],
  },
  {
    id: "demo-records",
    displayName: "Jordan Lee",
    email: "jordan@example.test",
    memberships: [
      { workspaceId: "coastal-demo", workspaceName: "Coastal Community (Demo)", role: "records_officer" },
    ],
  },
  {
    id: "demo-reviewer",
    displayName: "Taylor Reed",
    email: "taylor@example.test",
    memberships: [
      { workspaceId: "forest-demo", workspaceName: "Forest Community (Demo)", role: "community_reviewer" },
    ],
  },
  {
    id: "demo-auditor",
    displayName: "Casey Rivers",
    email: "casey@example.test",
    memberships: [
      { workspaceId: "coastal-demo", workspaceName: "Coastal Community (Demo)", role: "read_only_auditor" },
      { workspaceId: "forest-demo", workspaceName: "Forest Community (Demo)", role: "read_only_auditor" },
    ],
  },
];

const COOKIE_NAME = "bcse_demo_session";
const SESSION_SECONDS = 60 * 60 * 8;

function getSecret(): string {
  const secret = process.env.BCSE_DEMO_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("BCSE_DEMO_SESSION_SECRET must be set to at least 32 characters.");
  }
  return secret;
}

function signature(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function canAccessWorkspace(user: DemoUser, workspaceId: string): boolean {
  return user.memberships.some((membership) => membership.workspaceId === workspaceId);
}

export async function createDemoSession(userId: string): Promise<void> {
  const user = DEMO_USERS.find((candidate) => candidate.id === userId);
  if (!user) throw new Error("Unknown demonstration account.");
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  })).toString("base64url");
  const value = payload + "." + signature(payload);
  const store = await cookies();
  store.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function clearDemoSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getCurrentDemoUser(): Promise<DemoUser | null> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return null;
  const [payload, suppliedSignature, extra] = value.split(".");
  if (!payload || !suppliedSignature || extra) return null;
  let expected: string;
  try {
    expected = signature(payload);
  } catch {
    return null;
  }
  const supplied = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expected);
  if (supplied.length !== expectedBuffer.length || !timingSafeEqual(supplied, expectedBuffer)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { sub?: string; exp?: number };
    if (!session.sub || !session.exp || session.exp <= Math.floor(Date.now() / 1000)) return null;
    return DEMO_USERS.find((user) => user.id === session.sub) ?? null;
  } catch {
    return null;
  }
}
