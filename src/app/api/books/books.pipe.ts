import z from 'zod';

export const materialTypeEnum = z.enum(
  ['Livro', 'TCC', 'Revista', 'Periódico', 'Outro', 'livro literatura'],
  'Tipo de material inválido. Opções: Livro, TCC, Revista, Periódico, Outro.'
);
export type MaterialTypeEnum = z.infer<typeof materialTypeEnum>;

export const aquisitionMethodEnum = z.enum(
  ['compra', 'doação', 'permuta', 'pnld'],
  'Método de aquisição inválido. Opções: Compra, Doação, Permuta.'
);
export type AquisitionMethodEnum = z.infer<typeof aquisitionMethodEnum>;

export const getBooksSchemaQuery = z.object({
  limit: z.coerce.number('Limite precisa ser um número').max(500, 'Limite máximo de 500.').optional().default(50),
  page: z.coerce.number('Página precisa ser um número.').min(1).optional().default(1),
  status: z.enum(['unavailable']).optional(),
  search: z.string().optional(),
});

export const createBookSchema = z.object({
  title: z
    .string('O Título é obrigatório.')
    .min(1, 'O Título deve ter pelo menos 3 caracteres.')
    .max(255, 'O Título deve ter no máximo 255 caracteres.')
    .toLowerCase(),
  authorName: z
    .string('O Nome do Autor/Autores é obrigatório.')
    .min(3, 'O Nome do Autor deve ter pelo menos 3 caracteres.')
    .max(255, 'O Nome do Autor deve ter no máximo 255 caracteres.')
    .toLowerCase(),
  publisher: z
    .string('A Editora é obrigatória.')
    .min(3, 'A Editora deve ter pelo menos 3 caracteres.')
    .max(100, 'A Editora deve ter no máximo 100 caracteres.')
    .toLowerCase(),
  quantity: z
    .string('A Quantidade em estoque é obrigatória.')
    .regex(/^\d+$/, 'Informe uma quantidade válida.')
    .optional(),
  materialType: materialTypeEnum.optional(),
  aquisitionMethod: aquisitionMethodEnum.optional(),
  pagesQuantity: z
    .string('A Quantidade de Páginas deve ser um número inteiro.')
    .regex(/^\d+$/, 'Informe uma quantidade de páginas valida.')
    .optional(),
  genre: z.string().max(30, 'O Gênero deve ter no máximo 30 caracteres.').toLowerCase(),
  isbn: z.string().max(60, 'O ISBN deve ter no máximo 60 caracteres.').optional(),
  cddOrCdu: z.string().max(60, 'O campo CDD ou CDU deve ter no máximo 60 caracteres.').optional().nullable(),
  tombo: z.string().max(60, 'O campo Tombo deve ter no máximo 60 caracteres.').optional().nullable(),
  edition: z.string().max(50, 'A Edição deve ter no máximo 50 caracteres.').optional(),
});

export const bookParamsSchema = z.object({
  id: z.uuid('Informe um UUID válido.'),
});

export const editBookBodySchema = z
  .object({
    title: z.string().trim().min(1, 'Título é obrigatório').max(255, 'Máx 255 caracteres').toLowerCase(),
    authorName: z.string().trim().min(3, 'Nome do autor é obrigatório').max(255, 'Máx 255 caracteres').toLowerCase(),
    publisher: z.string().trim().min(3, 'Editora é obrigatória').max(100, 'Máx 100 caracteres').toLowerCase(),
    quantity: z.coerce.number().int().min(0, 'Quantidade deve ser maior que 0'),
    pagesQuantity: z.coerce.number().int().positive(),
    materialType: materialTypeEnum,
    aquisitionMethod: aquisitionMethodEnum,
    genre: z.string().trim().max(30, 'Máx 30 caracteres').toLowerCase(),
    isbn: z.string().trim().max(60, 'Máx 60 caracteres'),
    cddOrCdu: z.string().trim().max(60, 'Máx 60 caracteres'),
    tombo: z.string().trim().max(60, 'Máx 60 caracteres'),
    edition: z.string().trim().max(50, 'Máx 50 caracteres').toLowerCase(),
  })
  .partial();

export const editBookParamsSchema = z.object({
  id: z.uuid('Informe um UUID válido.'),
});
