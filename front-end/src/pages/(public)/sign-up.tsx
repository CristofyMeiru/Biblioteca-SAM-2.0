import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const newUser = {
    name: "Nome do Usuário",
    email: "usuario@exemplo.com",
    password: "senha-segura-123",
  };

  async function handleSignUp() {
    const { data, error } = await authClient.signUp.email({
      ...newUser,
    });

    if (error) {
      console.log(error);
      return;
    }
    console.log("Usuário cadastrado com sucesso.", data.user);
  }

  return (
    <div>
      <Button onClick={() => handleSignUp()}>Cadastrar</Button>
    </div>
  );
}
