"use client";

import { EditBookDTO } from "@/app/api/books/[id]/book.dto";
import { BookSelectDTO } from "@/app/api/books/books.dto";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Icon from "@/components/ui/icon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import apiClient from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { capitalCase } from "change-case";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { aquisitionMethods, materialTypes } from "../components/create-book-dialog";
import { BookFormField } from "./form-field";

export default function BookFormEdit({ bookData }: { bookData: BookSelectDTO }) {
  const queryClient = useQueryClient();
  const [inEdit, setInEdit] = useState<boolean>(false);

  const formEditBook = useForm<EditBookDTO>({
    defaultValues: {
      title: capitalCase(bookData.title),
      authorName: capitalCase(bookData.authorName),
      genre: capitalCase(bookData.genre),
      publisher: capitalCase(bookData.publisher),
      isbn: bookData.isbn ?? "Não informado",
      edition: capitalCase(bookData.edition ?? "não informado"),
      materialType: capitalCase(bookData.materialType ?? "não informado") as any,
      aquisitionMethod: capitalCase(bookData.aquisitionMethod ?? "") as any,
      cddOrCdu: bookData.cddOrCdu ?? "Não informado",
      tombo: bookData.tombo ?? "Não informado",
      pagesQuantity: bookData.pagesQuantity ?? 0,
      quantity: bookData.quantity,
    },
  });

  const { mutate: mutateUpdateBook, isPending: pendingUpdateBook } = useMutation<
    unknown,
    AxiosError<{ message: string }>,
    EditBookDTO
  >({
    mutationKey: ["update-book", bookData.id],
    mutationFn: async (data: EditBookDTO) => {
      const payload = Object.fromEntries(
        Object.entries(data).filter(
          ([key, val]) => val.toString().toLowerCase() != bookData[key as keyof BookSelectDTO]
        )
      );

      const response = await apiClient.patch(`/books/${bookData.id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Livro atualizado com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["book", bookData.id] });
      handleEditState();
    },
    onError: (error) => {
      toast.error("Não foi possível atualizar os dados.", {
        description: `${error instanceof AxiosError ? error.response?.data.message : "Erro interno inesperado"} `,
      });
    },
  });

  function handleEditState() {
    setInEdit(!inEdit);
    if (!inEdit) formEditBook.reset({ ...bookData } as any);
  }

  return (
    <Card className="flex-3 row-span-2 col-span-5">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Button size={"icon-lg"} className="disabled:opacity-100" disabled>
            <Icon name="fileText" />
          </Button>
          <div>
            <CardTitle className="text-2xl">Informações do livro</CardTitle>
            <CardDescription>Dados completos do acervo</CardDescription>
          </div>
        </div>

        <CardAction className=" space-x-2 ">
          <Button variant={inEdit ? "outline" : "default"} onClick={() => handleEditState()}>
            {inEdit ? (
              <>
                <Icon name="x" /> Cancelar
              </>
            ) : (
              <>
                <Icon name="pencil" /> Editar
              </>
            )}
          </Button>
          {inEdit && (
            <Button onClick={formEditBook.handleSubmit((data) => mutateUpdateBook(data))} disabled={pendingUpdateBook}>
              {pendingUpdateBook ? (
                <Spinner />
              ) : (
                <>
                  <Icon name="check" /> Salvar
                </>
              )}
            </Button>
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1">
        <Form {...formEditBook}>
          <form
            onSubmit={formEditBook.handleSubmit((data) => mutateUpdateBook(data))}
            className="flex w-full items-center"
          >
            <section className="flex flex-1 flex-col justify-around space-y-4">
              {/* Título e Autor */}

              <section className=" flex-1 flex items-center space-x-4 ">
                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">Título</span>
                  <BookFormField
                    label=""
                    value={bookData.title}
                    control={formEditBook.control}
                    name="title"
                    inEdit={inEdit}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">Autor</span>
                  <BookFormField
                    label=""
                    value={bookData.authorName}
                    control={formEditBook.control}
                    inEdit={inEdit}
                    name="authorName"
                  />
                </div>
              </section>

              {/* Gênero e Editora */}
              <section className=" flex-1 flex items-center space-x-4 ">
                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">Gênero</span>
                  <BookFormField
                    label=""
                    value={bookData.genre}
                    control={formEditBook.control}
                    inEdit={inEdit}
                    name="genre"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">Editora</span>
                  <BookFormField
                    label=""
                    value={bookData.publisher}
                    control={formEditBook.control}
                    inEdit={inEdit}
                    name="publisher"
                  />
                </div>
              </section>

              {/* ISBN e Edição */}
              <section className="flex-1 flex items-center space-x-4">
                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">ISBN</span>
                  <BookFormField
                    label=""
                    value={bookData.isbn}
                    control={formEditBook.control}
                    inEdit={inEdit}
                    name="isbn"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">Edição</span>
                  <BookFormField
                    label=""
                    value={bookData.edition}
                    control={formEditBook.control}
                    inEdit={inEdit}
                    name="edition"
                  />
                </div>
              </section>

              {/* Tipo de material e Método de aquisição */}
              <section className="flex-1 flex items-center space-x-4">
                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">Tipo de Material</span>
                  {inEdit ? (
                    <FormField
                      control={formEditBook.control}
                      name="materialType"
                      render={({ field }) => (
                        <FormItem>
                          <Select defaultValue={field.value} value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className=" w-full ">
                                <SelectValue placeholder={field.value} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {materialTypes.map((mt) => (
                                <SelectItem key={mt} value={mt}>
                                  {capitalCase(mt)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  ) : (
                    <span>{capitalCase(bookData.materialType ?? "não informado")}</span>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">Método de Aquisição</span>
                  {inEdit ? (
                    <FormField
                      control={formEditBook.control}
                      name="aquisitionMethod"
                      render={({ field }) => (
                        <FormItem>
                          <Select defaultValue={field.value} value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className=" w-full ">
                                <SelectValue placeholder={field.value} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {aquisitionMethods.map((aq) => (
                                <SelectItem key={aq} value={capitalCase(aq)}>
                                  {capitalCase(aq)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  ) : (
                    <span>{capitalCase(bookData.aquisitionMethod ?? "não informado")}</span>
                  )}
                </div>
              </section>

              {/* CDD/CDU e Tombo */}
              <section className="flex-1 flex items-center space-x-4">
                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">CDD/CDU</span>
                  <BookFormField
                    label=""
                    value={bookData.cddOrCdu}
                    control={formEditBook.control}
                    inEdit={inEdit}
                    name="cddOrCdu"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-muted-foreground">Tombo</span>
                  <BookFormField
                    label=""
                    value={bookData.tombo}
                    control={formEditBook.control}
                    inEdit={inEdit}
                    name="tombo"
                  />
                </div>
              </section>

              {inEdit && (
                <section className="flex-1 flex items-center space-x-4">
                  <div className="flex-1 flex flex-col">
                    <span className="text-sm text-muted-foreground">Quantidade total</span>
                    <BookFormField
                      label=""
                      value={String(bookData.quantity)}
                      control={formEditBook.control}
                      inEdit={inEdit}
                      name="quantity"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-sm text-muted-foreground">Quantidade de páginas</span>
                    <BookFormField
                      label=""
                      value={String(bookData.pagesQuantity)}
                      control={formEditBook.control}
                      inEdit={inEdit}
                      name="pagesQuantity"
                    />
                  </div>
                </section>
              )}
            </section>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
