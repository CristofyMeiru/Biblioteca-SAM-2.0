'use client';

import { Button } from '@/components/ui/button';
import Icon, { IconName } from '@/components/ui/icon';
import { Kbd } from '@/components/ui/kbd';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { UserWithRole } from 'better-auth/plugins';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import EditUserDialog from './edit-user-dialog';

export const usersTableColumns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: 'name',
    header: 'Nome completo',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: () => <div className=" text-center ">Papel administrativo</div>,
    cell: (cell) => {
      const background = cell.getValue() == 'admin' ? ' bg-blue-500/20 ' : ' bg-primary/40 ';
      const textColor =
        cell.getValue() == 'admin' ? ' text-blue-800 dark:text-blue-300 ' : ' text-green-900 dark:text-green-300 ';
      const label = cell.getValue() == 'user' ? 'Bibliotecário' : 'Admin';
      const iconName: IconName = cell.getValue() == 'admin' ? 'userCog' : 'user';

      return (
        <div className=" text-center ">
          <Kbd className={` border text-[13px] py-3 px-2 ${background + textColor}`}>
            <Icon name={iconName} /> {label}
          </Kbd>
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    enableColumnFilter: false,
    header: () => <div className=" text-center ">Ações</div>,
    cell: (cell) => <ActionsCell cell={cell} />,
    enableSorting: true,
  },
];

function ActionsCell({ cell }: { cell: CellContext<UserWithRole, unknown> }) {
  const originalRow = cell.row.original;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleOpen() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('edit-dialog', 'open');
    params.set('id', originalRow.id);
    router.replace(`${pathname}?${params.toString()}`);
  }

  if (!originalRow) {
    return (
      <div className="w-full flex items-center justify-center">
        <Button onClick={handleOpen} variant="outline" disabled>
          <Icon name="pencil" />
          Editar
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <EditUserDialog initialData={originalRow} />
      <Button size={"sm"} onClick={handleOpen} variant="outline">
        <Icon name="pencil" />
        Editar
      </Button>
    </div>
  );
}
