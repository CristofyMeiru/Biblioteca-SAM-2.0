'use client';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { authClient } from '@/lib/auth-client';
import { useAuth } from '@/providers/auth-provider';
import { useQuery } from '@tanstack/react-query';
import CreateNewUserDialog from './create-new-user-dialog';
import { UsersTable } from './users-table';
import { usersTableColumns } from './users-table-columns';

export default function AdminPage() {
  const { session } = useAuth();

  const { data, isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await authClient.admin.listUsers({ query: {} });

      if (error) throw error;

      return data;
    },
  });

  if (session?.user.role == 'user') {
    return <main>Acesso negado.</main>;
  }

  return (
    <main className=" p-8 ">
      <section className=" w-full flex items-center justify-between ">
        <div className=" flex space-x-2 items-center ">
          <Button className=" disabled:opacity-100 " size={'icon-lg'} disabled>
            <Icon name="settings" />
          </Button>
          <div className="  ">
            <h1 className=" font-semibold text-2xl ">Painel administrativo</h1>
            <span className=" text-neutral-500 ">Gerencie as contas e sessões ligadas a aplicação.</span>
          </div>
        </div>
        <CreateNewUserDialog />
      </section>
      <div className=" flex flex-col ">
        <UsersTable columns={usersTableColumns} data={data?.users ?? []} isLoading={loadingUsers} />
      </div>
    </main>
  );
}
