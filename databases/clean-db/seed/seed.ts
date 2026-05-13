import "dotenv/config";

import { seedOrganizations } from "./organizations.seed";
import { seedWorkspaces } from "./workspaces.seed";
import { seedWorkspaceMembers } from "./workspace-members.seed";
import { seedUsers } from "./users.seed";
import { seedProjects } from "./projects.seed";
import { seedTasks } from "./tasks.seed";
import { seedSubtasks } from "./subtasks.seed";

async function main() {
  console.log("🚀 Starting clean DB seed...");

  await seedUsers();

  await seedOrganizations();

  await seedWorkspaces();

  await seedWorkspaceMembers();

  await seedProjects();

  await seedTasks();

  await seedSubtasks();

  console.log("🎉 All clean tables seeded");
}

main().catch((err) => {
  console.error("❌ Seed failed");

  console.error(err);

  process.exit(1);
});
