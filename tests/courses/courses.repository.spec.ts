import { create, deleteById, find, findOne, search, updateById } from '@/app/api/courses/courses.repository';
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

const newCourse = {
  name: 'mock course',
  slug: 'mock-course',
  gradeLevel: '1',
};

describe('courses repository', () => {
  it('should create a new course', async () => {
    const returningMock = vi.fn().mockReturnValue([{ id: '1', ...newCourse }]);
    const valuesMock = vi.fn().mockReturnValue({ returning: returningMock });
    mockDb.insert.mockReturnValue({ values: valuesMock });

    const result = await create(newCourse as any);

    expect(mockDb.insert).toHaveBeenCalled();
    expect(result).toEqual({ id: '1', ...newCourse });
  });

  it('should find courses with filters', async () => {
    const mockCourses = [{ id: '1', name: 'Course 1' }];
    const chainable = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation((resolve) => resolve(mockCourses)),
    };
    mockDb.select.mockReturnValue(chainable as any);

    const result = await find({ name: 'Course 1' }, { limit: 10, offset: 0 });

    expect(mockDb.select).toHaveBeenCalled();
    expect(result).toEqual(mockCourses);
  });

  it('should find one course', async () => {
    const mockCourse = { id: '1', name: 'Course 1' };
    const chainable = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation((callback) => Promise.resolve(callback([mockCourse]))),
    };
    mockDb.select.mockReturnValue(chainable as any);

    const result = await findOne({ id: '1' } as any);

    expect(mockDb.select).toHaveBeenCalled();
    expect(result).toEqual(mockCourse);
  });

  it('should return undefined if course not found in findOne', async () => {
    const chainable = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation((callback) => Promise.resolve(callback([]))),
    };
    mockDb.select.mockReturnValue(chainable as any);

    const result = await findOne({ id: '999' } as any);

    expect(result).toBeUndefined();
  });

  it('should delete a course', async () => {
    const mockCourse = { id: '1', name: 'Deleted' };
    const returningMock = vi.fn().mockResolvedValue([mockCourse]);
    const whereMock = vi.fn().mockReturnValue({ returning: returningMock });
    mockDb.delete.mockReturnValue({ where: whereMock });

    const result = await deleteById('1');

    expect(mockDb.delete).toHaveBeenCalled();
    expect(result).toEqual(mockCourse);
  });

  it('should update a course', async () => {
    const mockCourse = { id: '1', name: 'Updated' };
    const returningMock = vi.fn().mockResolvedValue([mockCourse]);
    const whereMock = vi.fn().mockReturnValue({ returning: returningMock });
    const setMock = vi.fn().mockReturnValue({ where: whereMock });
    mockDb.update.mockReturnValue({ set: setMock });

    const result = await updateById('1', { name: 'Updated' });

    expect(mockDb.update).toHaveBeenCalled();
    expect(result).toEqual(mockCourse);
  });

  it('should search courses', async () => {
    const mockCourses = [{ id: '1', name: 'Search Result' }];
    mockDb.execute.mockResolvedValue({ rows: mockCourses });

    const result = await search('query');

    expect(mockDb.execute).toHaveBeenCalled();
    expect(result).toEqual(mockCourses);
  });
});
