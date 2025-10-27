import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { booksTable } from "./books.tables";
import { coursesTable } from "./courses.table";

export const bookLoans = pgTable("book_loans", {
  id: uuid("id").notNull().primaryKey(),
  fullname: varchar("fullname", { length: 255 }).notNull(),
  enrollment: integer("enrollment").notNull(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => coursesTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  bookId: uuid("book_id")
    .notNull()
    .references(() => booksTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
