import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

import { PROJECTS } from "./projects.data";
import { WORKSPACES } from "./workspaces.data";
import { ORGANIZATIONS } from "./organizations.data";
import { USERS } from "./users.data";

faker.seed(12345);

export const TASKS = Array.from({ length: 100 }).map((_, index) => ({
  id: ulid(),

  projectId: PROJECTS[index % PROJECTS.length].id,

  workspaceId: WORKSPACES[index % WORKSPACES.length].id,

  organizationId: ORGANIZATIONS[index % ORGANIZATIONS.length].id,

  createdById: USERS[index % USERS.length].id,

  title: faker.hacker.phrase(),

  description: faker.lorem.paragraph(),

  status: faker.helpers.arrayElement(["todo", "in_progress", "completed"]),

  priority: faker.helpers.arrayElement(["low", "medium", "high"]),

  estimatedHours: faker.number.int({
    min: 1,
    max: 40,
  }),

  actualHours: faker.number.int({
    min: 1,
    max: 50,
  }),

  version: 1,

  createdAt: new Date(),

  updatedAt: new Date(),
}));
