import { Kbd } from "@/components/ui/kbd";
import type { ColumnDef } from "@tanstack/react-table";

export type Book = {
  title: string;
  author: string;
  category: string;
  loans: number;
};

export const unavailableBooksColumns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "author",
    header: "Autor",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "loans",
    header: "Reservas",
    cell: ({ row }) => {
      const value = row.getValue("loans") as number;
      return <Kbd className=" bg-destructive/10 text-destructive ">{value}</Kbd>;
    },
  },
];
