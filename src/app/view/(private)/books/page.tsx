'use client';

import { BookSelectDTO, CreateBookDTO } from '@/app/api/books/books.dto';
import { AquisitionMethodEnum, MaterialTypeEnum } from '@/app/api/books/books.pipe';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableInputSearch,
  DataTablePagination,
} from '@/components/ui/data-table';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { booksTableColumns } from './components/book-table-columns';
import CreateBookDialog from './components/create-book-dialog';

export type LivroInfo = {
  TIPO_DE_MATERIAL: string;
  AQUISIÇÃO: string;
  EDITORA: string;
  TÍTULO: string;
  AUTOR: string;
  GÊNERO: string;
  PÁGINAS: string;
  ISBN: string;
  QUANTIDADE: string;
  TOMBO: string;
  CDD_OU_CDU: string;
  EDIÇÃO: string;
};

export default function BooksPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? null;
  const pageParam = searchParams.get('page') ?? '1';
  const limitParam = searchParams.get('limit') ?? '50';
  const page = Number(pageParam);
  const limit = Number(limitParam);


  const {
    data: booksData,
    isLoading: loadingBooks,
  } = useQuery<BookSelectDTO[]>({
    queryKey: ['books', { search, page, limit }],
    queryFn: async () => {
      const result = await apiClient.get<BookSelectDTO[]>('/books', {
        params: {
          limit,
          page,
          search,
        },
      });

      return result.data;
    },
    enabled: true,
  });

  function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function adicionaTudo() {
    const res = await fetch('/data/CORDEL-POEMA-ROMANCE_ATUALIZADO_MOD.json');
    const data: LivroInfo[] = await res.json();

    const formattedData: CreateBookDTO[] = data.map((book) => ({
      title: book.TÍTULO,
      genre: book.GÊNERO,
      authorName: book.AUTOR,
      publisher: book.EDITORA,
      quantity: book.QUANTIDADE,
      pagesQuantity: book.PÁGINAS,
      isbn: book.ISBN,
      tombo: book.TOMBO,
      materialType: book.TIPO_DE_MATERIAL ? (book.TIPO_DE_MATERIAL.toLowerCase() as MaterialTypeEnum) : undefined,
      edition: book.EDIÇÃO,
      cddOrCdu: book.CDD_OU_CDU,
      aquisitionMethod: book.AQUISIÇÃO ? (book.AQUISIÇÃO.toLowerCase() as AquisitionMethodEnum) : undefined,
    }));

    console.log(formattedData);

    let successInsertCount = 0;
    let failInsertCount = 0;

    for (const book of formattedData) {
      try {
        const res = await apiClient.post('/books', book);

        if (res.status === 201) {
          successInsertCount++;
        } else {
          failInsertCount++;
        }
      } catch {
        failInsertCount++;
      }

      await wait(100);
    }

    console.log('Sucedido:', successInsertCount);
    console.log('Falhou:', failInsertCount);
  }


  return (
    <main className=" p-8 ">
      <section className=" flex justify-between items-center ">
        <div className=" flex items-center space-x-2 ">
          <Button size={'icon-lg'} className=" disabled:opacity-100 " disabled>
            <Icon name="layers" />
          </Button>
          <div>
            <h1 className=" text-2xl font-semibold ">Acervo de livros</h1>
            <span className=" text-muted-foreground text-sm ">Visualize e gerencie todo o acervo da biblioteca</span>
          </div>
        </div>
        <ButtonGroup>
          <CreateBookDialog />
        </ButtonGroup>
      </section>
      <Separator className=" my-4 " />
      <section className=" flex flex-col space-y-2">
        <DataTable name="books" columns={booksTableColumns} data={booksData ?? []} isLoading={loadingBooks}>
          <DataTableHeader>
            <DataTableInputSearch />
          </DataTableHeader>
          <DataTableContent />
          <DataTablePagination />
        </DataTable>
      </section>

      <Button onClick={adicionaTudo}>Adiciona tudo</Button>
    </main>
  );
}
