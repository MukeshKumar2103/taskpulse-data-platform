import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { users } from "../schema";

import { USERS } from "./data/users.data";

export async function seedUsers() {
  console.log("👤 Seeding users...");

  // clear old rows first
  await cleanDb.delete(users);
  await cleanDb.insert(users).values(USERS);

  console.log(`✅ Inserted ${USERS.length} users`);
}
