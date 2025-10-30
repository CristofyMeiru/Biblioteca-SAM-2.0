import { admin as adminPluggin } from 'better-auth/plugins/admin';
import { createAuthClient } from 'better-auth/react';
import { ac, super_admin, user } from './auth/permissions';
import { CSR_ENV } from './env-client';

export const authClient = createAuthClient({
  baseURL: `${CSR_ENV.BASE_URL}/api/auth`,
  plugins: [
    adminPluggin({
      ac,
      roles: {
        super_admin,
        user,
      },
      defaultRole: "user"
    }),
  ],
});
