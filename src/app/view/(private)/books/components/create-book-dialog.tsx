'use client';

import { CreateBookDTO } from '@/app/api/books/books.dto';
import { createBookSchema, MaterialTypeEnum } from '@/app/api/books/books.pipe';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import apiClient from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { capitalCase } from 'change-case';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const aquisitionMethods: CreateBookDTO['aquisitionMethod'][] = ['compra', 'doação', 'permuta', 'pnld'];
export const materialTypes: MaterialTypeEnum[] = ['Livro', 'TCC', 'Revista', 'Periódico', 'Outro', 'livro literatura'];

export default function CreateBookDialog() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formCreateBook = useForm<z.infer<typeof createBookSchema>>({
    defaultValues: {
      title: '',
      authorName: '',
      publisher: '',
      quantity: '',
      materialType: 'Livro',
      aquisitionMethod: 'compra',
      pagesQuantity: '',
      genre: '',
      isbn: '',
      cddOrCdu: '',
      tombo: '',
      edition: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(createBookSchema),
  });

  const { mutate: mutateNewBook, isPending: pendingCreateBook } = useMutation<AxiosResponse, Error, CreateBookDTO>({
    mutationKey: ['new-book'],
    mutationFn: async (data: CreateBookDTO) => {
      const response = await apiClient.post('/books', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Livro criado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      formCreateBook.reset();
    },
    onError: (error) => {
      toast.error('Não foi possível realizar a inserção.', {
        description: `${error instanceof AxiosError ? error.response?.data.message : 'Erro interno inesperado'} `,
      });
    },
  });

  function handleOpenChange(value: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    if (!isOpen) {
      params.set('dialog', 'new-book');
    } else {
      params.delete('dialog');
    }

    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  useEffect(() => {
    if (searchParams.get('dialog') === 'new-book') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParams]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="plus" /> Adicionar
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-160">
        <DialogHeader>
          <DialogTitle>Adicionar novo livro</DialogTitle>
          <DialogDescription>Preencha os campos para adicionar o livro ao acervo.</DialogDescription>
        </DialogHeader>

        <Form {...formCreateBook}>
          <form className="space-y-4" onSubmit={formCreateBook.handleSubmit((data) => mutateNewBook(data))}>
            <FormField
              control={formCreateBook.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do livro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex space-x-2">
              <FormField
                control={formCreateBook.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do autor do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formCreateBook.control}
                name="genre"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Input placeholder="Gênero do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex space-x-2">
              <FormField
                control={formCreateBook.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Editora</FormLabel>
                    <FormControl>
                      <Input placeholder="Editora do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formCreateBook.control}
                name="edition"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Edição</FormLabel>
                    <FormControl>
                      <Input placeholder="Edição do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex space-x-2">
              <FormField
                control={formCreateBook.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input placeholder="ISBN do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formCreateBook.control}
                name="materialType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tipo de material</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {materialTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {capitalCase(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex space-x-2">
              <FormField
                control={formCreateBook.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Quantidade total" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formCreateBook.control}
                name="pagesQuantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Quant. de páginas</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Total de páginas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex space-x-2">
              <FormField
                control={formCreateBook.control}
                name="aquisitionMethod"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Aquisição</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {aquisitionMethods.map((aq) => (
                          <SelectItem key={aq} value={String(aq)}>
                            {capitalCase(String(aq))}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formCreateBook.control}
                name="tombo"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tombo</FormLabel>
                    <FormControl>
                      <Input placeholder="Tombo do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <FormField
              control={formCreateBook.control}
              name="cddOrCdu"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>CDD ou CDU</FormLabel>
                  <FormControl>
                    <Input placeholder="CDD ou CDU do livro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={pendingCreateBook}>
                {pendingCreateBook ? <Spinner /> : 'Salvar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
