import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { tasks } from "../schema";

import { TASKS } from "./data/tasks.data";

export async function seedTasks() {
  console.log("📝 Seeding tasks...");

  await cleanDb.insert(tasks).values(TASKS);

  console.log(`✅ Inserted ${TASKS.length} tasks`);
}
