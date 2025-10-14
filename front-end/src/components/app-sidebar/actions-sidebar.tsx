import type { SidebarItem } from "@/types/Item-sidebar";
import Icon from "../ui/icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "@tanstack/react-router";

const items: SidebarItem[] = [
  {
    title: "Novo emprestimo",
    icon: "plus",
    url: "/book-loans/new",
  },
];

export default function ActionsSidebar() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Ações</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="  " tooltip={item.title} asChild>
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
  );
}
