import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

faker.seed(12345);

export const USERS = Array.from({ length: 50 }).map(() => ({
  id: ulid(),

  firstName: faker.person.firstName(),

  lastName: faker.person.lastName(),

  email: faker.internet.email().toLowerCase(),

  passwordHash: "hashed-password",

  status: "active",

  emailVerified: true,

  tokenVersion: 1,

  createdAt: new Date(),

  updatedAt: new Date(),
}));
