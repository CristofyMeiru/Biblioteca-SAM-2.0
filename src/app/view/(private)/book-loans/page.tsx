'use client';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import BookLoansTable from './book-loans-table';
import { BookLoansPageContextProvider } from './context';
import CreateBookLoansDialog from './dialog-create-book-loan';

export default function BookLoansPage() {
  return (
    <BookLoansPageContextProvider>
      <main className=" w-full p-8 ">
        <section className="flex justify-between items-center">
          <div className=" flex items-center space-x-2 ">
            <Button size={'icon-lg'} className=" disabled:opacity-100 " disabled>
              <Icon name="handshake" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Empréstimos de Livros</h1>
              <span className=" text-sm text-muted-foreground">Gerencie os empréstimos de livros</span>
            </div>
          </div>
          <CreateBookLoansDialog />
        </section>

        <BookLoansTable />
      </main>
    </BookLoansPageContextProvider>
  );
}
