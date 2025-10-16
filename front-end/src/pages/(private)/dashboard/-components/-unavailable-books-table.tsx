"use client";

import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Item, ItemActions, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type ColumnDef } from "@tanstack/react-table";
import { DashboardTable } from "./-table";
import { unavailableBooksColumns, type Book } from "./-unavailable-books-table-columns";

const books: Book[] = [
  {
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    category: "Ficção política",
    loans: 12,
  },
  {
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasia",
    loans: 8,
  },
  {
    title: "O Sol é para Todos",
    author: "Harper Lee",
    category: "Drama",
    loans: 5,
  },
];

export function UnavailableBooksTable() {
  return (
    <Item variant={"outline"} className=" flex-1 p-4 pb-5 shadow-md">
      <ItemHeader>
        <ItemTitle>
          <Icon name="alertCircle" className=" text-destructive size-7 " />
          <span className=" text-lg font-medium text-destructive ">Livros em falta</span>
        </ItemTitle>
        <ItemActions>
          <Tooltip>
            <TooltipTrigger>
              <Button size={"icon"} variant={"outline"}>
                <Icon name="fileText" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Gerar relatório</span>
            </TooltipContent>
          </Tooltip>
        </ItemActions>
      </ItemHeader>
      <DashboardTable columns={unavailableBooksColumns} data={books} />
    </Item>
  );
}
