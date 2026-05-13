import { pgTable, integer, timestamp } from "drizzle-orm/pg-core";

export const taskStatusMetrics = pgTable("task_status_metrics", {
  todoTasks: integer("todo_tasks").notNull(),

  inProgressTasks: integer("in_progress_tasks").notNull(),

  completedTasks: integer("completed_tasks").notNull(),

  overdueTasks: integer("overdue_tasks").notNull(),

  calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
});
