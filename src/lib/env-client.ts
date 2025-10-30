import { z } from "zod";

const envSchema = z.object({
  
  BASE_URL: z.url(),  
});

console.log(process.env.NEXT_PUBLIC_BASE_URL);

export const CSR_ENV = envSchema.parse({
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});
