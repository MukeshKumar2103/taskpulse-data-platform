import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const userProductivityMetrics = pgTable(
  "user_productivity_metrics",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    userId: varchar("user_id", { length: 26 }).notNull(),

    workspaceId: varchar("workspace_id", { length: 26 }).notNull(),

    completedTasks: integer("completed_tasks").notNull(),

    activeTasks: integer("active_tasks").notNull(),

    overdueTasks: integer("overdue_tasks").notNull(),

    productivityScore: decimal("productivity_score", {
      precision: 5,
      scale: 2,
    }).notNull(),

    calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
  },
  (table) => [
    index("user_productivity_user_idx").on(table.userId),
    index("user_productivity_workspace_idx").on(table.workspaceId),
  ],
);
