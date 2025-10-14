import bookBg from "@/assets/books-background.png";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useSignIn from "@/hooks/useSignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authUserSchema, type AuthUser } from "./-schema";

export const Route = createFileRoute("/(public)/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
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
        <Form {...authForm}>
          <form onSubmit={authForm.handleSubmit((data) => mutateAuthUser(data))} className=" space-y-5 w-2/5 ">
            <div className=" text-center ">
              <h1 className=" text-2xl font-semibold ">Entrar</h1>
              <span className=" text-sm text-neutral-600 ">Informe seu email educacional e sua senha para entrar.</span>
            </div>
            <FormField
              control={authForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu.email@prof.ce.gov.br" {...field} />
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
                    <Input type={showPass ? "text" : "password"} placeholder="Informe sua senha" {...field} />
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
        <img className=" h-full w-full " src={bookBg} alt="books-background" />
      </aside>
    </main>
  );
}
