'use client'

import { Kbd } from "@/components/ui/kbd";
import type { ColumnDef } from "@tanstack/react-table";
import { differenceInDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type CloseLoans = {
  id: string;
  fullname: string;
  book_title: string;
  expires_at: Date;
};

export const closeLoansTableColumns: ColumnDef<CloseLoans>[] = [
  {
    accessorKey: "fullname",
    header: "Aluno",
  },
  {
    accessorKey: "book_title",
    header: "Título",
  },
  {
    accessorKey: "expires_at",
    header: "Vencimento",
    cell: (cell) => format(String(cell.getValue()), "P", { locale: ptBR }),
  },
  {
    accessorKey: "expires_at",
    header: "Dias",
    cell: (cell) => {
      const expiresAt = new Date(String(cell.getValue()));
      const now = new Date();
      const daysLeft = differenceInDays(expiresAt, now);
      return <Kbd>{daysLeft}</Kbd>;
    },
  },
];
