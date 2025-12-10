'use client';
import { useAuth } from '@/providers/auth-provider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Icon from '../ui/icon';
import SignOutDialog from './sign-out-dialog';
import ThemeSwitcher from './theme-switcher';

export default function HeaderDropdown() {
  const { session } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleOpenSignOut() {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sign-out-dialog', 'open');
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <SignOutDialog />
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'sm'}>
            {' '}
            <Icon name={isOpen ? 'chevronDown' : 'chevronRight'} /> {session?.user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className=" min-w-60 w-full ">
          <DropdownMenuItem>
            <Button onClick={handleOpenSignOut} className=" w-full " size={'sm'} variant={'destructive'}>
              <Icon name="logOut" className=" text-white " /> Sair
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ThemeSwitcher />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
