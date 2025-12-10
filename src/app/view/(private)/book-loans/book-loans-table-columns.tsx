import { BookLoansWithDetailsDTO } from '@/app/api/book-loans/book-loans.dto';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Kbd } from '@/components/ui/kbd';
import { ColumnDef, Row } from '@tanstack/react-table';
import { capitalCase } from 'change-case';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const enumStatusLoanTranslation: Record<BookLoansWithDetailsDTO['status'], { label: string; color: string }> = {
  RETURNED: {
    label: 'Devolvido',
    color: 'bg-green-500',
  },
  ACTIVE: {
    label: 'Em andamento',
    color: 'bg-blue-500',
  },
  LATE: {
    label: 'Atrasado',
    color: 'bg-orange-500',
  },
};

export const bookLoansTableColumns: ColumnDef<BookLoansWithDetailsDTO>[] = [
  {
    accessorKey: 'fullname',
    header: 'Aluno',
    cell: ({ row }) => capitalCase(row.original.fullname),
  },
  {
    accessorKey: 'rollNumber',
    header: () => <div className=" text-center ">Nº da chamada</div>,
    cell: ({ row }) => <div className=" text-center ">{row.original.rollNumber}</div>,
  },
  {
    accessorKey: 'courseName',
    header: () => <div className=" text-center ">Curso</div>,
    cell: ({ row }) => (
      <div className=" text-center ">{` ${row.original.courseGradeLevel}º ${capitalCase(
        row.original.courseName
      )}`}</div>
    ),
  },
  {
    accessorKey: 'bookTitle',
    header: 'Livro',
    cell: ({ row }) => capitalCase(row.original.bookTitle),
  },
  {
    accessorKey: 'loanDate',
    header: () => <div className=" text-center ">Data de empréstimo</div>,
    cell: ({ row }) => <div className=" text-center ">{format(row.original.loanDate, 'P', { locale: ptBR })}</div>,
  },
  {
    accessorKey: 'dueDate',
    header: () => <div className=" text-center ">Data de devolução</div>,
    cell: ({ row }) => <div className=" text-center ">{format(row.original.dueDate, 'P', { locale: ptBR })}</div>,
  },
  {
    accessorKey: 'returnDate',
    header: () => <div className=" text-center ">Data de devolução</div>,
    cell: ({ row }) =>
      row.original.returnDate ? (
        <div className=" text-center ">{format(row.original.returnDate, 'P', { locale: ptBR })}</div>
      ) : (
        <div className=" text-center ">
          <Kbd className=" text-center ">Pendente</Kbd>
        </div>
      ),
  },
  {
    accessorKey: 'status',
    header: () => <div className=" text-center ">Status</div>,
    cell: ({ row }) => <BookLoansStatus status={row.original.status} />,
  },
  {
    accessorKey: 'actions',
    header: () => <div className=" text-center ">Ações</div>,
    cell: ({ row }) => <EditButton row={row} />,
  },
];

function BookLoansStatus({ status }: { status: BookLoansWithDetailsDTO['status'] }) {
  return (
    <div className=" text-center ">
      <Kbd className={` text-center text-white ${enumStatusLoanTranslation[status].color}`}>
        {enumStatusLoanTranslation[status].label}
      </Kbd>
    </div>
  );
}

function EditButton({ row }: { row: Row<BookLoansWithDetailsDTO> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleOpenDialog() {
    const params = new URLSearchParams(searchParams.toString());

    params.set('id', row.original.id);
    params.set('dialog', 'edit-loan');

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className=" flex items-center justify-center ">
      <Button className=" h-5 " variant={'ghost'} onClick={handleOpenDialog}>
        <Icon name="pencil" /> Editar
      </Button>
    </div>
  );
}
