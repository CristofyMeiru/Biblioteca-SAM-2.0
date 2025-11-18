'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { APIError, User } from 'better-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { authUserSchema, type AuthUser } from './auth.schema';


export default function LogInPage() {
  const [showPass, setShowPass] = useState<boolean>();
  const router = useRouter();

  const authForm = useForm<AuthUser>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(authUserSchema),
  });

  const { mutate: mutateAuthUser, isPending: pendingAuthentication } = useMutation<
    User,
    APIError & { code: string },
    AuthUser
  >({
    mutationKey: ['auth-user'],
    mutationFn: async (signInData: AuthUser) => {
      const { data, error } = await authClient.signIn.email({ ...signInData });

      if (error) throw error;

      return data.user;
    },
    onSuccess: (data) => {
      router.replace('/view/dashboard');
      const name = data.name.split(' ');
      toast.success(`Bem vindo(a), novamente ${name[0]} ${name[1]}`);
    },
    onError: (error: any) => {
      console.log(error.code);
      toast.error('Não foi possível realizar a autenticação.', {
        description: error.code == 'INVALID_EMAIL_OR_PASSWORD' ? 'Senha ou email incorretos.' : undefined,
      });
    },
  });

  return (
    <main className=" flex w-full h-screen  ">
      <section className="  h-full flex flex-col flex-1 justify-center items-center ">
        <div className=" flex flex-col items-center mb-10">
          <Image src="/logo.png" width={100} height={130} alt="/logo.png" className=" size-20 " />
          <h1 className=" text-3xl font-semibold text-green-900 dark:text-green-500 ">Biblioteca-SAM</h1>
        </div>
        <Form {...authForm}>
          <form onSubmit={authForm.handleSubmit((data) => mutateAuthUser(data))} className=" space-y-5 w-2/5 ">
            <div className=" text-center ">
              <h1 className=" text-2xl font-semibold ">Bem-vindo de volta! </h1>
              <span className=" text-sm text-muted-foreground ">Entre na sua conta para gerenciar a biblioteca.</span>
            </div>
            <FormField
              control={authForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className=" h-11 " placeholder="seu.email@prof.ce.gov.br" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={authForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className=" flex justify-between ">
                    <FormLabel>Senha</FormLabel>
                    <span onClick={() => setShowPass(!showPass)} className=" text-sm cursor-pointer ">
                      {showPass ? 'Ocultar senha' : 'Mostrar senha'}
                    </span>
                  </div>
                  <FormControl>
                    <Input
                      className=" h-11 "
                      type={showPass ? 'text' : 'password'}
                      placeholder="Informe sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className=" w-full ">{pendingAuthentication ? <Spinner /> : 'Entrar'}</Button>
          </form>
        </Form>
        <div className=" flex items-baseline space-x-1 ">
          <span className=" text-sm mt-4 text-muted-foreground ">Esqueceu a senha?</span>{' '}
          <Button className=" !p-0 h-fit " variant={'link'}>
            Clique aqui
          </Button>
        </div>
      </section>
      <aside className=" flex-1 ">
        <Image
          className=" w-full h-full "
          src={'/books-background.png'}
          width={1080}
          height={1720}
          alt="books-background"
        />
      </aside>
    </main>
  );
}
