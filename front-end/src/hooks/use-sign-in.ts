import { authClient } from "@/lib/auth-client";
import type { AuthUser } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import {} from "better-auth";
import { toast } from "sonner";

const useSignIn = () =>
  useMutation<unknown, Error, AuthUser>({
    mutationKey: ["auth-user"],
    mutationFn: async (signInData: AuthUser) => {
      const { data, error } = await authClient.signIn.email({ ...signInData });

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => {
      toast.success("Bem vindo novamente!");
    },
  });

export default useSignIn;
