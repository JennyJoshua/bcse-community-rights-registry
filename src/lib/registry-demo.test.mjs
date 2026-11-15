import test from "node:test";
import assert from "node:assert/strict";
import { listGovernanceRecords, listEvidenceItems, getGovernanceRecord, getEvidenceItem } from "./registry-demo.mjs";
test("governance records are scoped to the requested workspace", () => { const rows = listGovernanceRecords("coastal-demo"); assert.equal(rows.length, 2); assert.ok(rows.every((r) => r.workspaceId === "coastal-demo")); assert.equal(listGovernanceRecords("unknown-workspace").length, 0); });
test("evidence items are scoped to the requested workspace", () => { const rows = listEvidenceItems("forest-demo"); assert.equal(rows.length, 1); assert.ok(rows.every((r) => r.workspaceId === "forest-demo")); assert.equal(listEvidenceItems("unknown-workspace").length, 0); });
test("governance lookup requires both workspace and record identifier", () => { assert.ok(getGovernanceRecord("coastal-demo", "gov-coast-001")); assert.equal(getGovernanceRecord("forest-demo", "gov-coast-001"), null); });
test("evidence lookup requires both workspace and evidence identifier", () => { assert.ok(getEvidenceItem("coastal-demo", "evi-coast-001")); assert.equal(getEvidenceItem("forest-demo", "evi-coast-001"), null); });
test("official-instrument example does not claim authenticity", () => { const item = getEvidenceItem("coastal-demo", "evi-coast-002"); assert.equal(item.reviewStatus, "Authenticity not checked"); assert.match(item.provenanceNote, /no real instrument is reproduced/i); });
test("all sample file labels explicitly state that no file exists", () => { const rows = [...listEvidenceItems("coastal-demo"), ...listEvidenceItems("forest-demo")]; assert.ok(rows.every((r) => r.fileLabel.includes("not an actual file"))); });
