import { authClient } from '@/lib/auth-client';
import { useMutation } from '@tanstack/react-query';
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

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: 'destructive' })}>
        <Icon name="doorOpen" /> Sair
      </AlertDialogTrigger>
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
