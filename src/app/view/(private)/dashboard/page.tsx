import Icon from "@/components/ui/icon";
import { ItemGroup } from "@/components/ui/item";
import CardStatsSection from "./components/cards-section";
import { CloseLoansTable } from "./components/close-loans-table";
import { UnavailableBooksTable } from "./components/unavailable-books-table";

export default function DashboardPage() {
  return (
    <div className=" p-4 pt-10 flex flex-col justify-center items-center w-full ">
      <div className=" w-4/5 flex flex-col justify-center ">
        <div className=" text-green-950  flex items-center space-x-2 ">
          <Icon name="layoutDashboard" className=" size-6 " />
          <h1 className=" text-2xl font-medium ">Painel de controle</h1>
        </div>
        <span className=" text-green-700 mb-5 ">Visão geral do gerenciamento da biblioteca</span>
        <CardStatsSection />
        <ItemGroup className=" flex flex-col  mt-10 gap-4 ">
          <CloseLoansTable />
          <UnavailableBooksTable />
        </ItemGroup>
      </div>
    </div>
  );
}
