import z from "zod";
import { AquisitionMethodEnum, MaterialTypeEnum } from "../books.pipe";

export const bookParamsSchema = z.object({
  id: z.uuid("Informe um UUID válido."),
});

export const editBookBodySchema = z
  .object({
    title: z.string().trim().min(1, "Título é obrigatório").max(255, "Máx 255 caracteres").toLowerCase(),
    authorName: z.string().trim().min(3, "Nome do autor é obrigatório").max(255, "Máx 255 caracteres").toLowerCase(),
    publisher: z.string().trim().min(3, "Editora é obrigatória").max(100, "Máx 100 caracteres").toLowerCase(),
    quantity: z.coerce.number().int().min(0, "Quantidade deve ser maior que 0"),
    pagesQuantity: z.coerce.number().int().positive(),
    materialType: MaterialTypeEnum,
    aquisitionMethod: AquisitionMethodEnum,
    genre: z.string().trim().max(30, "Máx 30 caracteres").toLowerCase(),
    isbn: z.string().trim().max(60, "Máx 60 caracteres"),
    cddOrCdu: z.string().trim().max(60, "Máx 60 caracteres"),
    tombo: z.string().trim().max(60, "Máx 60 caracteres"),
    edition: z.string().trim().max(50, "Máx 50 caracteres").toLowerCase(),
  })
  .partial();

export const editBookParamsSchema = z.object({
  id: z.uuid("Informe um UUID válido."),
});
