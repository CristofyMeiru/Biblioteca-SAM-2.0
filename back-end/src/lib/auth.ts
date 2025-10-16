import { dbClient } from "@/config/db/db-client";
import * as schema from "@/config/db/schemas/auth-schema";
import { env } from "@/config/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, user } from "./permissions";

export const auth = betterAuth({
  database: drizzleAdapter(dbClient, { provider: "pg", schema: schema }),
  trustedOrigins: [env.FRONTEND_URL],
  emailAndPassword: {
    enabled: true,
  },
  secret: env.JWT_SECRET,
  session: {
    disableSessionRefresh: true,
    expiresIn: 60 * 60 * 9, // Ex: 9 horas
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        user,
        admin,
      },
      adminRoles: ["admin"],
    }),
  ],
});

export type Auth = typeof auth;
