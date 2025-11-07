import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { ac, admin, user } from './auth/permissions';
import { CSR_ENV } from './env-client';

export const authClient = createAuthClient({
  baseURL: `${CSR_ENV.BASE_URL}/api/auth`,
  plugins: [adminClient({ ac, roles: { admin, user } })],
});
