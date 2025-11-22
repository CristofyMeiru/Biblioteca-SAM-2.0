import {
  aquisitionMethodEnum,
  bookParamsSchema,
  createBookSchema,
  editBookBodySchema,
  editBookParamsSchema,
  getBooksSchemaQuery,
  materialTypeEnum,
} from '@/app/api/books/books.pipe';
import { describe, expect, it } from 'vitest';

const validBook = {
  title: 'Introdução à Programação',
  authorName: 'João Silva',
  publisher: 'Editora Técnica',
  quantity: '10',
  materialType: 'Livro',
  aquisitionMethod: 'compra',
  pagesQuantity: '320',
  loanedQuantity: '2',
  genre: 'tecnologia',
  isbn: '978-85-12345-67-8',
  cddOrCdu: '004.1',
  tombo: '12345',
  edition: '2ª edição',
};

describe('books pipe', () => {
  describe('materialTypeEnum', () => {
    it('should accept valid material types', () => {
      expect(materialTypeEnum.safeParse('Livro').success).toBeTruthy();
      expect(materialTypeEnum.safeParse('TCC').success).toBeTruthy();
    });

    it('should reject invalid material types', () => {
      expect(materialTypeEnum.safeParse('Invalid').success).toBeFalsy();
    });
  });

  describe('aquisitionMethodEnum', () => {
    it('should accept valid acquisition methods', () => {
      expect(aquisitionMethodEnum.safeParse('compra').success).toBeTruthy();
      expect(aquisitionMethodEnum.safeParse('doação').success).toBeTruthy();
    });

    it('should reject invalid acquisition methods', () => {
      expect(aquisitionMethodEnum.safeParse('Invalid').success).toBeFalsy();
    });
  });

  describe('getBooksSchemaQuery', () => {
    it('should accept valid query params', () => {
      const result = getBooksSchemaQuery.safeParse({ page: '1', limit: '10', status: 'unavailable', search: 'test' });
      expect(result.success).toBeTruthy();
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(10);
      }
    });

    it('should use default values for limit and page', () => {
      const result = getBooksSchemaQuery.safeParse({});
      expect(result.success).toBeTruthy();
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(50);
      }
    });

    it('should reject invalid limit', () => {
      expect(getBooksSchemaQuery.safeParse({ limit: '501' }).success).toBeFalsy();
      expect(getBooksSchemaQuery.safeParse({ limit: 'abc' }).success).toBeFalsy();
    });

    it('should reject invalid page', () => {
      expect(getBooksSchemaQuery.safeParse({ page: '0' }).success).toBeFalsy();
      expect(getBooksSchemaQuery.safeParse({ page: 'abc' }).success).toBeFalsy();
    });
  });

  describe('createBookSchema', () => {
    it('should validate and normalize fields to lower-case', () => {
      const validatedBook = createBookSchema.safeParse(validBook);

      expect(validatedBook.success).toBeTruthy();
      expect(validatedBook.data).toBeDefined();
      expect(validatedBook.data?.authorName).toBe('joão silva');
      expect(validatedBook.data?.title).toBe('introdução à programação');
    });

    it('should invalidate missing required fields', () => {
      const bookToInvalidation = createBookSchema.safeParse({ ...validBook, title: undefined });
      expect(bookToInvalidation.success).toBeFalsy();
    });

    it('should invalidate invalid quantity format', () => {
      const bookToInvalidation = createBookSchema.safeParse({ ...validBook, quantity: 'abc' });
      expect(bookToInvalidation.success).toBeFalsy();
    });
  });

  describe('bookParamsSchema', () => {
    it('should accept valid UUID', () => {
      expect(bookParamsSchema.safeParse({ id: '123e4567-e89b-12d3-a456-426614174000' }).success).toBeTruthy();
    });

    it('should reject invalid UUID', () => {
      expect(bookParamsSchema.safeParse({ id: 'invalid-uuid' }).success).toBeFalsy();
    });
  });

  describe('editBookBodySchema', () => {
    it('should accept valid partial updates', () => {
      const result = editBookBodySchema.safeParse({ title: 'New Title', quantity: 5 });
      expect(result.success).toBeTruthy();
      if (result.success) {
        expect(result.data.title).toBe('new title');
        expect(result.data.quantity).toBe(5);
      }
    });

    it('should reject invalid values', () => {
      expect(editBookBodySchema.safeParse({ quantity: -1 }).success).toBeFalsy();
    });
  });

  describe('editBookParamsSchema', () => {
    it('should accept valid UUID', () => {
      expect(editBookParamsSchema.safeParse({ id: '123e4567-e89b-12d3-a456-426614174000' }).success).toBeTruthy();
    });

    it('should reject invalid UUID', () => {
      expect(editBookParamsSchema.safeParse({ id: 'invalid-uuid' }).success).toBeFalsy();
    });
  });
});
