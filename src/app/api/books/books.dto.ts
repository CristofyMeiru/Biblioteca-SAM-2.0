import { booksTable } from '@/config/db/tables/books.tables';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import z from 'zod';
import { bookParamsSchema, createBookSchema, editBookBodySchema, getBooksSchemaQuery } from './books.pipe';

export type BookInsertDTO = InferInsertModel<typeof booksTable>;

export type BookSelectDTO = InferSelectModel<typeof booksTable>;

export type CreateBookDTO = z.infer<typeof createBookSchema>;

export type GetBooksDTO = z.infer<typeof getBooksSchemaQuery>;

export type BookParamsDTO = z.infer<typeof bookParamsSchema>;

export type EditBookDTO = z.infer<typeof editBookBodySchema>;
