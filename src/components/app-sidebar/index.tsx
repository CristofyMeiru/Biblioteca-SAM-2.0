"use client";

import Icon from "@/components/ui/icon";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { SidebarItem } from "@/types/Item-sidebar";

import Image from "next/image";
import Link from "next/link";
import ActionsSidebar from "./actions-sidebar";

const items: SidebarItem[] = [
  {
    title: "Painel de controle",
    url: "/view/dashboard",
    icon: "layoutDashboard",
  },
  {
    title: "Empréstimos",
    url: "/view/book-loans",
    icon: "handshake",
  },
  {
    title: "Livros",
    url: "/view/books",
    icon: "book",
  },
] as const;

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className=" outline ">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className={`flex items-center ${!open && "justify-center"} cursor-default space-x-2`}>
            <Image
              src="/logo.png"
              width={300}
              height={360}
              alt="logo.png"
              className={`${open ? "size-10" : "size-5"} `}
            />
            {open && (
              <h1 className=" text-green-900 font-semibold text-lg text-nowrap overflow-auto ">Biblioteca-SAM</h1>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className=" text-green-950   ">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.url}>
                      <Icon name={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <ActionsSidebar />
      </SidebarContent>
    </Sidebar>
  );
}
