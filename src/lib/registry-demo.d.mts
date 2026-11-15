type GovernanceRecord = { id: string; workspaceId: string; reference: string; title: string; category: string; summary: string; sourceType: string; recordStatus: string; reviewStatus: string; dateLabel: string; limitation: string; };
type EvidenceItem = { id: string; workspaceId: string; reference: string; title: string; evidenceType: string; source: string; sourceDate: string; fileLabel: string; classification: string; reviewStatus: string; provenanceNote: string; };
export function listGovernanceRecords(workspaceId: string): GovernanceRecord[];
export function listEvidenceItems(workspaceId: string): EvidenceItem[];
export function getGovernanceRecord(workspaceId: string, recordId: string): GovernanceRecord | null;
export function getEvidenceItem(workspaceId: string, evidenceId: string): EvidenceItem | null;
