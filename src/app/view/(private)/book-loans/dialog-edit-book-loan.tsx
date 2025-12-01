'use client';

import { BookLoansWithDetailsDTO } from '@/app/api/book-loans/book-loans.dto';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DialogEditBookLoanForm from './dialog-edit-book-loan-form';

export default function DialogEditBookLoan() {
  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: dataBookLoan } = useQuery<BookLoansWithDetailsDTO>({
    queryKey: ['book-loan', searchParams.get('id')],
    queryFn: async () => {
      const response = await apiClient.get<BookLoansWithDetailsDTO>(`/book-loans/${searchParams.get('id')}`);
      return response.data;
    },
    enabled: Boolean(searchParams.get('id')),
  });

  const { mutate: mutateDeleteLoan, isPending: pendingDeleteLoan } = useMutation<
    { message: string },
    AxiosError<{ message: string }>
  >({
    mutationFn: async () => {
      const response = await apiClient.delete(`/book-loans/${searchParams.get('id')}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['book-loans'] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });

  const { mutate: mutateReturnLoan, isPending: pendingReturnLoan } = useMutation<
    { message: string },
    AxiosError<{ message: string }>
  >({
    mutationFn: async () => {
      const response = await apiClient.patch(`/book-loans/${searchParams.get('id')}/return`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['book-loans'] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });

  function handleOpenChange(value: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
    } else {
      params.delete('dialog');
      params.delete('id');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if (searchParams.get('dialog') == 'edit-loan') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [searchParams]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className=" hidden ">Open</DialogTrigger>
      <DialogContent className=" min-w-1/3 ">
        <DialogHeader>
          <DialogTitle>Editar agendamento</DialogTitle>
          <DialogDescription>Editar agendamento de empréstimo</DialogDescription>
        </DialogHeader>
        <Separator />

        <DialogEditBookLoanForm dataBookLoan={dataBookLoan} />

        <Separator />
        <DialogFooter className=" sm:justify-between ">
          {!dataBookLoan?.returnDate && (
            <Button onClick={() => mutateDeleteLoan()} variant={'destructive-outline'}>
              {pendingDeleteLoan ? (
                <Spinner />
              ) : (
                <>
                  <Icon name="x" /> Cancelar empréstimo
                </>
              )}
            </Button>
          )}
          <Button
            variant={dataBookLoan?.returnDate ? 'outline' : 'default'}
            onClick={() => mutateReturnLoan()}
            disabled={!dataBookLoan || !!dataBookLoan.returnDate}
          >
            {pendingReturnLoan ? (
              <Spinner />
            ) : dataBookLoan?.returnDate ? (
              <>
                <Icon name="check" /> Empréstimo concluído
              </>
            ) : (
              <>
                <Icon name="check" /> Concluir empréstimo
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
