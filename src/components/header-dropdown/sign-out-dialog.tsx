import { authClient } from '@/lib/auth-client';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { buttonVariants } from '../ui/button';
import Icon from '../ui/icon';
import { Spinner } from '../ui/spinner';

export default function SignOutDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: mutateSignOut, isPending: pendingSignOut } = useMutation({
    mutationKey: ['sign-out'],
    mutationFn: async () => {
      const { data, error } = await authClient.signOut();

      if (error) throw new Error('Não foi possível sair da sessão atual.');
      return data;
    },
    onError: () => {
      toast.error('Não foi possível sair da sessão atual.');
    },
  });

  function handleOpen(open: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (open) {
      params.set('sign-out-dialog', 'open');
    } else {
      params.delete('sign-out-dialog');
    }

    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  useEffect(() => {
    const signOutDialogIsOpen = searchParams.get('sign-out-dialog');
    if (signOutDialogIsOpen) setIsOpen(true);
    else setIsOpen(false);
  }, [searchParams]);

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpen}>
      <AlertDialogTrigger className={` hidden `}></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sair agora?</AlertDialogTitle>
          <AlertDialogDescription>
            Você será desconectado(a) desssa sessão, sendo necessário entrar novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutateSignOut()} className={buttonVariants({ variant: 'destructive' })}>
            {pendingSignOut ? (
              <Spinner />
            ) : (
              <>
                <Icon name="doorOpen" /> Sair
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
