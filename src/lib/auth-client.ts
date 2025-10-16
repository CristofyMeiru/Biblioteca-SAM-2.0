import { createAuthClient } from "better-auth/react";
import { CSR_ENV } from "./env-client";

export const authClient = createAuthClient({
  baseURL: `${CSR_ENV.BASE_URL}/api/auth`,
});
