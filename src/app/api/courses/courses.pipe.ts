import z from "zod";

const gradeLevelEnum = z.enum(["1", "2", "3"], "Informe qual a série do curso.");

export const createCourseSchema = z.object({
  name: z.string().max(255, "Máximo de 255 caracteres.").toLowerCase(),
  slug: z.string().max(20, "Máximo de 20 caracteres."),
  gradeLevel: gradeLevelEnum,
});
