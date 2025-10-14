import z from "zod";

export const authUserSchema = z.object({
  email: z.email("Informe um e-mail válido."),
  password: z
    .string()
    .min(8, "Mínimo de 8 caracteres")
    .max(40, "Máximo de 40 caracteres."),
});

export type AuthUser = z.infer<typeof authUserSchema>;
