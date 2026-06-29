import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { subtasks } from "../schema";

import { SUBTASKS } from "./data/subtasks.data";

export async function seedSubtasks() {
  console.log("📎 Seeding subtasks...");

  await cleanDb.insert(subtasks).values(SUBTASKS);

  console.log(`✅ Inserted ${SUBTASKS.length} subtasks`);
}
