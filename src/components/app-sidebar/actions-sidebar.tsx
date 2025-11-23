import type { SidebarItem } from '@/types/Item-sidebar';
import Link from 'next/link';
import PlusGraduationCap from '../svg/plus-graduation-cap';
import PlusHandshake from '../svg/plus-handshake';
import Icon from '../ui/icon';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

const items: SidebarItem[] = [
  {
    title: 'Novo emprestimo',
    icon: <PlusHandshake className=" size-5 " />,
    url: '/view/book-loans?dialog=new-loan',
  },
  {
    title: 'Novo livro',
    icon: <Icon name="bookPlus" className="size-5" />,
    url: '/view/books?dialog=new-book',
  },
  {
    title: 'Nova frequência',
    icon: <Icon name="userPlus" className="size-5" />,
    url: '/view/attendance/new',
  },
  {
    title: 'Novo curso / turma',
    icon: <PlusGraduationCap />,
    url: '/view/courses?dialog=new-course',
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
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url}>
                  {item.icon}
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
