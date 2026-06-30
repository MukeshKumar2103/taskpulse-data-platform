ALTER TABLE "user_productivity_metrics" ADD COLUMN "total_assigned_tasks" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_productivity_metrics" ADD COLUMN "completion_rate" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_productivity_metrics" ADD COLUMN "total_estimated_hours" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_productivity_metrics" ADD COLUMN "total_actual_hours" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_productivity_metrics" ADD COLUMN "average_task_duration_hours" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_productivity_metrics" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "task_metrics" ADD COLUMN "total_estimated_hours" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "task_metrics" ADD COLUMN "total_actual_hours" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "user_productivity_metrics" DROP COLUMN "active_tasks";--> statement-breakpoint
ALTER TABLE "user_productivity_metrics" DROP COLUMN "overdue_tasks";--> statement-breakpoint
ALTER TABLE "user_productivity_metrics" DROP COLUMN "productivity_score";--> statement-breakpoint
ALTER TABLE "task_metrics" DROP COLUMN "estimated_hours";--> statement-breakpoint
ALTER TABLE "task_metrics" DROP COLUMN "actual_hours";