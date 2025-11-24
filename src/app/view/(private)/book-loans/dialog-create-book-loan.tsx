import { BookLoansCreateDTO } from '@/app/api/book-loans/book-loans.dto';
import { AppError } from '@/common/resolvers/app-error';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import apiClient from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AlertStudentValidator from './alert-student-validator';
import { defaultValuesCreateBookLoan, useBookLoansPageContext } from './context';
import DialogCreateBookLoanForm from './dialog-create-book-loan-form';
import DialogQrcodeReader from './dialog-qrcode-reader';

export default function CreateBookLoansDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryClient = useQueryClient();

  const { setBookData, setReaderState, setStudentData, formCreateBookLoan } = useBookLoansPageContext();

  const [open, setOpen] = useState<boolean>(false);

  const { mutate: mutateNewBookLoan, isPending: pendingNewBookLoan } = useMutation<
    unknown,
    AppError,
    BookLoansCreateDTO
  >({
    mutationKey: ['new-book-loan'],
    mutationFn: async (data) => {
      const response = await apiClient.post('/book-loans', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Empréstimo criado com sucesso');
      handleRestart();
      queryClient.invalidateQueries({ queryKey: ['book-loans'] });
    },
    onError: (error) => {
      toast.error('Erro ao criar empréstimo', { description: error.message });
    },
  });

  function handleOpenChange(openValue: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    setOpen(openValue);

    setStudentData(null);
    setBookData(null);
    setReaderState('student');
    formCreateBookLoan.reset(defaultValuesCreateBookLoan);

    if (openValue) {
      params.set('dialog', 'new-loan');
    } else {
      params.delete('dialog');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleRestart() {
    formCreateBookLoan.reset(defaultValuesCreateBookLoan);
    setBookData(null);
    setStudentData(null);
    setReaderState('student');
  }

  useEffect(() => {
    if (searchParams.get('dialog')) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [searchParams]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="plus" /> Novo Empréstimo
        </Button>
      </DialogTrigger>
      <DialogContent className=" min-w-[60%] ">
        <DialogHeader>
          <DialogTitle>Novo Empréstimo</DialogTitle>
          <DialogDescription>Adicione um novo empréstimo de livro</DialogDescription>
        </DialogHeader>

        <section className=" flex space-x-2 ">
          <DialogQrcodeReader />
          <Separator orientation="vertical" className=" h-full " />
          <DialogCreateBookLoanForm />
        </section>

        <Separator />

        <DialogFooter className=" items-center sm:justify-between">
          <AlertStudentValidator />

          <div className="flex gap-2">
            <Button onClick={handleRestart} variant={'outline'} disabled={pendingNewBookLoan}>
              <Icon name="rotateCcw" /> Restaurar
            </Button>
            <Button
              onClick={formCreateBookLoan.handleSubmit((data) => mutateNewBookLoan(data))}
              type="submit"
              disabled={pendingNewBookLoan}
            >
              {pendingNewBookLoan ? (
                <Spinner />
              ) : (
                <>
                  <Icon name="handshake" /> Emprestar
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
