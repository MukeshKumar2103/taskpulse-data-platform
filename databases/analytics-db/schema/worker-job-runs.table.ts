import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const workerJobRuns = pgTable(
  "worker_job_runs",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    jobName: varchar("job_name", { length: 100 }).notNull(),

    status: varchar("status", { length: 20 }).notNull(),

    processedRecords: integer("processed_records").default(0),

    errorMessage: text("error_message"),

    startedAt: timestamp("started_at").notNull(),

    completedAt: timestamp("completed_at"),
  },
  (table) => [
    index("worker_job_runs_job_idx").on(table.jobName),
    index("worker_job_runs_status_idx").on(table.status),
  ],
);
