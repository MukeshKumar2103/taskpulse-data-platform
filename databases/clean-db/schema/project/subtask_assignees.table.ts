import { pgTable, varchar, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { subtasks } from "./subtasks.table";
import { users } from "../identity/users.table";

export const subtaskAssignees = pgTable(
  "subtask_assignees",
  {
    subtaskId: varchar("subtask_id", { length: 26 })
      .notNull()
      .references(() => subtasks.id, { onDelete: "cascade" }),

    userId: varchar("user_id", { length: 26 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    role: varchar("role", { length: 50 }).notNull().default("owner"), // owner|contributor

    assignedById: varchar("assigned_by_id", { length: 26 }).references(
      () => users.id,
      { onDelete: "set null" },
    ),

    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.subtaskId, table.userId] })],
);
