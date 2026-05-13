import { pgTable, integer, date } from "drizzle-orm/pg-core";

export const dailyPlatformMetrics = pgTable("daily_platform_metrics", {
  metricDate: date("metric_date").primaryKey(),

  totalUsers: integer("total_users").notNull(),

  totalWorkspaces: integer("total_workspaces").notNull(),

  totalProjects: integer("total_projects").notNull(),

  totalTasks: integer("total_tasks").notNull(),

  completedTasks: integer("completed_tasks").notNull(),
});
