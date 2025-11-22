import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

import * as pipe from '@/app/api/courses/courses.pipe';
import * as coursesService from '@/app/api/courses/courses.service';
import { GET, POST } from '@/app/api/courses/route';
import { NextRequest } from 'next/server';

vi.mock('@/app/api/courses/courses.service', () => ({
  get: vi.fn().mockResolvedValue(JSON.parse(JSON.stringify([{ id: '1', name: 'mock course' }]))),
  create: vi.fn(),
}));
vi.mock('@/app/api/courses/courses.pipe', () => ({
  getCoursesQueryStringSchema: { parse: vi.fn() },
  createCourseSchema: { parse: vi.fn() },
}));

describe('course routes - API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should return courses with 200 status', async () => {
    vi.spyOn(pipe.getCoursesQueryStringSchema, 'parse').mockReturnValue({
      page: 1,
      limit: 10,
    });

    const url = 'http://localhost:3000/api/courses?page=1&limit=10';
    const req = new NextRequest(url);

    const res = await GET(req);

    expect(res.status).toBe(200);
  });

  it('should return 400 if query params are invalid', async () => {
    const zodError = new ZodError([{ code: 'custom', path: ['page'], message: 'Invalid page' }]);
    vi.spyOn(pipe.getCoursesQueryStringSchema, 'parse').mockImplementation(() => {
      throw zodError;
    });

    const url = 'http://localhost:3000/api/courses?page=invalid';
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toBe('Erro de validação.');
  });

  it('should return 500 if service throws an error on GET', async () => {
    vi.spyOn(pipe.getCoursesQueryStringSchema, 'parse').mockReturnValue({ page: 1, limit: 10 });
    vi.spyOn(coursesService, 'get').mockRejectedValue(new Error('Internal error'));

    const url = 'http://localhost:3000/api/courses';
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.message).toBe('Erro interno inesperado.');
  });

  it('should create a course with 201 status', async () => {
    vi.spyOn(pipe.createCourseSchema, 'parse');
    vi.spyOn(coursesService, 'create');

    const body = {
      name: 'mock course',
      slug: 'mock-course',
      gradeLevel: '1',
    };

    const req = new NextRequest('http://localhost/api/courses', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
  });

  it('should return 400 if body is invalid on POST', async () => {
    const zodError = new ZodError([{ code: 'custom', path: ['name'], message: 'Required' }]);
    vi.spyOn(pipe.createCourseSchema, 'parse').mockImplementation(() => {
      throw zodError;
    });

    const req = new NextRequest('http://localhost/api/courses', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toBe('Erro de validação.');
  });

  it('should return 500 if service throws an error on POST', async () => {
    vi.spyOn(pipe.createCourseSchema, 'parse').mockReturnValue({ name: 'mock' } as any);
    vi.spyOn(coursesService, 'create').mockRejectedValue(new Error('Internal error'));

    const req = new NextRequest('http://localhost/api/courses', {
      method: 'POST',
      body: JSON.stringify({ name: 'mock' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.message).toBe('Erro interno inesperado.');
  });
});
