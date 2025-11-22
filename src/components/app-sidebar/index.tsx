'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';

import Image from 'next/image';
import SignOutDialog from '../header-dropdown/sign-out-dialog';
import ActionsSidebar from './actions-sidebar';
import PrimaryMenuSidebar from './primary-menu-sidebar';

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className={`flex items-center ${!open && 'justify-center'} cursor-default space-x-2`}>
            <Image
              src="/logo.png"
              width={300}
              height={360}
              alt="logo.png"
              className={`${open ? 'size-10' : 'size-5'} `}
            />
            {open && (
              <h1 className=" text-green-900 dark:text-green-400 font-semibold text-lg text-nowrap overflow-auto ">
                Biblioteca SAM
              </h1>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className=" text-green-950 dark:text-green-50  ">
        <SidebarSeparator />

        <PrimaryMenuSidebar />

        <SidebarSeparator />

        <ActionsSidebar />
      </SidebarContent>

      <SidebarFooter>
        <SignOutDialog />
      </SidebarFooter>
    </Sidebar>
  );
}
