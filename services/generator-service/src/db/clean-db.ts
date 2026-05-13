import "dotenv/config";

import pg from "pg";

export const cleanDb = new pg.Pool({
  host: process.env.CLEAN_DB_HOST,
  port: Number(process.env.CLEAN_DB_PORT),
  user: process.env.CLEAN_DB_USER,
  password: process.env.CLEAN_DB_PASSWORD,
  database: process.env.CLEAN_DB_NAME,
});
