import * as booksRepository from '@/app/api/books/books.repository';
import { count, create, get } from '@/app/api/books/books.service';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/app/api/books/books.repository', () => ({
  unavailableBooks: vi.fn(),
  find: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
  count: vi.fn(),
}));

describe('books service', () => {
  it('should return unavailable books when status is unavailable', async () => {
    const mockBooks = [{ id: 1, title: 'Livro indisponível' }];
    vi.mocked(booksRepository.unavailableBooks).mockResolvedValue(mockBooks as any);

    const result = await get({ page: 1, limit: 10, status: 'unavailable' });

    expect(booksRepository.unavailableBooks).toHaveBeenCalled();
    expect(result).toEqual(mockBooks);
  });

  it('should return paginated books when status is not unavailable', async () => {
    const mockBooks = [{ id: 2, title: 'Livro normal' }];
    vi.mocked(booksRepository.find).mockResolvedValue(mockBooks as any);

    const result = await get({ page: 2, limit: 10 });

    expect(booksRepository.find).toHaveBeenCalledWith({}, { limit: 10, offset: 10 });
    expect(result).toEqual(mockBooks);
  });

  it('should create a new book', async () => {
    const newBook = { title: 'mock book', authorName: 'some name', genre: 'mock' };
    vi.mocked(booksRepository.findOne).mockResolvedValue(null);

    await create(newBook as any);

    expect(booksRepository.findOne).toHaveBeenCalledWith({ title: newBook.title, authorName: newBook.authorName });
  });

  it('should return total count of books', async () => {
    vi.mocked(booksRepository.count).mockResolvedValue(0);

    await count();

    expect(booksRepository.count).toHaveBeenCalled();
  });
});
