import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

import { WORKSPACES } from "./workspaces.data";
import { USERS } from "./users.data";

faker.seed(12345);

export const PROJECTS = Array.from({ length: 20 }).map((_, index) => ({
  id: ulid(),

  workspaceId: WORKSPACES[index % WORKSPACES.length].id,

  name: faker.commerce.productName(),

  slug: faker.lorem.slug(),

  description: faker.lorem.sentence(),

  status: "active",

  createdBy: USERS[index % USERS.length].id,

  createdAt: new Date(),

  updatedAt: new Date(),
}));
