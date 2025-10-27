import { CourseInsertDTO, CourseSelectDTO, CreateCourseDTO } from "./courses.dto";
import * as coursesRepository from "./courses.repository";

export async function create(data: CreateCourseDTO): Promise<CourseSelectDTO> {
  try {
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
