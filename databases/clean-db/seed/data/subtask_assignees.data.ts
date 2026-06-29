import { faker } from "@faker-js/faker";
import { SUBTASKS } from "./subtasks.data";
import { USERS } from "./users.data";
import { WORKSPACES } from "./workspaces.data";
import { WORKSPACE_MEMBERS } from "./workspace-members.data";

faker.seed(12345);

// Build a map of workspaceId to user IDs in that workspace
const workspaceUserMap = new Map<string, string[]>();
WORKSPACE_MEMBERS.forEach((member) => {
  if (!workspaceUserMap.has(member.workspaceId)) {
    workspaceUserMap.set(member.workspaceId, []);
  }
  workspaceUserMap.get(member.workspaceId)!.push(member.userId);
});

// Build a map of workspaceId to workspace admins
const workspaceAdminsMap = new Map<string, string[]>();
WORKSPACE_MEMBERS.forEach((member) => {
  if (member.role === "workspace_admin") {
    if (!workspaceAdminsMap.has(member.workspaceId)) {
      workspaceAdminsMap.set(member.workspaceId, []);
    }
    workspaceAdminsMap.get(member.workspaceId)!.push(member.userId);
  }
});

export const SUBTASK_ASSIGNEES = SUBTASKS.flatMap((subtask, subtaskIndex) => {
  const workspaceUsers = workspaceUserMap.get(subtask.workspaceId) || [];
  const workspaceAdmins = workspaceAdminsMap.get(subtask.workspaceId) || [];

  if (workspaceUsers.length === 0 || workspaceAdmins.length === 0) {
    return [];
  }

  // Randomly determine number of assignees (2-5)
  const numAssignees = faker.number.int({ min: 2, max: 5 });

  // Pick random unique users from workspace
  const selectedUserIds = faker.helpers
    .shuffle(workspaceUsers)
    .slice(0, numAssignees);

  // Create assignee entries
  return selectedUserIds.map((userId, assigneeIndex) => ({
    subtaskId: subtask.id,
    userId,
    role: assigneeIndex === 0 ? "owner" : "contributor",
    assignedById: faker.helpers.arrayElement(workspaceAdmins),
    assignedAt: new Date(
      new Date(subtask.createdAt).getTime() +
        faker.number.int({ min: 0, max: 14 * 24 * 60 * 60 * 1000 }),
    ),
  }));
});
