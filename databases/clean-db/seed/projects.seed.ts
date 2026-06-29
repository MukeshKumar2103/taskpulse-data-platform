import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { projects } from "../schema";
import { PROJECTS } from "./data/projects.data";

export async function seedProjects() {
  console.log("📁 Seeding projects...");

  await cleanDb.insert(projects).values(PROJECTS);

  console.log(`✅ Inserted ${PROJECTS.length} projects`);
}
