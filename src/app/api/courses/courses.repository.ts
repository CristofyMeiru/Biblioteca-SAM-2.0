import { db } from "@/config/db/db-client";
import { coursesTable } from "@/config/db/tables/courses.table";
import { CourseInsertDTO, CourseSelectDTO } from "./courses.dto";

export async function create(data: CourseInsertDTO): Promise<CourseSelectDTO> {
  try {
    const [result] = await db.insert(coursesTable).values(data).returning();

    return result;
  } catch (error) {
    throw error;
  }
}
