import { BookSelectDTO } from '@/app/api/books/books.dto';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { ColumnDef } from '@tanstack/react-table';
import { capitalCase } from 'change-case';
import Link from 'next/link';

export const booksTableColumns: ColumnDef<BookSelectDTO>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => (
      <Link href={`/view/books/${String(row.original.id)}`}>
        <Button className=' text-accent-foreground !p-0 h-fit ' variant={"link"}>{capitalCase(String(row.getValue('title')))}</Button>
      </Link>
    ),
  },
  {
    accessorKey: 'authorName',
    header: 'Autor',
    cell: ({ row }) => capitalCase(row.getValue('authorName')),
  },
  {
    accessorKey: 'genre',
    header: () => <div className=" text-center ">Gênero</div>,
    cell: (row) => (
      <div className=" text-center ">
        <Kbd className=" border text-neutral-800 dark:text-neutral-100 py-3 px-5 text-[13px] ">
          {capitalCase(String(row.getValue()))}
        </Kbd>
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: () => {
      return <div className=" text-center ">Qtd. Total</div>;
    },
    cell: ({ row }) => {
      const { quantity } = row.original;

      return <div className=" w-full text-center ">{quantity}</div>;
    },
  },
  {
    accessorKey: 'loanedQuantity',
    header: () => {
      return <div className=" text-center ">Qtd. Alugada</div>;
    },
    cell: ({ row }) => {
      const { loanedQuantity } = row.original;

      return <div className=" w-full text-center ">{loanedQuantity}</div>;
    },
  },
  {
    accessorKey: 'quantity',
    header: () => <div className=" text-center ">Qtd. Disponível</div>,
    cell: ({ row }) => {
      const { quantity, loanedQuantity } = row.original;

      return (
        <div className=" w-full flex items-center justify-center ">
          <Kbd className=" bg-primary/20 text-green-800 dark:text-green-300 ">{quantity - loanedQuantity}</Kbd>
        </div>
      );
    },
  },
  {
    accessorKey: 'edition',
    header: 'Edição',
    cell: ({ row }) => <div className=" text-center ">{capitalCase(row.getValue('edition'))}</div>,
  },
  {
    accessorKey: 'isbn',
    header: 'ISBN',
    cell: ({ row }) => <div className=" text-[13px] ">{row.getValue('isbn')}</div>,
  },
  {
    accessorKey: 'publisher',
    header: 'Editora',
    cell: ({ row }) => capitalCase(row.getValue('publisher')),
  },
  {
    accessorKey: 'tombo',
    header: 'Tombo',
  },
];
