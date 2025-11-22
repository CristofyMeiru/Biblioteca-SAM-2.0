import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

import * as pipe from '@/app/api/books/books.pipe';
import * as booksService from '@/app/api/books/books.service';
import { GET, POST } from '@/app/api/books/route';
import { NextRequest } from 'next/server';

vi.mock('@/app/api/books/books.service', () => ({
  get: vi.fn().mockResolvedValue(JSON.parse(JSON.stringify([{ id: 1, title: 'mock book' }]))),
  create: vi.fn(),
}));
vi.mock('@/app/api/books/books.pipe', () => ({
  getBooksSchemaQuery: { parse: vi.fn() },
  createBookSchema: { parse: vi.fn() },
}));

describe('book routes - API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should return books with 200 status', async () => {
    vi.spyOn(pipe.getBooksSchemaQuery, 'parse').mockReturnValue({
      page: 1,
      limit: 10,
    });

    const url = 'http://localhost:3000/api/books?page=1&limit=10';
    const req = new NextRequest(url);

    const res = await GET(req);

    expect(res.status).toBe(200);
  });

  it('should return 400 if query params are invalid', async () => {
    const zodError = new ZodError([{ code: 'custom', path: ['page'], message: 'Invalid page' }]);
    vi.spyOn(pipe.getBooksSchemaQuery, 'parse').mockImplementation(() => {
      throw zodError;
    });

    const url = 'http://localhost:3000/api/books?page=invalid';
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toBe('Erro de validação.');
  });

  it('should return 500 if service throws an error on GET', async () => {
    vi.spyOn(pipe.getBooksSchemaQuery, 'parse').mockReturnValue({ page: 1, limit: 10 });
    vi.spyOn(booksService, 'get').mockRejectedValue(new Error('Internal error'));

    const url = 'http://localhost:3000/api/books';
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.message).toBe('Erro interno inesperado.');
  });

  it('should create a book with 201 status', async () => {
    vi.spyOn(pipe.createBookSchema, 'parse');
    vi.spyOn(booksService, 'create');

    const body = {
      title: 'mock book',
      authorName: 'mock author',
      genre: 'mock',
    };

    const req = new NextRequest('http://localhost/api/books', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
  });

  it('should return 400 if body is invalid on POST', async () => {
    const zodError = new ZodError([{ code: 'custom', path: ['title'], message: 'Required' }]);
    vi.spyOn(pipe.createBookSchema, 'parse').mockImplementation(() => {
      throw zodError;
    });

    const req = new NextRequest('http://localhost/api/books', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toBe('Erro de validação.');
  });

  it('should return 500 if service throws an error on POST', async () => {
    vi.spyOn(pipe.createBookSchema, 'parse').mockReturnValue({ title: 'mock' } as any);
    vi.spyOn(booksService, 'create').mockRejectedValue(new Error('Internal error'));

    const req = new NextRequest('http://localhost/api/books', {
      method: 'POST',
      body: JSON.stringify({ title: 'mock' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.message).toBe('Erro interno inesperado.');
  });
});
