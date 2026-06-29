import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const workspaceProductivityMetrics = pgTable(
  "workspace_productivity_metrics",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    workspaceId: varchar("workspace_id", { length: 26 }).notNull(),

    totalTasks: integer("total_tasks").notNull(),

    completedTasks: integer("completed_tasks").notNull(),

    inProgressTasks: integer("in_progress_tasks").notNull(),

    completionRate: decimal("completion_rate", {
      precision: 5,
      scale: 2,
    }).notNull(),

    avgCompletionHours: decimal("avg_completion_hours", {
      precision: 10,
      scale: 2,
    }),

    avgTaskDurationHours: decimal("avg_task_duration_hours", {
      precision: 10,
      scale: 2,
    }),

    totalEstimatedHours: decimal("total_estimated_hours", {
      precision: 10,
      scale: 2,
    }),

    totalActualHours: decimal("total_actual_hours", {
      precision: 10,
      scale: 2,
    }),

    calculatedAt: timestamp("calculated_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },

  (table) => [
    uniqueIndex("workspace_productivity_workspace_unique").on(
      table.workspaceId,
    ),

    index("workspace_productivity_workspace_idx").on(table.workspaceId),
  ],
);
