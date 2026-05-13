import { ulid } from "ulid";

export const ORGANIZATIONS = [
  {
    id: ulid(),
    name: "DraftViz",
    slug: "draftviz",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: ulid(),
    name: "TaskPulse",
    slug: "taskpulse",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
