import z from "zod";
import { bookParamsSchema, editBookBodySchema } from "./book.pipe";

export type BookParamsDTO = z.infer<typeof bookParamsSchema>;

export type EditBookDTO = z.infer<typeof editBookBodySchema>;
