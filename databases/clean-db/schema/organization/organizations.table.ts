import { sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export type OrganizationSettings = {
  security?: {
    maxFailedLoginAttempts?: number;
    lockDurationMinutes?: number;
  };
};

export const organizations = pgTable(
  "organizations",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    name: text("name").notNull(),

    slug: varchar("slug", { length: 120 }).notNull(),

    settings: jsonb("settings")
      .$type<OrganizationSettings>()
      .notNull()
      .default({}),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    uniqueIndex("organizations_slug_unique_idx")
      .on(sql`LOWER(${table.slug})`)
      .where(sql`${table.deletedAt} IS NULL`),
    index("organizations_deleted_at_idx").on(table.deletedAt),
    index("organizations_updated_at_idx").on(table.updatedAt),
  ],
);
