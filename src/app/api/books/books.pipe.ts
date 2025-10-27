import { z } from "zod";

export const MaterialTypeEnum = z.enum(
  ["Livro", "TCC", "Revista", "Periódico", "Outro"],
  "Tipo de material inválido. Opções: Livro, TCC, Revista, Periódico, Outro."
);

export const AquisitionMethodEnum = z.enum(
  ["compra", "doação", "permuta"],
  "Método de aquisição inválido. Opções: Compra, Doação, Permuta."
);

export const getBooksSchemaQuery = z.object({
  limit: z.coerce.number("Limite precisa ser um número").max(500, "Limite máximo de 500.").optional().default(50),
  page: z.coerce.number("Página precisa ser um número.").min(1).optional().default(1),
});

export const createBookSchema = z.object({
  title: z
    .string("O Título é obrigatório.")
    .min(1, "O Título deve ter pelo menos 3 caracteres.")
    .max(255, "O Título deve ter no máximo 255 caracteres.")
    .toLowerCase(),
  authorName: z
    .string("O Nome do Autor/Autores é obrigatório.")
    .min(3, "O Nome do Autor deve ter pelo menos 3 caracteres.")
    .max(255, "O Nome do Autor deve ter no máximo 255 caracteres.")
    .toLowerCase(),
  publisher: z
    .string("A Editora é obrigatória.")
    .min(3, "A Editora deve ter pelo menos 3 caracteres.")
    .max(100, "A Editora deve ter no máximo 100 caracteres.")
    .toLowerCase(),
  quantity: z.string("A Quantidade em estoque é obrigatória.").regex(/^\d+$/).optional(),
  materialType: MaterialTypeEnum,
  aquisitionMethod: AquisitionMethodEnum,
  pagesQuantity: z.string("A Quantidade de Páginas deve ser um número inteiro.").regex(/^\d+$/).optional(),
  genre: z.string().max(30, "O Gênero deve ter no máximo 30 caracteres.").toLowerCase(),
  isbn: z.string().max(60, "O ISBN deve ter no máximo 60 caracteres.").optional(),
  cddOrCdu: z.string().max(60, "O campo CDD ou CDU deve ter no máximo 60 caracteres.").optional(),
  tombo: z.string().max(60, "O campo Tombo deve ter no máximo 60 caracteres.").optional(),
  edition: z.string().max(50, "A Edição deve ter no máximo 50 caracteres.").optional(),
});

