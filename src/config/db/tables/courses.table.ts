import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const gradeLevelEnum = pgEnum("grade_level_enum", ["1", "2", "3"]);

export const coursesTable = pgTable("courses", {
  id: uuid("id").notNull().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  gradeLevel: gradeLevelEnum("grade_level").notNull(),
});
