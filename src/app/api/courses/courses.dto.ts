import { coursesTable } from "@/config/db/tables/courses.table";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import z from "zod";
import { createCourseSchema } from "./courses.pipe";

export type CourseInsertDTO = InferInsertModel<typeof coursesTable>;

export type CourseSelectDTO = InferSelectModel<typeof coursesTable>;

export type CreateCourseDTO = z.infer<typeof createCourseSchema>;
