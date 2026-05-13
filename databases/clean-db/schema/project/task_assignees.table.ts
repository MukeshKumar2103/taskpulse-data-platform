import { pgTable, varchar, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { tasks } from "./tasks.table";
import { users } from "../identity/users.table";

export const taskAssignees = pgTable(
  "task_assignees",
  {
    taskId: varchar("task_id", { length: 26 })
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),

    userId: varchar("user_id", { length: 26 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    role: varchar("role", { length: 50 }).notNull().default("owner"), // owner|contributor|reviewer|watcher

    assignedById: varchar("assigned_by_id", { length: 26 }).references(
      () => users.id,
      { onDelete: "set null" },
    ),

    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.taskId, table.userId] })],
);
