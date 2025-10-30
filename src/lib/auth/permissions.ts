import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements, userAc } from 'better-auth/plugins/admin/access';

const statement = {
  ...defaultStatements,
  users: ['create', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

export const super_admin = ac.newRole({
  ...adminAc.statements,
  user: ['create', 'delete', 'update'],
});

export const user = ac.newRole({
  ...userAc.statements,
  user: [],
});
