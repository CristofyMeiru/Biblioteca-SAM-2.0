import { SSR_ENV } from "@/lib/env-server";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(SSR_ENV.DATABASE_URL);
