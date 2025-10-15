import Icon from "@/components/ui/icon";
import { createFileRoute } from "@tanstack/react-router";
import CardStatsSection from "./-cards-section";
import { CloseLoansTable } from "./-close-loans-table";
import { closeLoansTableColumns, type CloseLoans } from "./-close-loans-table-columns";
import { UnavailableBooksTable } from "./-unavailable-books-table";
import { unavailableBooksColumns, type Book } from "./-unavailable-books-table-columns";

export const Route = createFileRoute("/(private)/dashboard/")({
  component: RouteComponent,
});

const closeLoans: CloseLoans[] = [
  {
    id: "1",
    fullname: "Ana Beatriz Costa",
    book_title: "Dom Casmurro",
    expires_at: new Date("2025-10-20"),
  },
  {
    id: "2",
    fullname: "Lucas Andrade",
    book_title: "O Pequeno Príncipe",
    expires_at: new Date("2025-10-18"),
  },
  {
    id: "3",
    fullname: "Mariana Oliveira",
    book_title: "1984",
    expires_at: new Date("2025-10-25"),
  },
];

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

function RouteComponent() {
  return (
    <div className=" p-4 flex flex-col justify-center items-center w-full ">
      <div className=" w-4/5 flex flex-col justify-center ">
        <div className=" text-green-950  flex items-center space-x-2 ">
          <Icon name="layoutDashboard" className=" size-6 " />
          <h1 className=" text-2xl font-medium ">Painel de controle</h1>
        </div>
        <span className=" text-green-700 mb-5 ">Visão geral do gerenciamento da biblioteca</span>
        <CardStatsSection />
        <div className=" flex flex-col  mt-10 gap-4 ">
          <CloseLoansTable columns={closeLoansTableColumns} data={closeLoans ?? []} />
          <UnavailableBooksTable columns={unavailableBooksColumns} data={books ?? []} />
        </div>
      </div>
    </div>
  );
}
