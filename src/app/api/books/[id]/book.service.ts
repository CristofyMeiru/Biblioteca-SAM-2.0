import { AppError, ErrorType } from "@/common/resolvers/app-error";
import { BookSelectDTO } from "../books.dto";
import * as booksRepository from "../books.repository";
import { BookParamsDTO, EditBookDTO } from "./book.dto";

export async function getUnique(data: BookParamsDTO): Promise<BookSelectDTO> {
  try {
    const bookExists = await booksRepository.findOne({ id: data.id });

    if (!bookExists) {
      throw new AppError("Livro não encontrado.", ErrorType.NOT_FOUND);
    }

    return bookExists;
  } catch (error) {
    throw error;
  }
}

export async function updateById(id: string, fields: EditBookDTO): Promise<BookSelectDTO> {
  try {
    const result = await booksRepository.updateById(id, fields);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteById(id: string): Promise<BookSelectDTO> {
  try {
    const result = await booksRepository.deleteByid(id);

    if (!result) {
      throw new AppError("Livro não encontrado.", ErrorType.NOT_FOUND);
    }

    return result;
  } catch (error) {
    throw error;
  }
}
