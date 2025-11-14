import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Button } from './button';
import Icon from './icon';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Skeleton } from './skeleton';
import * as scnTable from './table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  pagination?: PaginationState;
  name: string;
  children?: React.ReactNode;
}

interface DataTableContext<TData> {
  table: Table<TData>;
  isLoading: boolean;
  name: string;
}

const dataTableContext = React.createContext<DataTableContext<any> | null>(null);

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  pagination: paginationOptions,
  name,
  children,
}: DataTableProps<TData, TValue>) {
  const defaultPageSize: number | string = localStorage.getItem(`${name}-page-size`) ?? Number(15);

  const [pagination, setPagination] = React.useState<PaginationState>(
    paginationOptions ?? { pageIndex: 0, pageSize: Number(defaultPageSize) }
  );

  const table = useReactTable<TData>({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <dataTableContext.Provider value={{ table, isLoading, name }}>{children}</dataTableContext.Provider>;
}

export function DataTableHeader({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(dataTableContext);
  if (!ctx) throw new Error('DataTableContent must be inside <DataTable>');

  return <section>{children}</section>;
}

export function DataTableInputSearch() {
  const [value, setValue] = React.useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';
    setValue(currentSearch);
  }, [searchParams]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) {
        params.delete('search');
      } else {
        params.set('search', value);
      }

      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;

      router.replace(url);
      router.refresh();
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, pathname, router, searchParams]);

  return (
    <div className="relative w-1/3">
      <Input placeholder="Pesquisar..." className="pr-12" onChange={(e) => setValue(e.target.value)} value={value} />
      <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2">
        <Icon name="search" />
      </Button>
    </div>
  );
}

export function DataTableContent() {
  const ctx = React.useContext(dataTableContext);
  if (!ctx) throw new Error('DataTableContent must be inside <DataTable>');

  const { table, isLoading } = ctx;

  const pageSize = table.getState().pagination.pageSize;

  const columns = table.getAllColumns().filter((col) => col.getIsVisible());

  return (
    <scnTable.Table>
      <scnTable.TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <scnTable.TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <scnTable.TableHead key={index} className="text-green-950/80 dark:text-green-100">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </scnTable.TableHead>
            ))}
          </scnTable.TableRow>
        ))}
      </scnTable.TableHeader>

      <scnTable.TableBody>
        {isLoading ? (
          Array(pageSize)
            .fill(0)
            .map((_, i) => (
              <scnTable.TableRow key={i}>
                <scnTable.TableCell colSpan={columns.length}>
                  <Skeleton className="w-full h-6" />
                </scnTable.TableCell>
              </scnTable.TableRow>
            ))
        ) : table.getRowModel().rows.length ? (
          <>
            {table.getRowModel().rows.map((row) => (
              <scnTable.TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                {row.getVisibleCells().map((cell, index) => (
                  <scnTable.TableCell key={index}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </scnTable.TableCell>
                ))}
              </scnTable.TableRow>
            ))}

            {Array.from({
              length: Math.max(0, pageSize - table.getRowModel().rows.length),
            }).map((_, i) => (
              <scnTable.TableRow key={`empty-${i}`} className="h-10 opacity-0">
                {Array.from({ length: columns.length }).map((__, j) => (
                  <scnTable.TableCell key={j}> </scnTable.TableCell>
                ))}
              </scnTable.TableRow>
            ))}
          </>
        ) : (
          <>
            <scnTable.TableRow>
              <scnTable.TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado.
              </scnTable.TableCell>
            </scnTable.TableRow>

            {Array.from({ length: pageSize }).map((_, i) => (
              <scnTable.TableRow key={`empty-nores-${i}`} className="h-10 opacity-0">
                {Array.from({ length: columns.length }).map((__, j) => (
                  <scnTable.TableCell key={j}> </scnTable.TableCell>
                ))}
              </scnTable.TableRow>
            ))}
          </>
        )}
      </scnTable.TableBody>
    </scnTable.Table>
  );
}

const tableSizes: number[] = [10, 15, 20, 25, 30]; // add values here to new size options
export function DataTablePagination() {
  const ctx = React.useContext(dataTableContext);
  if (!ctx) throw new Error('DataTablePagination must be inside <DataTable>');

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { table, name } = ctx;

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  const total = table.getFilteredRowModel().rows.length;

  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);

  function handleChangeSize(value: number | string) {
    localStorage.setItem(`${name}-page-size`, String(value));
    table.setPagination((prev) => ({
      ...prev,
      pageSize: Number(value),
      pageIndex: 0,
    }));
  }

  React.useEffect(() => {
    const current = new URLSearchParams(searchParams.toString());

    const pageFromTable = String(pageIndex + 1);
    const limitFromTable = String(pageSize);

    let changed = false;
    if (current.get('page') !== pageFromTable) {
      current.set('page', pageFromTable);
      changed = true;
    }
    if (current.get('limit') !== limitFromTable) {
      current.set('limit', limitFromTable);
      changed = true;
    }

    if (!changed) return; 

    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  }, [pageIndex, pageSize, searchParams, pathname, router]);
  return (
    <section className="grid items-center grid-rows-1 grid-cols-3">
      <span className="col-span-1 text-sm text-muted-foreground">
        Exibindo {start}-{end} de {total}
      </span>

      <section className="flex items-center justify-center col-span-1 space-x-2">
        <Button onClick={() => table.setPageIndex(0)} variant="outline" disabled={pageIndex == 0}>
          <Icon name="chevronFirst" />
        </Button>

        <Button onClick={() => table.previousPage()} variant="outline" disabled={!table.getCanPreviousPage()}>
          <Icon name="chevronLeft" />
        </Button>

        <Button variant="outline">{pageIndex + 1}</Button>

        <Button onClick={() => table.setPageIndex(pageIndex + 1)} variant="outline">
          <Icon name="chevronRight" />
        </Button>

        <Button onClick={() => table.setPageIndex(table.getPageCount?.() - 1)} variant="outline">
          <Icon name="chevronLast" />
        </Button>
      </section>

      <div className="col-span-1 flex items-center justify-end">
        <span className="text-sm text-muted-foreground mr-2">Tamanho da página</span>
        <Select defaultValue={String(pageSize)} onValueChange={handleChangeSize}>
          <SelectTrigger className="min-w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tableSizes.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}

export const useDataTable = () => {
  const ctx = React.useContext(dataTableContext);
  if (!ctx) throw new Error('useDataTable must be used inside <DataTable>');
  return ctx;
};
