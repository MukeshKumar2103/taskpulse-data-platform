import { sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  boolean,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { workspaces } from "./workspaces.table";
import { users } from "../identity/users.table";

/**
 * Workspace membership
 * - roleId is REQUIRED (workspace-level RBAC)
 * - status supports invite flow + suspensions
 */
export const workspaceMembers = pgTable(
  "workspace_members",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    workspaceId: varchar("workspace_id", { length: 26 })
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),

    userId: varchar("user_id", { length: 26 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // pending | active | suspended
    status: varchar("status", { length: 16 }).notNull().default("pending"),

    invitedBy: varchar("invited_by", { length: 26 }).references(
      () => users.id,
      {
        onDelete: "set null",
      },
    ),
    invitedAt: timestamp("invited_at"),
    joinedAt: timestamp("joined_at"),

    // For audit + future checks
    lastActiveAt: timestamp("last_active_at"),

    isActive: boolean("is_active").default(true).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => {
    return [
      index("workspace_members_workspace_idx").on(table.workspaceId),
      index("workspace_members_user_idx").on(table.userId),
      uniqueIndex("workspace_members_unique_idx").on(
        table.workspaceId,
        table.userId,
      ),
    ];
  },
);
