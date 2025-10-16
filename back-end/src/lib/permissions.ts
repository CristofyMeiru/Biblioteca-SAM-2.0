import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  book: ["create", "share", "update", "delete", "read"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  book: ["read"],
});

export const admin = ac.newRole({
  book: ["create", "delete", "share", "update"],
  ...adminAc.statements,
});
