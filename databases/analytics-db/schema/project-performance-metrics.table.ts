import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const projectPerformanceMetrics = pgTable(
  "project_performance_metrics",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    projectId: varchar("project_id", { length: 26 }).notNull(),

    totalTasks: integer("total_tasks").notNull(),

    completedTasks: integer("completed_tasks").notNull(),

    completionPercentage: decimal("completion_percentage", {
      precision: 5,
      scale: 2,
    }).notNull(),

    velocityScore: decimal("velocity_score", {
      precision: 10,
      scale: 2,
    }),

    calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
  },
  (table) => [index("project_performance_project_idx").on(table.projectId)],
);
