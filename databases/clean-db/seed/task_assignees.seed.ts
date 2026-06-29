import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { taskAssignees } from "../schema";

import { TASK_ASSIGNEES } from "./data/task_assignees.data";

export async function seedTaskAssignees() {
  console.log("👥 Seeding task assignees...");

  await cleanDb.insert(taskAssignees).values(TASK_ASSIGNEES);

  console.log(`✅ Inserted ${TASK_ASSIGNEES.length} task assignees`);
}
