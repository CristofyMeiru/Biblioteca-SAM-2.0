"use client";

import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Item, ItemActions, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UnavailableBooksTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows && table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Item>
  );
}
