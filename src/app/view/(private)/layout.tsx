import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className=" flex flex-col w-full min-h-screen ">
        <header className=" flex items-center justify-between bg-sidebar p-2 outline w-full ">
          <SidebarTrigger className=" text-green-950 " />
          <DropdownMenu>
            <DropdownMenuTrigger className=" text-sm text-green-900 ">
              <Button size={"sm"} variant={"ghost"}>
                {" "}
                <Icon name="chevronDown" /> Bem vindo(a) novamente, Regiane!
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent></DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className=" w-full ">{children}</main>
      </div>
    </SidebarProvider>
  );
}
