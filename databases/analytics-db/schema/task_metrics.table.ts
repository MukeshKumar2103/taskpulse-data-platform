import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const taskMetrics = pgTable(
  "task_metrics",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    taskId: varchar("task_id", { length: 26 }).notNull(),

    totalSubtasks: integer("total_subtasks").notNull(),

    completedSubtasks: integer("completed_subtasks").notNull(),

    inProgressSubtasks: integer("in_progress_subtasks").notNull(),

    completionRate: decimal("completion_rate", {
      precision: 5,
      scale: 2,
    }).notNull(),

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
    uniqueIndex("task_metrics_task_unique").on(table.taskId),

    index("task_metrics_task_idx").on(table.taskId),
  ],
);
