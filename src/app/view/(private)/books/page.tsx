"use client";

import { BookSelectDTO } from "@/app/api/books/books.dto";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import Icon from "@/components/ui/icon";
import apiClient from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { booksTableColumns } from "./components/book-table-columns";
import { BooksTable } from "./components/books-table";
import CreateBookDialog from "./components/create-book-dialog";

export default function BooksPage() {
  const { data: booksData, isLoading: loadingBooks } = useQuery<BookSelectDTO[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await apiClient.get<BookSelectDTO[]>("/books", {
        params: {
          limit: 50,
          page: 1,
        },
      });

      return result.data;
    },
  });

  return (
    <main className=" p-8 ">
      <section className=" flex justify-between items-center ">
        <div className=" flex items-center space-x-2 ">
          <Button size={"icon-lg"} className=" disabled:opacity-100 " disabled>
            <Icon name="layers" />
          </Button>
          <div>
            <h1 className=" text-2xl font-semibold ">Acervo de livros</h1>
            <span className=" text-muted-foreground text-sm ">Visualize e gerencie todo o acervo da biblioteca</span>
          </div>
        </div>
        <ButtonGroup>
          <CreateBookDialog />
          <ButtonGroupSeparator />
          <Button></Button>
        </ButtonGroup>
      </section>
      <section>
        <BooksTable columns={booksTableColumns} data={booksData ?? []} isLoading={loadingBooks} />
      </section>
    </main>
  );
}
