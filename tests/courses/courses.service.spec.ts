import * as coursesRepository from '@/app/api/courses/courses.repository';
import { create, deleteById, get, getUnique, updateById } from '@/app/api/courses/courses.service';
import { AppError } from '@/common/resolvers/app-error';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/app/api/courses/courses.repository', () => ({
  find: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
  updateById: vi.fn(),
  deleteById: vi.fn(),
  search: vi.fn(),
}));

describe('courses service', () => {
  it('should return search results when search param is provided', async () => {
    const mockCourses = [{ id: '1', name: 'Search Result' }];
    vi.mocked(coursesRepository.search).mockResolvedValue(mockCourses as any);

    const result = await get({ page: 1, limit: 10, search: 'test' });

    expect(coursesRepository.search).toHaveBeenCalledWith('test');
    expect(result).toEqual(mockCourses);
  });

  it('should return paginated courses when no search param', async () => {
    const mockCourses = [{ id: '2', name: 'Course' }];
    vi.mocked(coursesRepository.find).mockResolvedValue(mockCourses as any);

    const result = await get({ page: 2, limit: 10 });

    expect(coursesRepository.find).toHaveBeenCalledWith({}, { limit: 10, offset: 10 });
    expect(result).toEqual(mockCourses);
  });

  it('should create a new course', async () => {
    const newCourse = { name: 'mock course', slug: 'mock-course', gradeLevel: '1' };
    vi.mocked(coursesRepository.findOne).mockResolvedValue(null);
    vi.mocked(coursesRepository.create).mockResolvedValue({ id: 'new-id', ...newCourse } as any);

    const result = await create(newCourse as any);

    expect(coursesRepository.findOne).toHaveBeenCalledWith({
      name: newCourse.name,
      slug: newCourse.slug,
      gradeLevel: newCourse.gradeLevel,
    });
    expect(coursesRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  it('should throw AppError if course already exists on create', async () => {
    const newCourse = { name: 'mock course', slug: 'mock-course', gradeLevel: '1' };
    vi.mocked(coursesRepository.findOne).mockResolvedValue({ id: 'existing' } as any);

    await expect(create(newCourse as any)).rejects.toThrow(AppError);
    await expect(create(newCourse as any)).rejects.toThrow('Curso já existente.');
  });

  it('should return course if found by getUnique', async () => {
    const mockCourse = { id: '1', name: 'Found Course' };
    vi.mocked(coursesRepository.findOne).mockResolvedValue(mockCourse as any);

    const result = await getUnique({ id: '1' });

    expect(coursesRepository.findOne).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(mockCourse);
  });

  it('should throw AppError if course not found by getUnique', async () => {
    vi.mocked(coursesRepository.findOne).mockResolvedValue(null);

    await expect(getUnique({ id: '1' })).rejects.toThrow(AppError);
    await expect(getUnique({ id: '1' })).rejects.toThrow('Livro não encontrado.'); // Note: Message says 'Livro' in service code
  });

  it('should update course', async () => {
    const mockCourse = { id: '1', name: 'Updated' };
    vi.mocked(coursesRepository.updateById).mockResolvedValue(mockCourse as any);

    const result = await updateById('1', { name: 'Updated' });

    expect(coursesRepository.updateById).toHaveBeenCalledWith('1', { name: 'Updated' });
    expect(result).toEqual(mockCourse);
  });

  it('should delete course if found', async () => {
    const mockCourse = { id: '1', name: 'Deleted' };
    vi.mocked(coursesRepository.deleteById).mockResolvedValue(mockCourse as any);

    const result = await deleteById('1');

    expect(coursesRepository.deleteById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockCourse);
  });

  it('should throw AppError if course not found on deleteById', async () => {
    vi.mocked(coursesRepository.deleteById).mockResolvedValue(null as any);

    await expect(deleteById('1')).rejects.toThrow(AppError);
    await expect(deleteById('1')).rejects.toThrow('Livro não encontrado.'); // Note: Message says 'Livro' in service code
  });
});
