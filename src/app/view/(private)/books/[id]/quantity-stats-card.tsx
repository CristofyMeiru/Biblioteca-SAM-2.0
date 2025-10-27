import { BookSelectDTO } from "@/app/api/books/books.dto";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item";

export default function QuantityStatsCard({ bookData }: { bookData: BookSelectDTO }) {
  return (
    <Card className=" col-span-5 row-span-1 row-start-3 ">
      <CardHeader className=" flex items-center ">
        <Button size={"icon-lg"} className=" disabled:opacity-100 " disabled>
          <Icon name="qrCode" />
        </Button>
        <div>
          <CardTitle className=" text-2xl ">Disponibilidade</CardTitle>
          <CardDescription>Informações sobre disponibilidade para emprestimos</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ItemGroup className=" h-full grid grid-cols-3 gap-4 ">
          <Item className=" h-full " variant={"outline"}>
            <ItemContent>
              <ItemTitle className=" text-primary text-3xl ">{bookData.quantity}</ItemTitle>
              <ItemDescription className=" font-medium ">Quantidade Total</ItemDescription>
            </ItemContent>
          </Item>
          <Item className=" h-full " variant={"outline"}>
            <ItemContent>
              <ItemTitle className=" text-destructive text-3xl ">{bookData.loanedQuantity}</ItemTitle>
              <ItemDescription className=" font-medium ">Quantidade Alugada</ItemDescription>
            </ItemContent>
          </Item>
          <Item className=" h-full " variant={"outline"}>
            <ItemContent>
              <ItemTitle className=" text-primary text-3xl ">{bookData.quantity - bookData.loanedQuantity}</ItemTitle>
              <ItemDescription className=" font-medium ">Quantidade disponível</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
