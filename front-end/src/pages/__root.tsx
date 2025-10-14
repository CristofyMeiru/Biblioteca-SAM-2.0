import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/authProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const queryClient = new QueryClient();

export const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <div className=" w-full min-h-screen dark:bg-neutral-900 ">
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools />
      </div>
    </AuthProvider>
  </QueryClientProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
});
