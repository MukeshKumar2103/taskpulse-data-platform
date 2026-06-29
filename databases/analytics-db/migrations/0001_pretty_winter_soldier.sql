CREATE TABLE "workspace_productivity_metrics" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"workspace_id" varchar(26) NOT NULL,
	"total_tasks" integer NOT NULL,
	"completed_tasks" integer NOT NULL,
	"in_progress_tasks" integer NOT NULL,
	"completion_rate" numeric(5, 2) NOT NULL,
	"avg_completion_hours" numeric(10, 2),
	"avg_task_duration_hours" numeric(10, 2),
	"total_estimated_hours" numeric(10, 2),
	"total_actual_hours" numeric(10, 2),
	"calculated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "workspace_productivity_workspace_idx" ON "workspace_productivity_metrics" USING btree ("workspace_id");