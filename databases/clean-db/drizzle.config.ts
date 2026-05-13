import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./databases/clean-db/schema/**/*.ts",

  out: "./databases/clean-db/migrations",

  dialect: "postgresql",

  dbCredentials: {
    host: process.env.CLEAN_DB_HOST!,
    port: Number(process.env.CLEAN_DB_PORT!),
    user: process.env.CLEAN_DB_USER!,
    password: process.env.CLEAN_DB_PASSWORD!,
    database: process.env.CLEAN_DB_NAME!,
    ssl: false,
  },
});
