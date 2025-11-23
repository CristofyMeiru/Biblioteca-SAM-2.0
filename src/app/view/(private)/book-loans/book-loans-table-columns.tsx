import { BookLoansSelectDTO } from '@/app/api/book-loans/book-loans.dto';
import { ColumnDef } from '@tanstack/react-table';

export const bookLoansTableColumns: ColumnDef<BookLoansSelectDTO>[] = [
  {
    accessorKey: 'fullname',
    header: 'Aluno',
  },
];
