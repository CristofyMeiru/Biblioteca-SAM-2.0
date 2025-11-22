import {
  createCourseSchema,
  getCoursesQueryStringSchema,
  paramsCourseSchema,
  updateCourseSchema,
} from '@/app/api/courses/courses.pipe';
import { describe, expect, it } from 'vitest';

describe('courses pipe', () => {
  describe('getCoursesQueryStringSchema', () => {
    it('should accept valid query params', () => {
      const result = getCoursesQueryStringSchema.safeParse({ page: '1', limit: '10', search: 'test' });
      expect(result.success).toBeTruthy();
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(10);
      }
    });

    it('should use default values for limit and page', () => {
      const result = getCoursesQueryStringSchema.safeParse({});
      expect(result.success).toBeTruthy();
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(50);
      }
    });

    it('should reject invalid limit', () => {
      expect(getCoursesQueryStringSchema.safeParse({ limit: '501' }).success).toBeFalsy();
      expect(getCoursesQueryStringSchema.safeParse({ limit: 'abc' }).success).toBeFalsy();
    });

    it('should reject invalid page', () => {
      expect(getCoursesQueryStringSchema.safeParse({ page: '0' }).success).toBeFalsy();
      expect(getCoursesQueryStringSchema.safeParse({ page: 'abc' }).success).toBeFalsy();
    });
  });

  describe('createCourseSchema', () => {
    const validCourse = {
      name: 'Curso de Teste',
      slug: 'curso-teste',
      gradeLevel: '1',
    };

    it('should validate and normalize fields to lower-case', () => {
      const validated = createCourseSchema.safeParse(validCourse);

      expect(validated.success).toBeTruthy();
      expect(validated.data).toBeDefined();
      expect(validated.data?.name).toBe('curso de teste');
    });

    it('should invalidate missing required fields', () => {
      const invalid = createCourseSchema.safeParse({ ...validCourse, name: undefined });
      expect(invalid.success).toBeFalsy();
    });

    it('should invalidate invalid gradeLevel', () => {
      const invalid = createCourseSchema.safeParse({ ...validCourse, gradeLevel: '4' });
      expect(invalid.success).toBeFalsy();
    });

    it('should invalidate if slug is too long', () => {
      const invalid = createCourseSchema.safeParse({ ...validCourse, slug: 'a'.repeat(21) });
      expect(invalid.success).toBeFalsy();
    });
  });

  describe('paramsCourseSchema', () => {
    it('should accept valid UUID', () => {
      expect(paramsCourseSchema.safeParse({ id: '123e4567-e89b-12d3-a456-426614174000' }).success).toBeTruthy();
    });

    it('should reject invalid UUID', () => {
      expect(paramsCourseSchema.safeParse({ id: 'invalid-uuid' }).success).toBeFalsy();
    });
  });

  describe('updateCourseSchema', () => {
    it('should accept valid partial updates', () => {
      const result = updateCourseSchema.safeParse({ name: 'Novo Nome' });
      expect(result.success).toBeTruthy();
      if (result.success) {
        expect(result.data.name).toBe('novo nome');
      }
    });

    it('should reject invalid values', () => {
      expect(updateCourseSchema.safeParse({ gradeLevel: '5' }).success).toBeFalsy();
    });
  });
});
