import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const workspaceEfficiencyMetrics = pgTable(
  "workspace_efficiency_metrics",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    workspaceId: varchar("workspace_id", { length: 26 }).notNull(),

    totalTasks: integer("total_tasks").notNull(),

    completedTasks: integer("completed_tasks").notNull(),

    activeMembers: integer("active_members").notNull(),

    completionRate: decimal("completion_rate", {
      precision: 5,
      scale: 2,
    }).notNull(),

    avgCompletionHours: decimal("avg_completion_hours", {
      precision: 10,
      scale: 2,
    }),

    calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
  },
  (table) => [
    index("workspace_efficiency_workspace_idx").on(table.workspaceId),
  ],
);
