import { db } from '@/config/db/db-client';
import { coursesTable } from '@/config/db/tables/courses.table';
import { and, eq } from 'drizzle-orm';
import { BookSelectDTO } from '../books/books.dto';
import { CourseInsertDTO, CourseSelectDTO } from './courses.dto';

export async function create(data: CourseInsertDTO): Promise<CourseSelectDTO> {
  try {
    const [result] = await db.insert(coursesTable).values(data).returning();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function find(
  fields: Partial<CourseSelectDTO>,
  options?: { offset?: number; limit?: number }
): Promise<CourseSelectDTO[]> {
  try {
    const allowedFilters: Partial<Record<keyof typeof coursesTable, any>> = {
      id: coursesTable.id,
      name: coursesTable.name,
      slug: coursesTable.slug,
      gradeLevel: coursesTable.gradeLevel,
    };

    const conditions = Object.entries(fields).flatMap(([key, value]) => {
      const column = allowedFilters[key as keyof typeof allowedFilters];
      if (column && value !== undefined) return [eq(column, value)];
      return [];
    });

    let query: any = db.select().from(coursesTable);

    if (conditions.length) query = query.where(and(...conditions));
    if (options?.limit) query = query.limit(options.limit);
    if (options?.offset) query = query.offset(options.offset);

    return await query;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Não foi possível efetuar a busca.');
  }
}

export async function findOne(fields: Partial<CourseSelectDTO>): Promise<CourseSelectDTO | null> {
  try {
    const allowedFilters: Partial<Record<keyof typeof coursesTable, any>> = {
      id: coursesTable.id,
      name: coursesTable.name,
      slug: coursesTable.slug,
      gradeLevel: coursesTable.gradeLevel,
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
      .from(coursesTable)
      .where(and(...conditions))
      .then(([res]) => res);

    return result;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Não foi possivel efetuar a busca.');
  }
}
