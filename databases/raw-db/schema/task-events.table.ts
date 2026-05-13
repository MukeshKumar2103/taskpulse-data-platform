import {
  pgTable,
  bigserial,
  varchar,
  text,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const taskEvents = pgTable(
  "task_events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),

    taskId: varchar("task_id", { length: 26 }).notNull(),

    workspaceId: varchar("workspace_id", { length: 26 }).notNull(),

    userId: varchar("user_id", { length: 26 }),

    eventType: text("event_type").notNull(),

    oldStatus: text("old_status"),
    newStatus: text("new_status"),

    payload: jsonb("payload"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("task_events_task_idx").on(table.taskId),
    index("task_events_workspace_idx").on(table.workspaceId),
    index("task_events_type_idx").on(table.eventType),
    index("task_events_created_at_idx").on(table.createdAt),
  ],
);
