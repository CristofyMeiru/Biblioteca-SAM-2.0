import { AppError, ErrorType } from '@/common/resolvers/app-error';
import {
  CourseInsertDTO,
  CourseParamsDTO,
  CourseSelectDTO,
  CourseUpdateDTO,
  CreateCourseDTO,
  GetCourseQueryStringDTO,
} from './courses.dto';
import * as coursesRepository from './courses.repository';

export async function create(data: CreateCourseDTO): Promise<CourseSelectDTO> {
  try {
    const courseAlreadyExists = await coursesRepository.findOne({
      name: data.name,
      slug: data.slug,
      gradeLevel: data.gradeLevel,
    });

    if (courseAlreadyExists) {
      throw new AppError('Curso já existente.', ErrorType.CONFLICT);
    }

    const newCourse: CourseInsertDTO = {
      id: crypto.randomUUID(),
      name: data.name,
      slug: data.slug,
      gradeLevel: data.gradeLevel,
    };

    const result = await coursesRepository.create(newCourse);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function get(options: GetCourseQueryStringDTO): Promise<CourseSelectDTO[]> {
  try {
    const offset = (options.page - 1) * options.limit;

    const result = await coursesRepository.find({}, { limit: options.limit, offset });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateById(id: string, fields: CourseUpdateDTO): Promise<CourseSelectDTO> {
  try {
    const result = await coursesRepository.updateById(id, fields);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUnique(data: CourseParamsDTO): Promise<CourseSelectDTO> {
  try {
    const bookExists = await coursesRepository.findOne({ id: data.id });

    if (!bookExists) {
      throw new AppError('Livro não encontrado.', ErrorType.NOT_FOUND);
    }

    return bookExists;
  } catch (error) {
    throw error;
  }
}

export async function deleteById(id: string): Promise<CourseSelectDTO> {
  try {
    const result = await coursesRepository.deleteById(id);

    if (!result) {
      throw new AppError('Livro não encontrado.', ErrorType.NOT_FOUND);
    }

    return result;
  } catch (error) {
    throw error;
  }
}
