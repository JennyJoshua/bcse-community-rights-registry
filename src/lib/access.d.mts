export type WorkspaceCapability = "view_workspace" | "view_records" | "manage_workspace" | "manage_records" | "review_records" | "view_audit";
type AccessUser = { memberships: { workspaceId: string; role: string }[] };
export function canAccessWorkspace(user: AccessUser, workspaceId: string): boolean;
export function hasWorkspaceCapability(user: AccessUser, workspaceId: string, capability: WorkspaceCapability): boolean;
