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
import { Link } from "@tanstack/react-router";
import ActionsSidebar from "./actions-sidebar";

const items: SidebarItem[] = [
  {
    title: "Painel de controle",
    url: "/dashboard",
    icon: "layoutDashboard",
  },
  {
    title: "Empréstimos",
    url: "/book-loans",
    icon: "handshake",
  },
] as const;

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className=" outline ">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className=" flex items-center cursor-default ">
            <img src="livro.png" alt="logo.png" className={open ? "h-10" : "h-5"} />
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
                    <Link to={item.url}>
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
