import { ulid } from "ulid";

import { USERS } from "./users.data";
import { WORKSPACES } from "./workspaces.data";

export const WORKSPACE_MEMBERS = USERS.map((user, index) => ({
  id: ulid(),

  workspaceId: WORKSPACES[index % WORKSPACES.length].id,

  userId: user.id,

  role: index === 0 ? "workspace_admin" : "workspace_member",

  status: "active",

  joinedAt: new Date(),

  createdAt: new Date(),

  updatedAt: new Date(),
}));
