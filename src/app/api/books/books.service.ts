import { AppError, ErrorType } from "@/common/resolvers/app-error";
import { BookInsertDTO, BookSelectDTO, CreateBookDTO, GetBooksDTO } from "./books.dto";
import * as booksRepository from "./books.repository";

export async function get(options: GetBooksDTO): Promise<BookSelectDTO[]> {
  try {
    const offset = (options.page - 1) * options.limit;

    const result = await booksRepository.find({}, { limit: options.limit, offset });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function create(data: CreateBookDTO) {
  try {
    const bookAlreadyExists = await booksRepository.findOne({ title: data.title, authorName: data.authorName });

    if (bookAlreadyExists) {
      throw new AppError("Livro já existente.", ErrorType.CONFLICT);
    }

    const newBook: BookInsertDTO = {
      ...data,
      quantity: Number(data.quantity),
      pagesQuantity: Number(data.pagesQuantity),
      id: crypto.randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      loanedQuantity: 0,
    };

    const resultCreation = await booksRepository.create(newBook);

    return resultCreation;
  } catch (error) {
    throw error;
  }
}
