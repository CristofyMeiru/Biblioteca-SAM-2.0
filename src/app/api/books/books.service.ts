import { AppError, ErrorType } from '@/common/resolvers/app-error';
import { BookInsertDTO, BookParamsDTO, BookSelectDTO, CreateBookDTO, EditBookDTO, GetBooksDTO } from './books.dto';
import * as booksRepository from './books.repository';

export async function get(options: GetBooksDTO): Promise<BookSelectDTO[]> {
  try {
    const { page, limit, status, search } = options;
    const offset = (page - 1) * limit;

    if (search) {
      return await booksRepository.search(search, { limit, offset });
    } else if (status === 'unavailable') {
      return await booksRepository.unavailableBooks({ limit, offset });
    }

    return await booksRepository.find({}, { limit, offset });
  } catch (error) {
    throw error;
  }
}

export async function create(data: CreateBookDTO) {
  try {
    const bookAlreadyExists = await booksRepository.findOne({ title: data.title, authorName: data.authorName });

    if (bookAlreadyExists) {
      throw new AppError('Livro já existente.', ErrorType.CONFLICT);
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

export async function count(): Promise<number> {
  try {
    const result = await booksRepository.count({});

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUnique(data: BookParamsDTO): Promise<BookSelectDTO> {
  try {
    const bookExists = await booksRepository.findOne({ id: data.id });

    if (!bookExists) {
      throw new AppError('Livro não encontrado.', ErrorType.NOT_FOUND);
    }

    return bookExists;
  } catch (error) {
    throw error;
  }
}

export async function updateById(id: string, fields: EditBookDTO): Promise<BookSelectDTO> {
  try {
    const bookExists = await booksRepository.findOne({ id });

    if (!bookExists) {
      throw new AppError('Livro não encontrado.', ErrorType.NOT_FOUND);
    }

    if (fields.quantity && fields.quantity < bookExists.loanedQuantity) {
      throw new AppError(
        'Quantidade de unidades não pode ser menor que a quantidade de emprestimos ativos.',
        ErrorType.BAD_REQUEST
      );
    }

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
      throw new AppError('Livro não encontrado.', ErrorType.NOT_FOUND);
    }

    return result;
  } catch (error) {
    throw error;
  }
}
