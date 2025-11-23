import { integer, pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { booksTable } from './books.tables';
import { coursesTable } from './courses.table';

export const bookLoansStatusEnum = pgEnum('book_loans_status', [
  'ACTIVE',
  'INACTIVE',
  'RETURNED',
  'LATE',
  'CANCELED',
  'LOST',
]);

export const bookLoans = pgTable('book_loans', {
  id: uuid('id').notNull().primaryKey(),
  fullname: varchar('fullname', { length: 255 }).notNull(),
  rollNumber: integer('roll_number').notNull(),
  courseId: uuid('course_id')
    .notNull()
    .references(() => coursesTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  bookId: uuid('book_id')
    .notNull()
    .references(() => booksTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  loanDate: timestamp('loan_date', { mode: 'date' }).defaultNow().notNull(),
  dueDate: timestamp('due_date', { mode: 'date' }).notNull(),
  returnDate: timestamp('return_date', { mode: 'date' }),
  status: bookLoansStatusEnum('status').default('ACTIVE').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
