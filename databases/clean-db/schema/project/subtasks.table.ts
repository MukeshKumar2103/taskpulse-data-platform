import {
  pgTable,
  varchar,
  text,
  boolean,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";
import { tasks } from "./tasks.table";
import { projects } from "./projects.table";
import { users } from "../identity/users.table";
import { workspaces } from "../workspace/workspaces.table";
import { organizations } from "../organization/organizations.table";

export const subtasks = pgTable(
  "subtasks",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    taskId: varchar("task_id", { length: 26 })
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),

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
    taskType: varchar("task_type", { length: 50 }).notNull().default("subtask"),

    dueAt: timestamp("due_at"),

    startedAt: timestamp("started_at"),

    completedAt: timestamp("completed_at"),

    // =========================================
    // ANALYTICS METRICS
    // =========================================

    estimatedHours: integer("estimated_hours"),

    actualHours: integer("actual_hours"),

    version: integer("version").notNull().default(1),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("subtasks_task_id_idx").on(table.taskId),
    index("subtasks_project_id_idx").on(table.projectId),
    index("subtasks_workspace_status_priority_idx").on(
      table.workspaceId,
      table.status,
      table.priority,
    ),
    index("subtasks_deleted_at_idx").on(table.deletedAt),
    index("subtasks_updated_at_idx").on(table.updatedAt),
  ],
);
