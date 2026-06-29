import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { workspaceMembers } from "../schema";

import { WORKSPACE_MEMBERS } from "./data/workspace-members.data";

export async function seedWorkspaceMembers() {
  console.log("👥 Seeding workspace members...");

  await cleanDb.insert(workspaceMembers).values(WORKSPACE_MEMBERS);

  console.log(`✅ Inserted ${WORKSPACE_MEMBERS.length} workspace members`);
}
