import { sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 26 }).primaryKey(),

    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),

    email: text("email").notNull(),

    passwordHash: text("password_hash").notNull(),

    status: varchar("status", { length: 20 }).notNull().default("active"), // active|suspended|pending

    emailVerified: boolean("email_verified").notNull().default(false),
    emailVerifiedAt: timestamp("email_verified_at"),

    avatarUrl: text("avatar_url"),
    phoneNumber: varchar("phone_number", { length: 20 }),
    bio: text("bio"),

    tokenVersion: integer("token_version").notNull().default(0),

    failedLoginAttempts: integer("failed_login_attempts").notNull().default(0),
    lockedUntil: timestamp("locked_until"),

    lastLoginAt: timestamp("last_login_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    uniqueIndex("users_email_unique_idx").on(table.email),
    index("users_deleted_at_idx").on(table.deletedAt),
    index("users_locked_until_idx").on(table.lockedUntil),
    index("users_updated_at_idx").on(table.updatedAt),
  ],
);
