import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
  host: process.env.ANALYTICS_DB_HOST,
  port: Number(process.env.ANALYTICS_DB_PORT),
  database: process.env.ANALYTICS_DB_NAME,
  user: process.env.ANALYTICS_DB_USER,
  password: process.env.ANALYTICS_DB_PASSWORD,
});

export const analyticsDb = drizzle(pool);
