'use client';

import { BookSelectDTO } from '@/app/api/books/books.dto';
import { buttonVariants } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Item, ItemActions, ItemHeader, ItemTitle } from '@/components/ui/item';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { DashboardTable } from './table';
import { unavailableBooksColumns } from './unavailable-books-table-columns';

export function UnavailableBooksTable() {
  const { data: unavailableBooksData, isLoading: loadingUnavailableBooks } = useQuery<BookSelectDTO[]>({
    queryKey: ['books', 'unavailable'],
    queryFn: async () => {
      const response = await apiClient.get<BookSelectDTO[]>('/books?status=unavailable');

      return response.data;
    },
  });

  return (
    <Item className=" flex-1 p-4 pb-5 shadow-md">
      <ItemHeader>
        <ItemTitle>
          <Icon name="alertCircle" className=" text-destructive size-7 " />
          <span className=" text-lg font-medium text-destructive ">Livros em falta</span>
        </ItemTitle>
        <ItemActions>
          <Tooltip>
            <TooltipTrigger className={buttonVariants({ variant: 'outline' })}>
              <Icon name="fileText" />
            </TooltipTrigger>
            <TooltipContent>
              <span>Gerar relatório</span>
            </TooltipContent>
          </Tooltip>
        </ItemActions>
      </ItemHeader>
      <DashboardTable
        columns={unavailableBooksColumns}
        data={unavailableBooksData ?? []}
        isLoading={loadingUnavailableBooks}
      />
    </Item>
  );
}
