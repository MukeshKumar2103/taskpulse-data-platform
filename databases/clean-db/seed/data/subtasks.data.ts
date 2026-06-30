import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

import { TASKS } from "./tasks.data";
import { PROJECTS } from "./projects.data";
import { WORKSPACES } from "./workspaces.data";
import { ORGANIZATIONS } from "./organizations.data";
import { USERS } from "./users.data";

faker.seed(12345);

export const SUBTASKS = Array.from({ length: 400 }).map((_, index) => {
  const status = faker.helpers.arrayElement([
    "todo",
    "in_progress",
    "completed",
  ]);

  const createdAt = faker.date.between({
    from: new Date("2025-01-01"),

    to: new Date(),
  });

  const completedAt =
    status === "completed"
      ? faker.date.between({
          from: createdAt,

          to: new Date(),
        })
      : null;

  const updatedAt = faker.date.between({
    from: createdAt,

    to: new Date(),
  });

  return {
    id: ulid(),

    taskId: TASKS[index % TASKS.length].id,

    projectId: PROJECTS[index % PROJECTS.length].id,

    workspaceId: WORKSPACES[index % WORKSPACES.length].id,

    organizationId: ORGANIZATIONS[index % ORGANIZATIONS.length].id,

    createdById: USERS[index % USERS.length].id,

    title: faker.hacker.phrase(),

    description: faker.lorem.sentence(),

    status,

    priority: faker.helpers.arrayElement(["low", "medium", "high"]),

    estimatedHours: faker.number.int({
      min: 1,

      max: 20,
    }),

    actualHours: faker.number.int({
      min: 1,

      max: 30,
    }),

    version: 1,

    createdAt,

    updatedAt,

    completedAt,
  };
});
