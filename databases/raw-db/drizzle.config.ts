import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./databases/raw-db/schema/**/*",
  out: "./databases/raw-db/migrations",
  dialect: "postgresql",

  dbCredentials: {
    host: process.env.RAW_DB_HOST!,
    port: Number(process.env.RAW_DB_PORT!),
    user: process.env.RAW_DB_USER!,
    password: process.env.RAW_DB_PASSWORD!,
    database: process.env.RAW_DB_NAME!,
    ssl: false,
  },
});
