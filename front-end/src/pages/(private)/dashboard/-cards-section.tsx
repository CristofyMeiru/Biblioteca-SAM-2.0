import Icon from "@/components/ui/icon";
import { Item, ItemActions, ItemContent, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item";
import { useState } from "react";

export default function CardStatsSection() {

  const [itemGroupClassname] = useState<string>(" flex-col md:flex-row gap-4 ");
  const [itemClassname] = useState<string>(" shadow-sm w-full lg:w-1/2");
  
  
  return (
    <div>
      <ItemGroup className="flex-col lg:flex-row w-full  gap-4">
        <ItemGroup className={itemGroupClassname}>
          <Item className={itemClassname} variant="outline">
            <ItemHeader className="text-green-800 flex justify-between items-center">
              <ItemTitle>Total de livros</ItemTitle>
              <ItemActions>
                <Icon name="book" />
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              <span className="font-medium text-2xl">1,234</span>
              <span className="text-primary">+12% desde o mês passado</span>
            </ItemContent>
          </Item>

          <Item className={itemClassname} variant="outline">
            <ItemHeader className="text-green-800 flex justify-between items-center">
              <ItemTitle>Empréstimos Ativos</ItemTitle>
              <ItemActions>
                <Icon name="users" />
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              <span className="font-medium text-2xl">84</span>
              <span className="text-primary">+12% desde o mês passado</span>
            </ItemContent>
          </Item>
        </ItemGroup>

        <ItemGroup className={itemGroupClassname}>
          <Item className={itemClassname} variant="outline">
            <ItemHeader className="text-green-800 flex justify-between items-center">
              <ItemTitle>Livros em falta</ItemTitle>
              <ItemActions>
                <Icon name="alertCircle" />
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              <span className="font-medium text-2xl">23</span>
              <span className="text-primary">+3% desde o mês passado</span>
            </ItemContent>
          </Item>

          <Item className={itemClassname} variant="outline">
            <ItemHeader className="text-green-800 flex justify-between items-center">
              <ItemTitle>Taxa de devolução</ItemTitle>
              <ItemActions>
                <Icon name="undo2" />
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              <span className="font-medium text-2xl">94</span>
              <span className="text-primary">+5% desde o mês passado</span>
            </ItemContent>
          </Item>
        </ItemGroup>
      </ItemGroup>
    </div>
  );
}
