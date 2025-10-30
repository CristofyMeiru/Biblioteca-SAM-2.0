'use client';

import { buttonVariants } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Item, ItemActions, ItemHeader, ItemTitle } from '@/components/ui/item';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { closeLoansTableColumns, type CloseLoans } from './close-loans-table-columns';
import { DashboardTable } from './table';

const closeLoans: CloseLoans[] = [
  {
    id: '1',
    fullname: 'Ana Beatriz Costa',
    book_title: 'Dom Casmurro',
    expires_at: new Date('2025-10-20'),
  },
  {
    id: '2',
    fullname: 'Lucas Andrade',
    book_title: 'O Pequeno Príncipe',
    expires_at: new Date('2025-10-18'),
  },
  {
    id: '3',
    fullname: 'Mariana Oliveira',
    book_title: '1984',
    expires_at: new Date('2025-10-25'),
  },
];

export function CloseLoansTable() {
  return (
    <Item className=" flex-1 p-4 pb-5 shadow-md">
      <ItemHeader>
        <ItemTitle>
          <Icon name="alertCircle" className=" size-7 " />
          <span className=" text-lg font-medium ">Empréstimos proximos do vencimento</span>
        </ItemTitle>
        <ItemActions>
          <Tooltip>
            <TooltipTrigger className={buttonVariants({ variant: 'outline' })}>
              <Icon name="fileText" />
            </TooltipTrigger>
            <TooltipContent>
              <span>Gerar relatório</span>
            </TooltipContent>
          </Tooltip>
        </ItemActions>
      </ItemHeader>

      <DashboardTable columns={closeLoansTableColumns} data={closeLoans} isLoading={false} />
    </Item>
  );
}
