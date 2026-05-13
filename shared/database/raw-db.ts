import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
  host: process.env.RAW_DB_HOST,
  port: Number(process.env.RAW_DB_PORT),
  database: process.env.RAW_DB_NAME,
  user: process.env.RAW_DB_USER,
  password: process.env.RAW_DB_PASSWORD,
});

export const rawDb = drizzle(pool);
