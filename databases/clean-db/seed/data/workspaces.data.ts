import { ulid } from "ulid";

import { ORGANIZATIONS } from "./organizations.data";

export const WORKSPACES = [
  {
    id: ulid(),

    organizationId: ORGANIZATIONS[0].id,

    name: "Engineering",

    slug: "engineering",

    createdAt: new Date(),

    updatedAt: new Date(),
  },

  {
    id: ulid(),

    organizationId: ORGANIZATIONS[0].id,

    name: "Marketing",

    slug: "marketing",

    createdAt: new Date(),

    updatedAt: new Date(),
  },

  {
    id: ulid(),

    organizationId: ORGANIZATIONS[1].id,

    name: "Analytics",

    slug: "analytics",

    createdAt: new Date(),

    updatedAt: new Date(),
  },
];
