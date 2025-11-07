'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIError } from 'better-auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CreateUser, createUserSchema } from './schemas';

export default function CreateNewUserDialog() {
  const queryClient = useQueryClient();

  const [showPass, setShowPass] = useState<boolean>(false);

  const formNewUser = useForm<CreateUser>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(createUserSchema),
  });

  const { mutate: mutateNewUser, isPending: pendingNewUser } = useMutation<unknown, APIError, CreateUser>({
    mutationKey: ['new-user'],
    mutationFn: async (data: CreateUser) => {
      const result = authClient.admin.createUser({ name: data.name, email: data.email, password: data.password });

      return result;
    },
    onSuccess: () => {
      toast.success('Usuário criado com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Não foi possível criar o usuário.');
    },
  });

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'default' })}>
        <Icon name="plus" /> Novo usuário
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className=" flex space-x-2 ">
            <Button className=" disabled:opacity-100 " size={'icon'} disabled>
              <Icon name="plus" />
            </Button>
            <div>
              <DialogTitle>Criar novo usuário</DialogTitle>
              <DialogDescription>Preencha as informações para criar o novo usuário</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...formNewUser}>
          <form className=" space-y-5 " onSubmit={formNewUser.handleSubmit((data) => mutateNewUser(data))}>
            <FormField
              control={formNewUser.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe o nome completo do usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formNewUser.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Informe o email institucional do usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formNewUser.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className=' flex items-center justify-between '>
                    <FormLabel>Senha</FormLabel>
                    <span onClick={() => setShowPass(!showPass)} className=" cursor-pointer text-sm ">
                      {showPass ? 'Ocultar senha' : 'Mostrar senha'}
                    </span>
                  </div>
                  <FormControl>
                    <Input type={showPass ? 'text' : 'password'} placeholder="Informe uma senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formNewUser.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Informe a senha novamente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={pendingNewUser}>
              {pendingNewUser ? (
                <Spinner />
              ) : (
                <>
                  <Icon name="plus" />
                  Criar
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
