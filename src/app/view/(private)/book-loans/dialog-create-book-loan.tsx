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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AlertStudentValidator from './alert-student-validator';
import { defaultValuesCreateBookLoan, useBookLoansPageContext } from './context';
import DialogCreateBookLoanForm from './dialog-create-book-loan-form';
import DialogQrcodeReader from './dialog-qrcode-reader';

export default function CreateBookLoansDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { setBookData, setReaderState, setStudentData, formCreateBookLoan } = useBookLoansPageContext();

  const [open, setOpen] = useState<boolean>(false);

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
    formCreateBookLoan.reset();
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
            <Button onClick={handleRestart} variant={'outline'}>
              <Icon name="rotateCcw" /> Restaurar
            </Button>
            <Button type="submit">
              <Icon name="handshake" /> Emprestar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
