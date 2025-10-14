import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

const useSession = () =>
  useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data, error } = await authClient.getSession();

      if (error) throw new Error(error.message);

      return data?.user;
    },
  });

export default useSession;
