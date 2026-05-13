import "dotenv/config";

import pg from "pg";

async function main() {
  const client = new pg.Client({
    host: process.env.CLEAN_DB_HOST,
    port: Number(process.env.CLEAN_DB_PORT),
    user: process.env.CLEAN_DB_USER,
    password: process.env.CLEAN_DB_PASSWORD,
    database: process.env.CLEAN_DB_NAME,
  });

  await client.connect();

  console.log("Connected successfully");

  await client.query(`
    CREATE TABLE test_table (
      id SERIAL PRIMARY KEY
    );
  `);

  console.log("Table created");

  await client.end();
}

main();
