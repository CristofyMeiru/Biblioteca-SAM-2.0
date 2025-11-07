"use client";
import { BookSelectDTO } from "@/app/api/books/books.dto";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import apiClient from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { capitalCase } from "change-case";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { toast } from "sonner";
import DeleteAlertDialog from "./delete-alert-dialog";
import BookFormEdit from "./form-edit";
import QuantityStatsCard from "./quantity-stats-card";


export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);

  const {
    data: bookData,
    isLoading: loadingBook,
    isError,
  } = useQuery<BookSelectDTO>({
    queryKey: ["book", resolvedParams.id],
    queryFn: async () => {
      const result = await apiClient.get<BookSelectDTO>(`/books/${resolvedParams.id}`);

      return result.data;
    },
    enabled: !!resolvedParams.id,
  });

  if (loadingBook) {
    return (
      <main className="h-[92vh] flex justify-center items-center">
        <Spinner className="size-8" />
      </main>
    );
  }

  if (isError) {
    toast.error("Erro ao carregar", {
      description: "Não foi possível buscar as informações do livro.",
    });
    return null;
  }

  if (bookData)
    return (
      <main className=" p-8 space-y-4  ">
        <section className=" flex items-center justify-between space-x-2 ">
          <div className=" flex items-center space-x-2 ">
            <Link href={"/view/books"}>
              <Button variant={"ghost"}>
                <Icon name="chevronLeft" />
              </Button>
            </Link>
            <div>
              {loadingBook ? (
                <Skeleton className=" w-140 h-10 " />
              ) : (
                <h1 className=" font-semibold text-3xl ">{capitalCase(bookData ? bookData?.title : "")}</h1>
              )}
              <span className=" text-muted-foreground ">Detalhes completos do livro</span>
            </div>
          </div>
          <DeleteAlertDialog bookData={bookData} />
        </section>

        <section className=" grid grid-cols-7 grid-rows-4 gap-4 ">
          <BookFormEdit bookData={bookData} />

          <Card className=" flex-1 row-span-2 col-span-2">
            <CardHeader className=" flex items-center ">
              <Button size={"icon-lg"} className=" disabled:opacity-100 " disabled>
                <Icon name="qrCode" />
              </Button>
              <div>
                <CardTitle className=" text-2xl ">QR Code</CardTitle>
                <CardDescription>QR code identificador do livro</CardDescription>
              </div>
            </CardHeader>
            <CardContent className=" flex flex-1 justify-center items-center ">
              <QRCodeSVG
                className=" size-52 "
                value={"dsdkaosidjqoiweoqwjdlcznlczxlcnzxcnzlxjcoksjdqoiwueoqiwueoiqwue"}
              />
            </CardContent>
            <CardFooter>
              <Button className=" w-full ">
                <Icon name="download" /> Baixar QR Code
              </Button>
            </CardFooter>
          </Card>

          <QuantityStatsCard bookData={bookData} />
        </section>
      </main>
    );
}
