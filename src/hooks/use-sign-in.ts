import { AuthUser } from "@/app/view/(public)/log-in/auth.schema";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
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
