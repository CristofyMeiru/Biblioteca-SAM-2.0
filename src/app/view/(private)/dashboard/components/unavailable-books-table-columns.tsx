import { BookSelectDTO } from "@/app/api/books/books.dto";
import { Kbd } from "@/components/ui/kbd";
import type { ColumnDef } from "@tanstack/react-table";
import { capitalCase } from "change-case";

export const unavailableBooksColumns: ColumnDef<BookSelectDTO>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ renderValue }) => <span>{capitalCase(String(renderValue()))}</span>,
  },
  {
    accessorKey: "authorName",
    header: "Autor",
    cell: ({ renderValue }) => <span>{capitalCase(String(renderValue()))}</span>,
  },
  {
    accessorKey: "genre",
    header: "Gênero",
    cell: ({ renderValue }) => (
      <Kbd className=" bg-primary/10 text-green-900 text-[14px] ">{capitalCase(String(renderValue()))}</Kbd>
    ),
  },
  {
    accessorKey: "loanedQuantity",
    header: ()=> <div className=" w-full text-center " >Emprestimos</div>,
    cell: ({ row }) => {
      const value = row.getValue("loanedQuantity") as number;
      return (
        <div className=" w-full text-center  ">
          <Kbd className=" bg-destructive/10 text-destructive ">{value}</Kbd>
        </div>
      );
    },
  },
];
