import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const bookTable = pgTable("books", {
  id: uuid("id").primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  // authorId: varchar("author_id", { length: 60 })
  //   .notNull()
  //   .references(() => authorsTable.id),
  publisher: varchar("publisher", { length: 100 }).notNull(),
  materialType: varchar("material_type", { length: 50 }),
  aquisitionMethod: varchar("aquisition_method", { length: 50 }),
  pagesQuantity: integer("pages_quantity"),
  genre: varchar("genre", { length: 30 }),
  isbn: varchar("isbn", { length: 60 }),
  quantity: integer("quantity").notNull(),
  loanedQuantity: integer("loaned_quantity").default(0),
  cddOrCdu: varchar("cdd_or_cdu", { length: 60 }),
  tombo: varchar("tombo", { length: 60 }),
  edition: varchar("edition", { length: 50 }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});
