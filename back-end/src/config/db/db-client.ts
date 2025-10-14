import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../env";

export const dbClient = drizzle(env.DATABASE_URL);