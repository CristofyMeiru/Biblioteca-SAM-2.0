import * as booksRepository from '@/app/api/books/books.repository';
import { AppError, ErrorType } from '@/common/resolvers/app-error';
import {
  BookLoansCreateDTO,
  type BookLoansInsertDTO,
  BookLoansSelectDTO,
  BookLoansWithDetailsDTO,
  GetBookLoansDTO,
} from './book-loans.dto';
import * as bookLoansRepository from './book-loans.repository';

export async function createBookLoan(bookLoan: BookLoansCreateDTO) {
  try {
    const alreadyExists = await bookLoansRepository.findOne({
      fullname: bookLoan.fullname,
      rollNumber: bookLoan.rollNumber,
      courseId: bookLoan.courseId,
      bookId: bookLoan.bookId,
    });

    if (alreadyExists) {
      throw new AppError('Livro já emprestado para este aluno.', ErrorType.BAD_REQUEST);
    }

    const bookExists = await booksRepository.findOne({
      id: bookLoan.bookId,
    });

    if (!bookExists) {
      throw new AppError('Livro não encontrado.', ErrorType.NOT_FOUND);
    }

    if (bookExists.loanedQuantity >= bookExists.quantity) {
      throw new AppError('Livro não disponível.', ErrorType.BAD_REQUEST);
    }

    await booksRepository.updateById(bookExists.id, {
      loanedQuantity: bookExists.loanedQuantity + 1,
    });

    const newBookLoan: BookLoansInsertDTO = {
      id: crypto.randomUUID(),
      fullname: bookLoan.fullname,
      rollNumber: bookLoan.rollNumber,
      courseId: bookLoan.courseId,
      bookId: bookLoan.bookId,
      dueDate: bookLoan.dueDate,
      loanDate: bookLoan.loanDate,
      returnDate: undefined,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await bookLoansRepository.create(newBookLoan);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function get(options: GetBookLoansDTO): Promise<BookLoansWithDetailsDTO[]> {
  try {
    const { page, limit, status, search } = options;
    const offset = (page - 1) * limit;

    if (search) {
      return await bookLoansRepository.search(search, { limit, offset });
    }

    const filter: Partial<BookLoansSelectDTO> = {};
    if (status) {
      filter.status = status;
    }

    return await bookLoansRepository.find(filter, { limit, offset });
  } catch (error) {
    throw error;
  }
}

export async function count(): Promise<number> {
  try {
    const result = await bookLoansRepository.count({});

    return result;
  } catch (error) {
    throw error;
  }
}
