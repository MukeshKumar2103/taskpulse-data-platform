import {
  pgTable,
  bigserial,
  text,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const rawEvents = pgTable(
  "raw_events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),

    eventType: text("event_type").notNull(),

    eventPayload: jsonb("event_payload").notNull(),

    source: text("source").default("generator_service"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("raw_events_type_idx").on(table.eventType),
    index("raw_events_created_at_idx").on(table.createdAt),
  ],
);
