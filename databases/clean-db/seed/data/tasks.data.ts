import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

import { PROJECTS } from "./projects.data";
import { WORKSPACES } from "./workspaces.data";
import { ORGANIZATIONS } from "./organizations.data";
import { USERS } from "./users.data";

faker.seed(12345);

export const TASKS = Array.from({ length: 200 }).map((_, index) => {
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

    projectId: PROJECTS[index % PROJECTS.length].id,

    workspaceId: WORKSPACES[index % WORKSPACES.length].id,

    organizationId: ORGANIZATIONS[index % ORGANIZATIONS.length].id,

    createdById: USERS[index % USERS.length].id,

    title: faker.hacker.phrase(),

    description: faker.lorem.paragraph(),

    status,

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

    createdAt,

    updatedAt,

    completedAt,
  };
});
