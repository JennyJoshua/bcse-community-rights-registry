import type { DemoUser } from "./demo-auth";
export type WorkspaceCapability = "view_workspace" | "manage_workspace" | "manage_records" | "review_records" | "view_audit";
export function canAccessWorkspace(user: DemoUser, workspaceId: string): boolean;
export function hasWorkspaceCapability(user: DemoUser, workspaceId: string, capability: WorkspaceCapability): boolean;
