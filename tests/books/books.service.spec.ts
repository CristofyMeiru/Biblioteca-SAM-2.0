import * as booksRepository from '@/app/api/books/books.repository';
import { count, create, deleteById, get, getUnique, updateById } from '@/app/api/books/books.service';
import { AppError } from '@/common/resolvers/app-error';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/app/api/books/books.repository', () => ({
  unavailableBooks: vi.fn(),
  find: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
  count: vi.fn(),
  updateById: vi.fn(),
  deleteByid: vi.fn(),
  search: vi.fn(),
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

  it('should return search results when search param is provided', async () => {
    const mockBooks = [{ id: 3, title: 'Search Result' }];
    vi.mocked(booksRepository.search).mockResolvedValue(mockBooks as any);

    const result = await get({ page: 1, limit: 10, search: 'test' });

    expect(booksRepository.search).toHaveBeenCalledWith('test', { limit: 10, offset: 0 });
    expect(result).toEqual(mockBooks);
  });

  it('should create a new book', async () => {
    const newBook = { title: 'mock book', authorName: 'some name', genre: 'mock', quantity: 10, pagesQuantity: 100 };
    vi.mocked(booksRepository.findOne).mockResolvedValue(null);
    vi.mocked(booksRepository.create).mockResolvedValue({ id: 'new-id', ...newBook } as any);

    const result = await create(newBook as any);

    expect(booksRepository.findOne).toHaveBeenCalledWith({ title: newBook.title, authorName: newBook.authorName });
    expect(booksRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  it('should throw AppError if book already exists on create', async () => {
    const newBook = { title: 'mock book', authorName: 'some name' };
    vi.mocked(booksRepository.findOne).mockResolvedValue({ id: 'existing' } as any);

    await expect(create(newBook as any)).rejects.toThrow(AppError);
    await expect(create(newBook as any)).rejects.toThrow('Livro já existente.');
  });

  it('should return total count of books', async () => {
    vi.mocked(booksRepository.count).mockResolvedValue(5);

    const result = await count();

    expect(booksRepository.count).toHaveBeenCalled();
    expect(result).toBe(5);
  });

  it('should return book if found by getUnique', async () => {
    const mockBook = { id: '1', title: 'Found Book' };
    vi.mocked(booksRepository.findOne).mockResolvedValue(mockBook as any);

    const result = await getUnique({ id: '1' });

    expect(booksRepository.findOne).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(mockBook);
  });

  it('should throw AppError if book not found by getUnique', async () => {
    vi.mocked(booksRepository.findOne).mockResolvedValue(null);

    await expect(getUnique({ id: '1' })).rejects.toThrow(AppError);
    await expect(getUnique({ id: '1' })).rejects.toThrow('Livro não encontrado.');
  });

  it('should update book if found and valid', async () => {
    const mockBook = { id: '1', title: 'Old Title', loanedQuantity: 0 };
    vi.mocked(booksRepository.findOne).mockResolvedValue(mockBook as any);
    vi.mocked(booksRepository.updateById).mockResolvedValue({ ...mockBook, title: 'New Title' } as any);

    const result = await updateById('1', { title: 'New Title' });

    expect(booksRepository.updateById).toHaveBeenCalledWith('1', { title: 'New Title' });
    expect(result.title).toBe('New Title');
  });

  it('should throw AppError if book not found on updateById', async () => {
    vi.mocked(booksRepository.findOne).mockResolvedValue(null);

    await expect(updateById('1', { title: 'New Title' })).rejects.toThrow(AppError);
    await expect(updateById('1', { title: 'New Title' })).rejects.toThrow('Livro não encontrado.');
  });

  it('should throw AppError if quantity < loanedQuantity on updateById', async () => {
    const mockBook = { id: '1', title: 'Book', loanedQuantity: 5 };
    vi.mocked(booksRepository.findOne).mockResolvedValue(mockBook as any);

    await expect(updateById('1', { quantity: 4 })).rejects.toThrow(AppError);
    await expect(updateById('1', { quantity: 4 })).rejects.toThrow(
      'Quantidade de unidades não pode ser menor que a quantidade de emprestimos ativos.'
    );
  });

  it('should delete book if found', async () => {
    const mockBook = { id: '1', title: 'Deleted Book' };
    vi.mocked(booksRepository.deleteByid).mockResolvedValue(mockBook as any);

    const result = await deleteById('1');

    expect(booksRepository.deleteByid).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockBook);
  });

  it('should throw AppError if book not found on deleteById', async () => {
    vi.mocked(booksRepository.deleteByid).mockResolvedValue(null);

    await expect(deleteById('1')).rejects.toThrow(AppError);
    await expect(deleteById('1')).rejects.toThrow('Livro não encontrado.');
  });
});
