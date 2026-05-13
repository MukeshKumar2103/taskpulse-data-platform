import { pgTable, varchar, text, timestamp, index } from "drizzle-orm/pg-core";
import { workspaces } from "../workspace/workspaces.table";

export const projects = pgTable(
  "projects",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    workspaceId: varchar("workspace_id", { length: 26 })
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),

    name: text("name").notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),

    status: varchar("status", { length: 20 }).notNull().default("active"), // active|archived|completed

    createdBy: varchar("created_by", { length: 128 }).notNull(),
    updatedBy: varchar("updated_by", { length: 128 }),

    archivedAt: timestamp("archived_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("projects_workspace_id_idx").on(table.workspaceId),
    index("projects_slug_workspace_id_idx").on(table.slug, table.workspaceId),
    index("projects_deleted_at_idx").on(table.deletedAt),
    index("projects_updated_at_idx").on(table.updatedAt),
  ],
);
