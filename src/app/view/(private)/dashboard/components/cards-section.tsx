'use client';

import { BookSelectDTO } from '@/app/api/books/books.dto';
import Icon from '@/components/ui/icon';
import { Item, ItemActions, ItemContent, ItemGroup, ItemHeader, ItemTitle } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function CardStatsSection() {
  const { data: booksCountsData, isLoading: loadingBooksCount } = useQuery<{ count: number }>({
    queryKey: ['books', 'count'],
    queryFn: async () => await apiClient.get<{ count: number }>('/books/counts').then((res) => res.data),
  });

  const { data: unavailableBooksData, isLoading: loadingUnavailableBooks } = useQuery<BookSelectDTO[]>({
    queryKey: ['books', 'unavailable'],
    queryFn: async () => await apiClient.get<BookSelectDTO[]>('/books?status=unavailable').then((res) => res.data),
  });

  const { data: activeBookLoansData, isLoading: loadingActiveBookLoans } = useQuery<{ total: number }>({
    queryKey: ['book-loans', 'active'],
    queryFn: async () =>
      await apiClient.get<{ total: number }>('/book-loans/count?status=ACTIVE').then((res) => res.data),
  });

  return (
    <div>
      <ItemGroup className="flex flex-row gap-4 w-full">
        <Item className="shadow-sm flex-1 min-w-[250px]">
          <ItemHeader className="text-primary flex justify-between items-center">
            <ItemTitle>Total de livros</ItemTitle>
            <ItemActions>
              <Icon name="book" />
            </ItemActions>
          </ItemHeader>
          <ItemContent>
            {loadingBooksCount ? (
              <Skeleton className="h-7 w-25" />
            ) : booksCountsData ? (
              <span className="font-medium text-2xl">{booksCountsData.count}</span>
            ) : (
              <>N/A</>
            )}
          </ItemContent>
        </Item>

        <Item className="shadow-sm flex-1 min-w-[250px]">
          <ItemHeader className="text-primary flex justify-between items-center">
            <ItemTitle>Empréstimos Ativos</ItemTitle>
            <ItemActions>
              <Icon name="users" />
            </ItemActions>
          </ItemHeader>
          <ItemContent>
            {loadingActiveBookLoans ? (
              <Skeleton className="h-7 w-25" />
            ) : activeBookLoansData ? (
              <span className="font-medium text-2xl">{activeBookLoansData.total}</span>
            ) : (
              <>N/A</>
            )}
          </ItemContent>
        </Item>

        <Item className="shadow-sm flex-1 min-w-[250px]">
          <ItemHeader className="text-primary flex justify-between items-center">
            <ItemTitle>Livros em falta</ItemTitle>
            <ItemActions>
              <Icon name="alertCircle" />
            </ItemActions>
          </ItemHeader>
          <ItemContent>
            {loadingUnavailableBooks ? (
              <Skeleton className="h-7 w-25" />
            ) : unavailableBooksData ? (
              <span className="font-medium text-2xl">{unavailableBooksData.length}</span>
            ) : (
              <>N/A</>
            )}
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  );
}
