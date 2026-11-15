export function canAccessWorkspace(user, workspaceId) {
  return user.memberships.some((membership) => membership.workspaceId === workspaceId);
}
