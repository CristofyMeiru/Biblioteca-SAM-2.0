import { createBookSchema } from "@/app/api/books/books.pipe";
import { describe, expect, it } from "vitest";

const validBook = {
  title: "Introdução à Programação",
  authorName: "João Silva",
  publisher: "Editora Técnica",
  quantity: "10",
  materialType: "Livro",
  aquisitionMethod: "compra",
  pagesQuantity: "320",
  loanedQuantity: "2",
  genre: "tecnologia",
  isbn: "978-85-12345-67-8",
  cddOrCdu: "004.1",
  tombo: "12345",
  edition: "2ª edição",
};

describe("create-book", () => {
  it("should validate and normalize fields to lower-case", () => {
    const validatedBook = createBookSchema.safeParse(validBook);

    expect(validatedBook.success).toBeTruthy();
    expect(validatedBook.data).toBeDefined();
    expect(validatedBook.data?.authorName).toBe("joão silva");
  });

  it("should invalidate some fields", () => {
    const bookToInvalidation = createBookSchema.safeParse({ ...validBook, title: undefined });

    expect(bookToInvalidation.success).toBeFalsy();
    expect(bookToInvalidation.data).toBeUndefined();
  });
});
