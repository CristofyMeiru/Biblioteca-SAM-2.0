import { beforeEach, describe, expect, it, vi } from 'vitest';

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
});
