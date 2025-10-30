import { db } from '@/config/db/db-client';
import * as schemas from '@/config/db/tables/auth.table';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin as adminPluggin } from 'better-auth/plugins';
import { ac, super_admin, user } from './auth/permissions';
import { SSR_ENV } from './env-server';

const authServer = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: schemas }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    adminPluggin({
      ac,
      roles: {
        super_admin,
        user,
      },
    }),
  ],
  secret: SSR_ENV.JWT_SECRET,
  session: {
    disableSessionRefresh: true,
  },
});

export default authServer;
