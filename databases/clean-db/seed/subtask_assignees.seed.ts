import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { subtaskAssignees } from "../schema";

import { SUBTASK_ASSIGNEES } from "./data/subtask_assignees.data";

export async function seedSubtaskAssignees() {
  console.log("👥 Seeding subtask assignees...");

  await cleanDb.insert(subtaskAssignees).values(SUBTASK_ASSIGNEES);

  console.log(`✅ Inserted ${SUBTASK_ASSIGNEES.length} subtask assignees`);
}
