import test from "node:test";
import assert from "node:assert/strict";
import { canAccessWorkspace, hasWorkspaceCapability } from "./access.mjs";

const recordsOfficer = { memberships: [{ workspaceId: "coastal-demo", role: "records_officer" }] };
const reviewer = { memberships: [{ workspaceId: "forest-demo", role: "community_reviewer" }] };
const auditor = { memberships: [
  { workspaceId: "coastal-demo", role: "read_only_auditor" },
  { workspaceId: "forest-demo", role: "read_only_auditor" },
] };

test("a member can access an explicitly assigned workspace", () => {
  assert.equal(canAccessWorkspace(recordsOfficer, "coastal-demo"), true);
});
test("a member cannot access a workspace without membership", () => {
  assert.equal(canAccessWorkspace(recordsOfficer, "forest-demo"), false);
});
test("an auditor can access each explicitly assigned workspace", () => {
  assert.equal(canAccessWorkspace(auditor, "coastal-demo"), true);
  assert.equal(canAccessWorkspace(auditor, "forest-demo"), true);
});
test("unknown workspace is denied by default", () => {
  assert.equal(canAccessWorkspace(recordsOfficer, "unknown-workspace"), false);
});
test("records officers can manage records but not workspace settings", () => {
  assert.equal(hasWorkspaceCapability(recordsOfficer, "coastal-demo", "manage_records"), true);
  assert.equal(hasWorkspaceCapability(recordsOfficer, "coastal-demo", "manage_workspace"), false);
});
test("community reviewers can review but not manage records", () => {
  assert.equal(hasWorkspaceCapability(reviewer, "forest-demo", "review_records"), true);
  assert.equal(hasWorkspaceCapability(reviewer, "forest-demo", "manage_records"), false);
});
test("read-only auditors can view audit information but cannot change records", () => {
  assert.equal(hasWorkspaceCapability(auditor, "coastal-demo", "view_audit"), true);
  assert.equal(hasWorkspaceCapability(auditor, "coastal-demo", "manage_records"), false);
});
test("capabilities are denied when membership is absent", () => {
  assert.equal(hasWorkspaceCapability(recordsOfficer, "forest-demo", "view_workspace"), false);
});
