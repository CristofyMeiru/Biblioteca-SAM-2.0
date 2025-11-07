'use client';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIError } from 'better-auth';
import { UserWithRole } from 'better-auth/plugins';
import { capitalCase } from 'change-case';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import DeleteUserDialog from './delete-user-dialog';
import { EditUser, editUserSchema, newPasswordSchema, NewUserPassword } from './schemas';

type InitialData = EditUser & {
  id: string;
};

export default function EditUserDialog({ initialData }: { initialData: InitialData }) {
  const [inPasswordEdit, setInPasswordEdit] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const formEditUser = useForm<EditUser>({
    defaultValues: {
      email: initialData.email,
      name: initialData.name,
    },
    resolver: zodResolver(editUserSchema),
  });

  const formEditPassword = useForm<NewUserPassword>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(newPasswordSchema),
  });

  const { mutate: mutateEditUser, isPending: pendingEdituser } = useMutation<UserWithRole, Error | APIError, EditUser>({
    mutationKey: ['edit-user', initialData.id],
    mutationFn: async (data) => {
      let payload: Partial<EditUser> = {};

      if (initialData.name != data.name) payload.name = data.name;
      if (initialData.email != data.email) payload.email = data.email;
      if (initialData.role != data.role) payload.role = data.role;

      if (!payload) throw new Error('Nenhum dado alterado.');

      const result = await authClient.admin.updateUser({ userId: initialData.id, data: { ...payload } });

      if (result.error) throw result.error;

      return result.data;
    },
    onSuccess: (data) => {
      toast.success('Usuário atualizado com sucesso.', { description: data.name });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      formEditUser.reset(data);
    },
    onError: (error) => {
      const description = error instanceof Error ? error.message : '';
      toast.error('Não foi possível atualizar os dados', { description });
    },
  });

  const { mutate: mutateNewPassword, isPending: pendingEditPass } = useMutation<unknown, APIError, NewUserPassword>({
    mutationKey: ['new-pass', initialData.id],
    mutationFn: async (data) => {
      const result = await authClient.admin.setUserPassword({ userId: initialData.id, newPassword: data.password });

      if (result.error) throw result.error;

      return result;
    },
    onSuccess: () => {
      toast.success('Senha alterada com sucesso.');
      formEditPassword.reset();
      setInPasswordEdit(false);
    },
    onError: () => {
      toast.error('Não foi possível alterar a senha.');
    },
  });

  function handleOpenChange(open: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (open) {
      params.set('edit-dialog', 'open');
    } else {
      params.delete('edit-dialog');
      params.delete('id');
    }

    router.replace(`${pathname}?${params.toString()}`);
    formEditUser.reset();
    router.refresh();
    setInPasswordEdit(false);
    formEditPassword.reset();
  }

  function handleCancelPasswordEdit() {
    setInPasswordEdit(false);
    formEditPassword.reset();
  }

  useEffect(() => {
    const paramIsOpen = searchParams.get('edit-dialog');
    const paramId = searchParams.get('id');
    setIsOpen(paramIsOpen === 'open' && paramId === initialData.id);
  }, [searchParams]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className=" hidden ">Nada aqui</DialogTrigger>
      <DialogContent className=" min-w-1/3 ">
        <DialogHeader>
          <div className=" flex space-x-2 items-center ">
            <Button className=" disabled:opacity-100 " size={'icon'} disabled>
              <Icon name="pencil" />
            </Button>
            <div>
              <DialogTitle>Edição de usuário</DialogTitle>
              <DialogDescription>{initialData.name}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...formEditUser}>
          <form className=" space-y-4 " onSubmit={formEditUser.handleSubmit((data) => mutateEditUser(data))}>
            <FormField
              control={formEditUser.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formEditUser.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formEditUser.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Papel administrativo</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className=" w-full ">
                        <SelectValue
                          placeholder={capitalCase(initialData.role == 'user' ? 'Bibliotecário' : 'Admin')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">Bibliotecário</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex justify-between items-baseline ">
              <Button onClick={() => setInPasswordEdit(true)} type="button" size={'sm'} variant={'link'}>
                Redefinir senha
              </Button>
              <Button size={'sm'} disabled={pendingEdituser}>
                {pendingEdituser ? (
                  <Spinner />
                ) : (
                  <>
                    <Icon name="save" /> Salvar
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {inPasswordEdit && <Separator />}

        {inPasswordEdit && (
          <div>
            <Form {...formEditPassword}>
              <form className=" space-y-4 " onSubmit={formEditPassword.handleSubmit((data) => mutateNewPassword(data))}>
                <FormField
                  control={formEditPassword.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova senha</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe a nova senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formEditPassword.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar a senha</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe a senha novamente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" w-full flex justify-end space-x-2 ">
                  <Button onClick={handleCancelPasswordEdit} type="button" variant={'destructive-outline'} size={'sm'}>
                    <Icon name="x" /> Cancelar
                  </Button>
                  <Button size={'sm'} disabled={pendingEditPass}>
                    {pendingEditPass ? (
                      <Spinner />
                    ) : (
                      <>
                        <Icon name="save" /> Salvar senha
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
        <Separator />
        <DialogFooter>
          <DeleteUserDialog handleOpenChangeDialog={handleOpenChange} data={initialData} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
