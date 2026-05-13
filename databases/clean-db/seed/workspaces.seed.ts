import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { workspaces } from "../schema";

import { WORKSPACES } from "./data/workspaces.data";

export async function seedWorkspaces() {
  console.log("🚀 Seeding workspaces...");

  await cleanDb.insert(workspaces).values(WORKSPACES);

  console.log(`✅ Inserted ${WORKSPACES.length} workspaces`);
}
