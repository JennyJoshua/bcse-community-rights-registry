const ROLE_CAPABILITIES = {
  platform_administrator: ["view_workspace", "view_records", "manage_workspace", "manage_records", "review_records", "view_audit"],
  workspace_administrator: ["view_workspace", "view_records", "manage_workspace", "manage_records", "review_records", "view_audit"],
  records_officer: ["view_workspace", "view_records", "manage_records"],
  community_reviewer: ["view_workspace", "view_records", "review_records"],
  read_only_auditor: ["view_workspace", "view_records", "view_audit"],
};

export function canAccessWorkspace(user, workspaceId) {
  return user.memberships.some((membership) => membership.workspaceId === workspaceId);
}

export function hasWorkspaceCapability(user, workspaceId, capability) {
  const membership = user.memberships.find((item) => item.workspaceId === workspaceId);
  if (!membership) return false;
  return ROLE_CAPABILITIES[membership.role]?.includes(capability) ?? false;
}
