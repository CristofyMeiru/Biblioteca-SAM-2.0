import { db } from '@/config/db/db-client';
import * as schemas from '@/config/db/tables/auth.table';
import { APIError, betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin as adminPluggin, createAuthMiddleware } from 'better-auth/plugins';
import { ac, admin, user } from './auth/permissions';
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
        admin,
        user,
      },
      adminRoles: ['admin'],
    }),
  ],
  secret: SSR_ENV.JWT_SECRET,
  session: {
    disableSessionRefresh: true,
    expiresIn: 60 * 60 * 8, // 8 horas
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path == '/sign-up/email') {
        throw new APIError('FORBIDDEN', {
          message: 'Unauthorized',
        });
      }
    }),
  }
});

export default authServer;
