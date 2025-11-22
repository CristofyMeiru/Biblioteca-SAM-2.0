import {
  count,
  create,
  deleteByid,
  find,
  findOne,
  search,
  unavailableBooks,
  updateById,
} from '@/app/api/books/books.repository';
import { describe, expect, it, vi } from 'vitest';

const mockDb = vi.hoisted(() => ({
  insert: vi.fn(),
  select: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  execute: vi.fn(),
}));

vi.mock('@/config/db/db-client', () => ({
  db: mockDb,
}));

const newBook = {
  title: 'mock book',
  authorName: 'mock author',
  genre: 'mock',
};

describe('books repository', () => {
  it('should create a new book', async () => {
    const returningMock = vi.fn().mockReturnValue([{ id: 1, ...newBook }]);
    const valuesMock = vi.fn().mockReturnValue({ returning: returningMock });
    mockDb.insert.mockReturnValue({ values: valuesMock });

    const result = await create(newBook as any);

    expect(mockDb.insert).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, ...newBook });
  });

  it('should find books with filters', async () => {
    const mockBooks = [{ id: 1, title: 'Book 1' }];
    const chainable = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation((resolve) => resolve(mockBooks)),
    };
    mockDb.select.mockReturnValue(chainable as any);

    const result = await find({ title: 'Book 1' }, { limit: 10, offset: 0 });

    expect(mockDb.select).toHaveBeenCalled();
    expect(result).toEqual(mockBooks);
  });

  it('should find one book', async () => {
    const mockBook = { id: 1, title: 'Book 1' };
    const chainable = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation((callback) => Promise.resolve(callback([mockBook]))),
    };
    mockDb.select.mockReturnValue(chainable as any);

    const result = await findOne({ id: 1 } as any);

    expect(mockDb.select).toHaveBeenCalled();
    expect(result).toEqual(mockBook);
  });

  it('should return null if book not found in findOne', async () => {
    const chainable = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation((callback) => Promise.resolve(callback([]))),
    };
    mockDb.select.mockReturnValue(chainable as any);

    const result = await findOne({ id: 999 } as any);

    expect(result).toBeUndefined();
  });

  it('should delete a book', async () => {
    const mockBook = { id: 1, title: 'Deleted' };
    const returningMock = vi.fn().mockResolvedValue([mockBook]);
    const whereMock = vi.fn().mockReturnValue({ returning: returningMock });
    mockDb.delete.mockReturnValue({ where: whereMock });

    const result = await deleteByid('1');

    expect(mockDb.delete).toHaveBeenCalled();
    expect(result).toEqual(mockBook);
  });

  it('should update a book', async () => {
    const mockBook = { id: 1, title: 'Updated' };
    const returningMock = vi.fn().mockResolvedValue([mockBook]);
    const whereMock = vi.fn().mockReturnValue({ returning: returningMock });
    const setMock = vi.fn().mockReturnValue({ where: whereMock });
    mockDb.update.mockReturnValue({ set: setMock });

    const result = await updateById('1', { title: 'Updated' });

    expect(mockDb.update).toHaveBeenCalled();
    expect(result).toEqual(mockBook);
  });

  it('should count books', async () => {
    const chainable = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation((resolve) => resolve([{ count: 5 }])),
    };
    mockDb.select.mockReturnValue(chainable as any);

    const result = await count({});

    expect(mockDb.select).toHaveBeenCalled();
    expect(result).toBe(5);
  });

  it('should return unavailable books', async () => {
    const mockBooks = [{ id: 1, title: 'Unavailable' }];
    const chainable = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation((resolve) => resolve(mockBooks)),
    };
    mockDb.select.mockReturnValue(chainable as any);

    const result = await unavailableBooks();

    expect(mockDb.select).toHaveBeenCalled();
    expect(result).toEqual(mockBooks);
  });

  it('should search books', async () => {
    const mockBooks = [{ id: 1, title: 'Search Result' }];
    mockDb.execute.mockResolvedValue({ rows: mockBooks });

    const result = await search('query');

    expect(mockDb.execute).toHaveBeenCalled();
    expect(result).toEqual(mockBooks);
  });
});
