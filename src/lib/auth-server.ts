import { dbClient } from "@/config/db/db-client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPluggin } from "better-auth/plugins";
import { SSR_ENV } from "./env-server";

export const authServer = betterAuth({
  database: drizzleAdapter(dbClient, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [adminPluggin()],
  secret: SSR_ENV.JWT_SECRET,
});
