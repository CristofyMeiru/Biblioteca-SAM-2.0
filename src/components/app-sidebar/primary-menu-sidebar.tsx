'use client';

import { useAuth } from '@/providers/auth-provider';
import { SidebarItem } from '@/types/Item-sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    title: 'Painel de controle',
    url: '/view/dashboard',
    icon: <Icon name="layoutDashboard" />,
  },
  {
    title: 'Empréstimos',
    url: '/view/book-loans',
    icon: <Icon name="handshake" />,
  },
  {
    title: 'Livros',
    url: '/view/books',
    icon: <Icon name="book" />,
  },
  {
    title: 'Cursos e Turmas',
    url: '/view/courses',
    icon: <Icon name="graduationCap" />,
  },
  {
    title: 'Frequência',
    url: '/view/attendance',
    icon: <Icon name="userCheck" />,
  },
] as const;

export default function PrimaryMenuSidebar() {
  const { session } = useAuth();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {session?.user.role == 'admin' && (
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname == '/view/admin'} tooltip={'Painel administrativo'} asChild>
                <Link href={'/view/admin'}>
                  <Icon name={'userCog'} />
                  <span>Painel administrativo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton isActive={pathname == item.url} tooltip={item.title} asChild>
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
