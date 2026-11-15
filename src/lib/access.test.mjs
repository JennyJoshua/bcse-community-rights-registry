import test from "node:test";
import assert from "node:assert/strict";
import { canAccessWorkspace } from "./access.mjs";

const recordsOfficer = { memberships: [{ workspaceId: "coastal-demo", role: "records_officer" }] };
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
