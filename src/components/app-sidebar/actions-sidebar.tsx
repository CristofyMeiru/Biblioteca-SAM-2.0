import type { SidebarItem } from "@/types/Item-sidebar";
import Link from "next/link";
import Icon from "../ui/icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const items: SidebarItem[] = [
  {
    title: "Novo emprestimo",
    icon: "plus",
    url: "/view/book-loans/new",
  },
  {
    title: "Novo livro",
    icon: "plus",
    url: "/view/books/new",
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
  );
}
