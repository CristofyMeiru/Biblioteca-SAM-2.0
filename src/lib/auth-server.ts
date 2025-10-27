import { db } from "@/config/db/db-client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPluggin } from "better-auth/plugins";
import { SSR_ENV } from "./env-server";

const authServer = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [adminPluggin()],
  secret: SSR_ENV.JWT_SECRET,
});

export default authServer