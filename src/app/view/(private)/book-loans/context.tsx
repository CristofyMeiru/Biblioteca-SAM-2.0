import { BookLoansCreateDTO } from '@/app/api/book-loans/book-loans.dto';
import { BookQrCodeData, StudentQrCodeData } from '@/types/qr-code-data';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

interface BookLoansPageContextType {
  studentData: StudentQrCodeData | null;
  bookData: BookQrCodeData | null;
  readerState: 'student' | 'book';
  setStudentData: Dispatch<SetStateAction<StudentQrCodeData | null>>;
  setBookData: Dispatch<SetStateAction<BookQrCodeData | null>>;
  setReaderState: Dispatch<SetStateAction<'student' | 'book'>>;
  formCreateBookLoan: UseFormReturn<BookLoansCreateDTO>;
}

const bookLoansPageContext = createContext<BookLoansPageContextType>({} as BookLoansPageContextType);

export const defaultValuesCreateBookLoan: BookLoansCreateDTO = {
  fullname: '',
  rollNumber: 0,
  courseId: '',
  courseName: '',
  bookId: '',
  dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 dias
  loanDate: new Date(),
  bookTitle: '',
  bookAuthor: '',
  bookGenre: '',
};

export function BookLoansPageContextProvider({ children }: { children: React.ReactNode }) {
  const [studentData, setStudentData] = useState<StudentQrCodeData | null>(null);
  const [bookData, setBookData] = useState<BookQrCodeData | null>(null);
  const [readerState, setReaderState] = useState<'student' | 'book'>('student');

  const formCreateBookLoan = useForm<BookLoansCreateDTO>({
    defaultValues: defaultValuesCreateBookLoan,
  });

  return (
    <bookLoansPageContext.Provider
      value={{ studentData, setStudentData, bookData, setBookData, readerState, setReaderState, formCreateBookLoan }}
    >
      {children}
    </bookLoansPageContext.Provider>
  );
}

export function useBookLoansPageContext() {
  return useContext(bookLoansPageContext);
}
