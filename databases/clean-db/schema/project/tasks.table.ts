import {
  pgTable,
  varchar,
  text,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";
import { projects } from "./projects.table";
import { users } from "../identity/users.table";
import { workspaces } from "../workspace/workspaces.table";
import { organizations } from "../organization/organizations.table";

export const tasks = pgTable(
  "tasks",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    projectId: varchar("project_id", { length: 26 })
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),

    workspaceId: varchar("workspace_id", { length: 26 })
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),

    organizationId: varchar("organization_id", { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    createdById: varchar("created_by_id", { length: 26 }).references(
      () => users.id,
      { onDelete: "set null" },
    ),

    title: text("title").notNull(),
    description: text("description"),

    status: varchar("status", { length: 20 }).notNull().default("todo"), // todo|in_progress|done
    priority: varchar("priority", { length: 20 }).notNull().default("medium"), // low|medium|high
    taskType: varchar("task_type", { length: 50 }).notNull().default("feature"),

    version: integer("version").notNull().default(1),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("tasks_project_id_idx").on(table.projectId),
    index("tasks_workspace_status_priority_idx").on(
      table.workspaceId,
      table.status,
      table.priority,
    ),
    index("tasks_deleted_at_idx").on(table.deletedAt),
    index("tasks_updated_at_idx").on(table.updatedAt),
  ],
);
