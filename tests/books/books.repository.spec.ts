import { create } from '@/app/api/books/books.repository';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/config/db/db-client', () => {
  const returningMock = vi.fn().mockResolvedValue([{ id: 1, title: 'mock book' }]);
  const valuesMock = vi.fn().mockReturnValue({ returning: returningMock });
  const insertMock = vi.fn().mockReturnValue({ values: valuesMock });

  return { db: { insert: insertMock } };
});

const newBook = {
  title: 'mock book',
  authorName: 'mock author',
  genre: 'mock',
};

describe('books repository', () => {
  it('should create a new book', async () => {
    const result = await create(newBook as any);

    expect(result).toEqual({ id: 1, title: 'mock book' });
  });

  
});
