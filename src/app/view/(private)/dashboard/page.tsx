import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ItemGroup } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import CardStatsSection from './components/cards-section';
import { UnavailableBooksTable } from './components/unavailable-books-table';

export default function DashboardPage() {
  return (
    <div className=" p-8 flex flex-col justify-center items-center w-full ">
      <div className=" w-4/5 flex flex-col justify-center ">
        <div className=" flex items-center space-x-2 ">
          <Button size={'icon-lg'}>
            <Icon name="layoutDashboard" className=" size-6 " />
          </Button>
          <div>
            <h1 className=" text-2xl font-medium ">Painel de controle</h1>
            <span className=" text-sm text-muted-foreground mb-5 ">Visão geral do gerenciamento da biblioteca</span>
          </div>
        </div>
        <Separator className=" my-4 " />
        <CardStatsSection />
        <ItemGroup className=" flex flex-col  mt-10 gap-4 ">
          {/* <CloseLoansTable /> */}
          <UnavailableBooksTable />
        </ItemGroup>
      </div>
    </div>
  );
}
