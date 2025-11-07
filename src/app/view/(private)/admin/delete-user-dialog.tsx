'use client';
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
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { authClient } from '@/lib/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteUserDialogProps {
  id: string;
  name: string;
}

export default function DeleteUserDialog({
  ...props
}: {
  data: DeleteUserDialogProps;
  handleOpenChangeDialog: Function;
}) {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteUser } = useMutation({
    mutationKey: ['delete-user', props.data.id],
    mutationFn: async () => {
      const result = await authClient.admin.removeUser({ userId: props.data.id });

      return result;
    },
    onMutate: () => {
      const toastId = toast.loading(`Deletando usuário: ${props.data.name}`);

      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) {
        toast.success('Usuário deletado com sucesso.', { id: context.toastId });
      }
      queryClient.invalidateQueries({ queryKey: ['users'] });
      props.handleOpenChangeDialog();
    },
    onError: (_error, _variables, context) => {
      if (context?.toastId) {
        toast.error('Não foi possível excluir o usuário.', { id: context.toastId });
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: 'destructive-link' })}>
        Excluir usuário
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao fazer isso não será possível recuperar o usuário e seus respectivos dados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {' '}
            <Icon name="x" /> Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={()=> mutateDeleteUser()} className={buttonVariants({ variant: 'destructive' })}>
            <Icon name="trash" /> Excluir usuário
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
