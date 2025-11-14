'use client';
import { AppSidebar } from '@/components/app-sidebar';
import HeaderDropdown from '@/components/header-dropdown/header-dropdown';
import { buttonVariants } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isLoading, session } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      toast.error('Não foi possível retornar a sessão de usuário.');
      replace('/view/sign-in');
    }
  }, [isLoading, session, replace]);

  if (isLoading) {
    return (
      <main className=" h-screen w-full flex items-center justify-center space-x-2">
        <Spinner className=" size-8 " /> <span className=" text-lg font-medium  ">Carregando dados do usuário</span>
      </main>
    );
  }

  if (!session) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className=" flex flex-col w-full min-h-screen ">
        <header className=" flex items-center justify-between bg-sidebar p-2 outline w-full ">
          <SidebarTrigger className={`${buttonVariants({ variant: 'ghost' })} size-9`} />
          <HeaderDropdown />
        </header>
        <main className=" w-full ">{children}</main>
      </div>
    </SidebarProvider>
  );
}
