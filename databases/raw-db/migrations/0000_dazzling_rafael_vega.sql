CREATE TABLE "raw_events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"event_type" text NOT NULL,
	"event_payload" jsonb NOT NULL,
	"source" text DEFAULT 'generator_service',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task_events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"task_id" varchar(26) NOT NULL,
	"workspace_id" varchar(26) NOT NULL,
	"user_id" varchar(26),
	"event_type" text NOT NULL,
	"old_status" text,
	"new_status" text,
	"payload" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "raw_events_type_idx" ON "raw_events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "raw_events_created_at_idx" ON "raw_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "task_events_task_idx" ON "task_events" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX "task_events_workspace_idx" ON "task_events" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "task_events_type_idx" ON "task_events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "task_events_created_at_idx" ON "task_events" USING btree ("created_at");