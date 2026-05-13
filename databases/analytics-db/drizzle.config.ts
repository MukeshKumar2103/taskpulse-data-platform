import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./databases/analytics-db/schema/**/*",
  out: "./databases/analytics-db/migrations",
  dialect: "postgresql",

  dbCredentials: {
    host: process.env.ANALYTICS_DB_HOST!,
    port: Number(process.env.ANALYTICS_DB_PORT!),
    user: process.env.ANALYTICS_DB_USER!,
    password: process.env.ANALYTICS_DB_PASSWORD!,
    database: process.env.ANALYTICS_DB_NAME!,
    ssl: false,
  },
});
