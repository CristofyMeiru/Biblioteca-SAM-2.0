import { BookInsertDTO, BookSelectDTO } from "@/app/api/books/books.dto";
import { AppError } from "@/common/resolvers/app-error";
import { db } from "@/config/db/db-client";
import { booksTable } from "@/config/db/tables/books.tables";
import { and, eq, sql } from "drizzle-orm";
import { EditBookDTO } from "./[id]/book.dto";

export async function create(data: BookInsertDTO): Promise<BookSelectDTO> {
  try {
    const [result] = await db.insert(booksTable).values(data).returning();

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function find(
  fields: Partial<Omit<BookSelectDTO, "createdAt" | "updatedAt">>,
  options?: { offset?: number; limit?: number }
): Promise<BookSelectDTO[]> {
  try {
    const allowedFilters: Partial<Record<keyof typeof booksTable, any>> = {
      id: booksTable.id,
      title: booksTable.title,
      authorName: booksTable.authorName,
      publisher: booksTable.publisher,
      materialType: booksTable.materialType,
      aquisitionMethod: booksTable.aquisitionMethod,
      pagesQuantity: booksTable.pagesQuantity,
      genre: booksTable.genre,
      isbn: booksTable.isbn,
      quantity: booksTable.quantity,
      loanedQuantity: booksTable.loanedQuantity,
      cddOrCdu: booksTable.cddOrCdu,
      tombo: booksTable.tombo,
      edition: booksTable.edition,
    };

    const conditions = Object.entries(fields).flatMap(([key, value]) => {
      const column = allowedFilters[key as keyof typeof allowedFilters];
      if (column && value !== undefined) return [eq(column, value)];
      return [];
    });

    let query: any = db.select().from(booksTable);

    if (conditions.length) query = query.where(and(...conditions));
    if (options?.limit) query = query.limit(options.limit);
    if (options?.offset) query = query.offset(options.offset);

    return await query;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível efetuar a busca.");
  }
}

export async function findOne(
  fields: Partial<Omit<BookSelectDTO, "createdAt" | "updatedAt">>
): Promise<BookSelectDTO | null> {
  try {
    const allowedFilters: Partial<Record<keyof typeof booksTable, any>> = {
      id: booksTable.id,
      title: booksTable.title,
      authorName: booksTable.authorName,
      publisher: booksTable.publisher,
      materialType: booksTable.materialType,
      aquisitionMethod: booksTable.aquisitionMethod,
      pagesQuantity: booksTable.pagesQuantity,
      genre: booksTable.genre,
      isbn: booksTable.isbn,
      quantity: booksTable.quantity,
      loanedQuantity: booksTable.loanedQuantity,
      cddOrCdu: booksTable.cddOrCdu,
      tombo: booksTable.tombo,
      edition: booksTable.edition,
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
      .from(booksTable)
      .where(and(...conditions))
      .then(([res]) => res);

    return result;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Não foi possivel efetuar a busca.");
  }
}

export async function deleteByid(id: string): Promise<BookSelectDTO | null> {
  try {
    const [result] = await db.delete(booksTable).where(eq(booksTable.id, id)).returning();

    return result ?? null;
  } catch (error) {
    throw error;
  }
}

export async function updateById(id: string, fields: EditBookDTO): Promise<BookSelectDTO> {
  try {
    const [updateResult] = await db
      .update(booksTable)
      .set({ ...fields })
      .where(eq(booksTable.id, id))
      .returning();

    return updateResult;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Não foi possível atualizar os campos");
  }
}

export async function count(fields: Partial<Omit<BookSelectDTO, "createdAt" | "updatedAt">>): Promise<number> {
  try {
    const allowedFilters: Partial<Record<keyof typeof booksTable, any>> = {
      id: booksTable.id,
      title: booksTable.title,
      authorName: booksTable.authorName,
      publisher: booksTable.publisher,
      materialType: booksTable.materialType,
      aquisitionMethod: booksTable.aquisitionMethod,
      pagesQuantity: booksTable.pagesQuantity,
      genre: booksTable.genre,
      isbn: booksTable.isbn,
      quantity: booksTable.quantity,
      loanedQuantity: booksTable.loanedQuantity,
      cddOrCdu: booksTable.cddOrCdu,
      tombo: booksTable.tombo,
      edition: booksTable.edition,
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
      .from(booksTable)
      .where(and(...conditions));

    return result.count;
  } catch (error) {
    throw error;
  }
}

export async function unavailableBooks(): Promise<BookSelectDTO[]> {
  try {
    const result = await db.select().from(booksTable).where(eq(booksTable.quantity, booksTable.loanedQuantity));

    
    return result;
  } catch (error) {
    throw error;
  }
}
