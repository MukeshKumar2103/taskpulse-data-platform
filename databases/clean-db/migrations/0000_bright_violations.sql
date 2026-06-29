CREATE TABLE "users" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"email_verified_at" timestamp,
	"avatar_url" text,
	"phone_number" varchar(20),
	"bio" text,
	"token_version" integer DEFAULT 0 NOT NULL,
	"failed_login_attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" varchar(120) NOT NULL,
	"settings" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"workspace_id" varchar(26) NOT NULL,
	"name" text NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_by" varchar(128) NOT NULL,
	"updated_by" varchar(128),
	"archived_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"project_id" varchar(26) NOT NULL,
	"workspace_id" varchar(26) NOT NULL,
	"organization_id" varchar(26) NOT NULL,
	"created_by_id" varchar(26),
	"title" text NOT NULL,
	"description" text,
	"status" varchar(20) DEFAULT 'todo' NOT NULL,
	"priority" varchar(20) DEFAULT 'medium' NOT NULL,
	"task_type" varchar(50) DEFAULT 'feature' NOT NULL,
	"estimated_hours" integer,
	"actual_hours" integer,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "task_assignees" (
	"task_id" varchar(26) NOT NULL,
	"user_id" varchar(26) NOT NULL,
	"role" varchar(50) DEFAULT 'owner' NOT NULL,
	"assigned_by_id" varchar(26),
	"assigned_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "task_assignees_task_id_user_id_pk" PRIMARY KEY("task_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "subtasks" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"task_id" varchar(26) NOT NULL,
	"project_id" varchar(26) NOT NULL,
	"workspace_id" varchar(26) NOT NULL,
	"organization_id" varchar(26) NOT NULL,
	"created_by_id" varchar(26),
	"title" text NOT NULL,
	"description" text,
	"status" varchar(20) DEFAULT 'todo' NOT NULL,
	"priority" varchar(20) DEFAULT 'medium' NOT NULL,
	"task_type" varchar(50) DEFAULT 'subtask' NOT NULL,
	"due_at" timestamp,
	"started_at" timestamp,
	"completed_at" timestamp,
	"estimated_hours" integer,
	"actual_hours" integer,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "subtask_assignees" (
	"subtask_id" varchar(26) NOT NULL,
	"user_id" varchar(26) NOT NULL,
	"role" varchar(50) DEFAULT 'owner' NOT NULL,
	"assigned_by_id" varchar(26),
	"assigned_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subtask_assignees_subtask_id_user_id_pk" PRIMARY KEY("subtask_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"organization_id" varchar(26) NOT NULL,
	"name" text NOT NULL,
	"slug" varchar(120) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "workspace_members" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"workspace_id" varchar(26) NOT NULL,
	"user_id" varchar(26) NOT NULL,
	"status" varchar(16) DEFAULT 'pending' NOT NULL,
	"invited_by" varchar(26),
	"invited_at" timestamp,
	"joined_at" timestamp,
	"last_active_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_assigned_by_id_users_id_fk" FOREIGN KEY ("assigned_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtask_assignees" ADD CONSTRAINT "subtask_assignees_subtask_id_subtasks_id_fk" FOREIGN KEY ("subtask_id") REFERENCES "public"."subtasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtask_assignees" ADD CONSTRAINT "subtask_assignees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtask_assignees" ADD CONSTRAINT "subtask_assignees_assigned_by_id_users_id_fk" FOREIGN KEY ("assigned_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_deleted_at_idx" ON "users" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "users_locked_until_idx" ON "users" USING btree ("locked_until");--> statement-breakpoint
CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");--> statement-breakpoint
CREATE UNIQUE INDEX "organizations_slug_unique_idx" ON "organizations" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "organizations_deleted_at_idx" ON "organizations" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "organizations_updated_at_idx" ON "organizations" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "projects_workspace_id_idx" ON "projects" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "projects_slug_workspace_id_idx" ON "projects" USING btree ("slug","workspace_id");--> statement-breakpoint
CREATE INDEX "projects_deleted_at_idx" ON "projects" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "tasks_project_id_idx" ON "tasks" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "tasks_workspace_status_priority_idx" ON "tasks" USING btree ("workspace_id","status","priority");--> statement-breakpoint
CREATE INDEX "tasks_deleted_at_idx" ON "tasks" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "tasks_updated_at_idx" ON "tasks" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "subtasks_task_id_idx" ON "subtasks" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX "subtasks_project_id_idx" ON "subtasks" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "subtasks_workspace_status_priority_idx" ON "subtasks" USING btree ("workspace_id","status","priority");--> statement-breakpoint
CREATE INDEX "subtasks_deleted_at_idx" ON "subtasks" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "subtasks_updated_at_idx" ON "subtasks" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "workspaces_org_idx" ON "workspaces" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "workspace_members_workspace_idx" ON "workspace_members" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "workspace_members_user_idx" ON "workspace_members" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_members_unique_idx" ON "workspace_members" USING btree ("workspace_id","user_id");