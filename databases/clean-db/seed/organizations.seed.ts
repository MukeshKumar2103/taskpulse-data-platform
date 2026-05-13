import { cleanDb } from "../../../apps/api/src/config/clean-db";

import { organizations } from "../schema";

import { ORGANIZATIONS } from "./data/organizations.data";

export async function seedOrganizations() {
  console.log("🏢 Seeding organizations...");

  await cleanDb.insert(organizations).values(ORGANIZATIONS);

  console.log(`✅ Inserted ${ORGANIZATIONS.length} organizations`);
}
