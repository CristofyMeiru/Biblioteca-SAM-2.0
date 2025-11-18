"use client";

import { BookSelectDTO } from "@/app/api/books/books.dto";
import Icon from "@/components/ui/icon";
import { Item, ItemActions, ItemContent, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import apiClient from "@/lib/api";
import { useQuery } from "@tanstack/react-query";



export default function CardStatsSection() {
  const itemGroupClassname: string = " flex-col md:flex-row gap-4 ";
  const itemClassname = " shadow-sm w-full lg:w-1/2 ";

  const { data: booksCountsData, isLoading: loadingBooksCount } = useQuery<{ count: number }>({
    queryKey: ["books", "count"],
    queryFn: async () => {
      const response = await apiClient.get<{ count: number }>("/books/counts");

      return response.data;
    },
  });

  const { data: unavailableBooksData, isLoading: loadingUnavailableBooks } = useQuery<BookSelectDTO[]>({
    queryKey: ["books", "unavailable"],
    queryFn: async () => {
      const response = await apiClient.get<BookSelectDTO[]>("/books?status=unavailable");

      return response.data;
    },
  });

  return (
    <div>
      <ItemGroup className="flex-col lg:flex-row w-full  gap-4">
        <ItemGroup className={itemGroupClassname}>
          <Item className={itemClassname}>
            <ItemHeader className=" text-primary flex justify-between items-center">
              <ItemTitle>Total de livros</ItemTitle>
              <ItemActions>
                <Icon name="book" />
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              {loadingBooksCount ? (
                <Skeleton className=" h-7 w-25 " />
              ) : booksCountsData ? (
                <span className="font-medium text-2xl">{booksCountsData?.count}</span>
              ) : (
                <>N/A</>
              )}
              <span className="text-primary">+12% desde o mês passado</span>
            </ItemContent>
          </Item>

          <Item className={itemClassname}>
            <ItemHeader className="text-primary flex justify-between items-center">
              <ItemTitle>Empréstimos Ativos</ItemTitle>
              <ItemActions>
                <Icon name="users" />
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              <span className="font-medium text-2xl">84</span>
              <span className="text-primary">+12% desde o mês passado</span>
            </ItemContent>
          </Item>
        </ItemGroup>

        <ItemGroup className={itemGroupClassname}>
          <Item className={itemClassname}>
            <ItemHeader className="text-primary flex justify-between items-center">
              <ItemTitle>Livros em falta</ItemTitle>
              <ItemActions>
                <Icon name="alertCircle" />
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              {loadingUnavailableBooks ? (
                <Skeleton className=" h-7 w-25 " />
              ) : unavailableBooksData ? (
                <span className="font-medium text-2xl">{unavailableBooksData?.length}</span>
              ) : (
                <>N/A</>
              )}
              <span className="text-primary">+3% desde o mês passado</span>
            </ItemContent>
          </Item>

          <Item className={itemClassname}>
            <ItemHeader className="text-primary flex justify-between items-center">
              <ItemTitle>Taxa de devolução</ItemTitle>
              <ItemActions>
                <Icon name="undo2" />
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              <span className="font-medium text-2xl">94</span>
              <span className="text-primary">+5% desde o mês passado</span>
            </ItemContent>
          </Item>
        </ItemGroup>
      </ItemGroup>
    </div>
  );
}
