import { bookLoans } from '@/config/db/tables/book-loans.table';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import z from 'zod';
import { checkCredibilitySchema, createBookLoanSchema, getBookLoansSchemaQuery } from './book-loans.pipe';

export type BookLoansInsertDTO = InferInsertModel<typeof bookLoans>;

export type BookLoansSelectDTO = InferSelectModel<typeof bookLoans>;

export type BookLoansCreateDTO = z.infer<typeof createBookLoanSchema>;

export type GetBookLoansDTO = z.infer<typeof getBookLoansSchemaQuery>;

export type BookLoansWithDetailsDTO = BookLoansSelectDTO & {
  bookTitle: string;
  bookAuthor: string;
  courseGradeLevel: string;
  courseName: string;
  status: 'ACTIVE' | 'RETURNED' | 'LATE';
};

export type CheckCredibilityDTO = z.infer<typeof checkCredibilitySchema>;

export type EditBookLoanDTO = Partial<BookLoansInsertDTO>;
