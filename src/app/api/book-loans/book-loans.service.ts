import * as booksRepository from '@/app/api/books/books.repository';
import * as coursesRepository from '@/app/api/courses/courses.repository';
import { AppError, ErrorType } from '@/common/resolvers/app-error';
import {
  BookLoansCreateDTO,
  type BookLoansInsertDTO,
  BookLoansSelectDTO,
  BookLoansWithDetailsDTO,
  CheckCredibilityDTO,
  GetBookLoansDTO,
} from './book-loans.dto';
import * as bookLoansRepository from './book-loans.repository';

export async function createBookLoan(bookLoan: BookLoansCreateDTO) {
  try {
    let courseId = bookLoan.courseId;

    if (!courseId && bookLoan.courseName) {
      const [gradeLevelStr, slug] = bookLoan.courseName.split(' ');
      if (!['1', '2', '3'].includes(gradeLevelStr) || !slug) {
        throw new AppError('Formato de curso inválido. Esperado: "3 DS"', ErrorType.BAD_REQUEST);
      }

      const gradeLevel = gradeLevelStr as '1' | '2' | '3';

      const course = await coursesRepository.findOne({ gradeLevel, slug });

      if (!course) {
        throw new AppError(`Curso não encontrado: ${bookLoan.courseName}`, ErrorType.NOT_FOUND);
      }

      courseId = course.id;
    }

    if (!courseId) {
      throw new AppError('Curso é obrigatório.', ErrorType.BAD_REQUEST);
    }

    const alreadyExists = await bookLoansRepository.findOne({
      fullname: bookLoan.fullname,
      rollNumber: bookLoan.rollNumber,
      courseId: courseId,
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
      courseId: courseId,
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

export async function count(filters: Partial<BookLoansSelectDTO> = {}): Promise<number> {
  try {
    const result = await bookLoansRepository.count(filters);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function checkCredibility(data: CheckCredibilityDTO) {
  try {
    const [gradeLevel, slug] = data.courseSlug.split(' ');

    console.log(gradeLevel, slug)
    
    const courseExists = await coursesRepository.findOne({
      gradeLevel: gradeLevel as '1' | '2' | '3',
      slug,
    });

    if (!courseExists) {
      throw new AppError('Curso não encontrado.', ErrorType.NOT_FOUND);
    }

    const loans = await bookLoansRepository.find({
      fullname: data.fullname,
      rollNumber: data.rollNumber,
      courseId: courseExists.id,
      status: 'ACTIVE',
    });

    let isCredible: 'completely' | 'partially' | 'no';

    if (loans.length === 0) {
      isCredible = 'completely';
    } else {
      const now = new Date();
      const overdueLoans = loans.filter((loan) => new Date(loan.dueDate) < now);

      if (overdueLoans.length === 0) {
        isCredible = 'partially';
      } else {
        isCredible = 'no';
      }
    }

    return { isCredible, loans };
  } catch (error) {
    throw error;
  }
}
