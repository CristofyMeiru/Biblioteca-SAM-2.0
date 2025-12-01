import z from 'zod';

export const createBookLoanSchema = z
  .object({
    fullname: z
      .string()
      .min(3, 'Nome completo deve ter no mínimo 3 caracteres')
      .max(255, 'Nome completo deve ter no máximo 255 caracteres')
      .toLowerCase(),
    rollNumber: z.coerce.number().int().positive('Matrícula deve ser um número positivo'),
    courseId: z.string().uuid('ID do curso inválido').optional(),
    courseName: z.string().optional(),
    bookId: z.string().uuid('ID do livro inválido'),
    dueDate: z.coerce.date('Data de devolução é obrigatória'),
    loanDate: z.coerce.date().optional(),
    bookTitle: z.string().optional(),
    bookAuthor: z.string().optional(),
    bookGenre: z.string().optional(),
  })
  .refine((data) => data.courseId || data.courseName, {
    message: 'ID do curso ou Nome do curso é obrigatório',
    path: ['courseId'],
  });

export const checkCredibilitySchema = z.object({
  fullname: z
    .string()
    .min(3, 'Nome completo deve ter no mínimo 3 caracteres')
    .max(255, 'Nome completo deve ter no máximo 255 caracteres')
    .toLowerCase(),
  rollNumber: z.coerce.number().int().positive('Matrícula deve ser um número positivo'),
  courseSlug: z.string(),
});

export const getBookLoansSchemaQuery = z.object({
  limit: z.coerce.number('Limite precisa ser um número').max(500, 'Limite máximo de 500.').optional().default(50),
  page: z.coerce.number('Página precisa ser um número.').min(1).optional().default(1),
  status: z.enum(['ACTIVE', 'RETURNED']).optional(),
  search: z.string().optional(),
});

export const countBookLoansSchemaQuery = getBookLoansSchemaQuery.pick({
  status: true,
});

export const editBookLoanBodySchema = createBookLoanSchema.partial();

export const bookLoanParamsSchema = z.object({
  id: z.string().uuid('ID do empréstimo inválido'),
});
