import { unique } from "drizzle-orm/pg-core";
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

    totalAssignedTasks: integer("total_assigned_tasks").notNull(),

    completedTasks: integer("completed_tasks").notNull(),

    completionRate: integer("completion_rate").notNull(),

    totalEstimatedHours: integer("total_estimated_hours").notNull(),

    totalActualHours: integer("total_actual_hours").notNull(),

    averageTaskDurationHours: integer("average_task_duration_hours").notNull(),

    calculatedAt: timestamp("calculated_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("user_productivity_user_idx").on(table.userId),
    index("user_productivity_workspace_idx").on(table.workspaceId),
    unique("user_productivity_user_workspace_unique").on(
      table.userId,
      table.workspaceId,
    ),
  ],
);
