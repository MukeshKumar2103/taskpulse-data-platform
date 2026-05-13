import { sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { organizations } from "../organization/organizations.table";

export const workspaces = pgTable(
  "workspaces",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    organizationId: varchar("organization_id", { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    name: text("name").notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),

    description: text("description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("workspaces_org_idx").on(table.organizationId),

    uniqueIndex("workspaces_slug_unique_in_org_idx")
      .on(table.organizationId, sql`LOWER(${table.slug})`)
      .where(sql`${table.deletedAt} IS NULL`),
  ],
);
