import z from 'zod';

const passwordSchema = z.string().min(8, 'Mínimo de 8 caracteres').max(100, 'Máximod de 100 caracteres.');

export const createUserSchema = z
  .object({
    name: z.string().min(1, 'Mínimo de 1 caracter.').max(255, 'Máximod de 255 caracteres.'),
    email: z.email('Informe um email válido.'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    error: 'Senhas não coincidem.',
    path: ['confirmPassword'],
  });

export const editUserSchema = z.object({
  name: z.string().min(1, 'Mínimo de 1 caracter.').max(255, 'Máximod de 255 caracteres.'),
  email: z.email('Informe um email válido.'),
  role: z.string('Papéis aceitos são: administrador e bibliotécario').optional(),
});

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    error: 'Senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type CreateUser = z.infer<typeof createUserSchema>;
export type EditUser = z.infer<typeof editUserSchema>;
export type NewUserPassword = z.infer<typeof newPasswordSchema>;
