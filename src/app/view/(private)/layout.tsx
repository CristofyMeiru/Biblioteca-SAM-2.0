'use client';
import { AppSidebar } from '@/components/app-sidebar';
import HeaderDropdown from '@/components/header-dropdown/header-dropdown';
import { buttonVariants } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/providers/auth-provider';
import Image from 'next/image';
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
      <main className=" h-screen w-full flex flex-col items-center justify-center space-x-2">
        <Image className=' animate-bounce ' src={'/logo.png'} alt="Logo" width={100} height={100} />
        <div  className=' w-40 h-1 border-t-2 '></div>
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
