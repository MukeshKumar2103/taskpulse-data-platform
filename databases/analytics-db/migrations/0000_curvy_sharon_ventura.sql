CREATE TABLE "daily_platform_metrics" (
	"metric_date" date PRIMARY KEY NOT NULL,
	"total_users" integer NOT NULL,
	"total_workspaces" integer NOT NULL,
	"total_projects" integer NOT NULL,
	"total_tasks" integer NOT NULL,
	"completed_tasks" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_productivity_metrics" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"user_id" varchar(26) NOT NULL,
	"workspace_id" varchar(26) NOT NULL,
	"completed_tasks" integer NOT NULL,
	"active_tasks" integer NOT NULL,
	"overdue_tasks" integer NOT NULL,
	"productivity_score" numeric(5, 2) NOT NULL,
	"calculated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace_efficiency_metrics" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"workspace_id" varchar(26) NOT NULL,
	"total_tasks" integer NOT NULL,
	"completed_tasks" integer NOT NULL,
	"active_members" integer NOT NULL,
	"completion_rate" numeric(5, 2) NOT NULL,
	"avg_completion_hours" numeric(10, 2),
	"calculated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task_status_metrics" (
	"todo_tasks" integer NOT NULL,
	"in_progress_tasks" integer NOT NULL,
	"completed_tasks" integer NOT NULL,
	"overdue_tasks" integer NOT NULL,
	"calculated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_performance_metrics" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"project_id" varchar(26) NOT NULL,
	"total_tasks" integer NOT NULL,
	"completed_tasks" integer NOT NULL,
	"completion_percentage" numeric(5, 2) NOT NULL,
	"velocity_score" numeric(10, 2),
	"calculated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "worker_job_runs" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"job_name" varchar(100) NOT NULL,
	"status" varchar(20) NOT NULL,
	"processed_records" integer DEFAULT 0,
	"error_message" text,
	"started_at" timestamp NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE INDEX "user_productivity_user_idx" ON "user_productivity_metrics" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_productivity_workspace_idx" ON "user_productivity_metrics" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "workspace_efficiency_workspace_idx" ON "workspace_efficiency_metrics" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "project_performance_project_idx" ON "project_performance_metrics" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "worker_job_runs_job_idx" ON "worker_job_runs" USING btree ("job_name");--> statement-breakpoint
CREATE INDEX "worker_job_runs_status_idx" ON "worker_job_runs" USING btree ("status");