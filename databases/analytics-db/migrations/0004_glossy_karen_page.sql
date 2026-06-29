CREATE TABLE "task_metrics" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"task_id" varchar(26) NOT NULL,
	"total_subtasks" integer NOT NULL,
	"completed_subtasks" integer NOT NULL,
	"in_progress_subtasks" integer NOT NULL,
	"completion_rate" numeric(5, 2) NOT NULL,
	"estimated_hours" numeric(10, 2),
	"actual_hours" numeric(10, 2),
	"calculated_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "task_status_metrics" CASCADE;--> statement-breakpoint
CREATE UNIQUE INDEX "task_metrics_task_unique" ON "task_metrics" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX "task_metrics_task_idx" ON "task_metrics" USING btree ("task_id");