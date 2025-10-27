import z from 'zod';

const gradeLevelEnum = z.enum(['1', '2', '3'], 'Informe qual a série do curso.');

export const getCoursesQueryStringSchema = z.object({
  limit: z.coerce.number('Limite precisa ser um número').max(500, 'Limite máximo de 500.').optional().default(50),
  page: z.coerce.number('Página precisa ser um número.').min(1).optional().default(1),
});

export const createCourseSchema = z.object({
  name: z.string().max(255, 'Máximo de 255 caracteres.').toLowerCase(),
  slug: z.string().max(20, 'Máximo de 20 caracteres.'),
  gradeLevel: gradeLevelEnum,
});
