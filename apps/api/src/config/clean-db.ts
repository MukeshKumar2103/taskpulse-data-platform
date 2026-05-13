import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
  host: process.env.CLEAN_DB_HOST,
  port: Number(process.env.CLEAN_DB_PORT),
  database: process.env.CLEAN_DB_NAME,
  user: process.env.CLEAN_DB_USER,
  password: process.env.CLEAN_DB_PASSWORD,
});

export const cleanDb = drizzle(pool);
