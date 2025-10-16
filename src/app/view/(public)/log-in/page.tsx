"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useSignIn from "@/hooks/use-sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authUserSchema, type AuthUser } from "./auth.schema";

export default function LogInPage() {
  const [showPass, setShowPass] = useState<boolean>();

  const authForm = useForm<AuthUser>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(authUserSchema),
  });

  const { mutate: mutateAuthUser, isPending: pendingAuthentication } = useSignIn();

  return (
    <main className=" flex w-full h-screen  ">
      <section className="  h-full flex flex-col flex-1 justify-center items-center ">
        <div className=" flex flex-col items-center mb-10">
          <img src="/livro.png" alt="logo.png" className=" h-20 " />
          <h1 className=" text-3xl font-semibold text-green-900 ">Biblioteca-SAM</h1>
        </div>
        <Form {...authForm}>
          <form onSubmit={authForm.handleSubmit((data) => mutateAuthUser(data))} className=" space-y-5 w-2/5 ">
            <div className=" text-center ">
              <h1 className=" text-2xl font-semibold ">Bem-vindo de volta! </h1>
              <span className=" text-sm text-green-700 ">Entre na sua conta para gerenciar a biblioteca.</span>
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
                      {showPass ? "Ocultar senha" : "Mostrar senha"}
                    </span>
                  </div>
                  <FormControl>
                    <Input
                      className=" h-11 "
                      type={showPass ? "text" : "password"}
                      placeholder="Informe sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className=" w-full ">{pendingAuthentication ? <Spinner /> : "Entrar"}</Button>
          </form>
        </Form>
        <div className=" flex items-baseline space-x-1 ">
          <span className=" text-sm mt-4 text-neutral-600 ">Esqueceu a senha?</span>{" "}
          <Button className=" !p-0 h-fit  " variant={"link"}>
            Clique aqui
          </Button>
        </div>
      </section>
      <aside className=" flex-1 ">
        <Image className=" w-full h-full " src={"/books-background.png"} width={1080} height={1720} alt="books-background" />
      </aside>
    </main>
  );
}
