import { AppError, ErrorType } from '@/common/resolvers/app-error';
import { db } from '@/config/db/db-client';
import { bookLoans } from '@/config/db/tables/book-loans.table';
import { booksTable } from '@/config/db/tables/books.tables';
import { coursesTable } from '@/config/db/tables/courses.table';
import { and, eq, sql } from 'drizzle-orm';
import { BookLoansInsertDTO, BookLoansSelectDTO, BookLoansWithDetailsDTO } from './book-loans.dto';

export async function create(data: BookLoansInsertDTO): Promise<BookLoansSelectDTO> {
  try {
    const [result] = await db.insert(bookLoans).values(data).returning();

    return result;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new AppError('Não foi possível criar o empréstimo.', ErrorType.INTERNAL_SERVER_ERROR);
  }
}

export async function find(
  fields: Partial<BookLoansSelectDTO>,
  options?: { offset?: number; limit?: number }
): Promise<BookLoansWithDetailsDTO[]> {
  try {
    const allowedFilters: Partial<Record<keyof typeof bookLoans, any>> = {
      id: bookLoans.id,
      fullname: bookLoans.fullname,
      rollNumber: bookLoans.rollNumber,
      courseId: bookLoans.courseId,
      bookId: bookLoans.bookId,
      loanDate: bookLoans.loanDate,
      dueDate: bookLoans.dueDate,
      returnDate: bookLoans.returnDate,
      status: bookLoans.status,
    };

    const conditions = Object.entries(fields).flatMap(([key, value]) => {
      const column = allowedFilters[key as keyof typeof allowedFilters];
      if (column && value !== undefined) return [eq(column, value)];
      return [];
    });

    let query: any = db
      .select({
        id: bookLoans.id,
        fullname: bookLoans.fullname,
        rollNumber: bookLoans.rollNumber,
        courseId: bookLoans.courseId,
        bookId: bookLoans.bookId,
        loanDate: bookLoans.loanDate,
        dueDate: bookLoans.dueDate,
        returnDate: bookLoans.returnDate,
        status: bookLoans.status,
        createdAt: bookLoans.createdAt,
        updatedAt: bookLoans.updatedAt,
        bookTitle: booksTable.title,
        bookAuthor: booksTable.authorName,
        courseGradeLevel: coursesTable.gradeLevel,
        courseName: coursesTable.name,
      })
      .from(bookLoans)
      .leftJoin(booksTable, eq(bookLoans.bookId, booksTable.id))
      .leftJoin(coursesTable, eq(bookLoans.courseId, coursesTable.id));

    if (conditions.length) query = query.where(and(...conditions));
    if (options?.limit) query = query.limit(options.limit);
    if (options?.offset) query = query.offset(options.offset);

    return await query;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new AppError('Não foi possível efetuar a busca.', ErrorType.INTERNAL_SERVER_ERROR);
  }
}

export async function findOne(
  fields: Partial<Omit<BookLoansSelectDTO, 'createdAt' | 'updatedAt'>>
): Promise<BookLoansSelectDTO | null> {
  try {
    const allowedFilters: Partial<Record<keyof typeof bookLoans, any>> = {
      id: bookLoans.id,
      fullname: bookLoans.fullname,
      rollNumber: bookLoans.rollNumber,
      courseId: bookLoans.courseId,
      bookId: bookLoans.bookId,
      loanDate: bookLoans.loanDate,
      dueDate: bookLoans.dueDate,
      returnDate: bookLoans.returnDate,
      status: bookLoans.status,
    };

    const conditions = Object.entries(fields).flatMap(([key, value]) => {
      const column = allowedFilters[key as keyof typeof allowedFilters];

      if (column && value !== undefined) {
        return [eq(column, value)];
      }

      return [];
    });

    const result = await db
      .select()
      .from(bookLoans)
      .where(and(...conditions))
      .then(([res]) => res);

    return result;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new AppError('Não foi possível efetuar a busca.', ErrorType.INTERNAL_SERVER_ERROR);
  }
}

export async function count(fields: Partial<BookLoansSelectDTO>): Promise<number> {
  try {
    const allowedFilters: Partial<Record<keyof typeof bookLoans, any>> = {
      id: bookLoans.id,
      fullname: bookLoans.fullname,
      rollNumber: bookLoans.rollNumber,
      courseId: bookLoans.courseId,
      bookId: bookLoans.bookId,
      loanDate: bookLoans.loanDate,
      dueDate: bookLoans.dueDate,
      returnDate: bookLoans.returnDate,
      status: bookLoans.status,
    };

    const conditions = Object.entries(fields).flatMap(([key, value]) => {
      const column = allowedFilters[key as keyof typeof allowedFilters];

      if (column && value !== undefined) {
        return [eq(column, value)];
      }

      return [];
    });

    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(bookLoans)
      .where(and(...conditions));

    return result.count;
  } catch (error) {
    throw error;
  }
}

export async function search(
  query: string,
  options: { offset?: number; limit?: number } = {}
): Promise<BookLoansWithDetailsDTO[]> {
  try {
    const offset = options.offset ?? 0;
    const limit = options.limit ?? 20;

    const result = await db.execute<BookLoansWithDetailsDTO>(sql`
      SELECT
        bl.id,
        bl.fullname,
        bl.roll_number AS "rollNumber",
        bl.course_id AS "courseId",
        bl.book_id AS "bookId",
        bl.due_date AS "dueDate",
        bl.loan_date AS "loanDate",
        bl.return_date AS "returnDate",
        bl.status,
        bl.created_at AS "createdAt",
        bl.updated_at AS "updatedAt",
        b.title AS "bookTitle",
        b.author_name AS "bookAuthor",
        c.grade_level AS "courseGradeLevel",
        c.name AS "courseName"
      FROM book_loans bl
      LEFT JOIN books b ON bl.book_id = b.id
      LEFT JOIN courses c ON bl.course_id = c.id
      WHERE
        bl.fullname % ${query}
        OR bl.roll_number::text % ${query}
        OR b.title % ${query}
      ORDER BY
        greatest(
          similarity(bl.fullname, ${query}),
          similarity(bl.roll_number::text, ${query}),
          similarity(b.title, ${query})
        ) DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `);

    return result.rows;
  } catch (error) {
    throw error;
  }
}
