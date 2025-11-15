'use client';
import { CreateCourseDTO } from '@/app/api/courses/courses.dto';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiClient from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const gradeLevels = ['1', '2', '3'];

export default function CreateCourseDialog() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formCreateCourse = useForm<CreateCourseDTO>({
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const { mutate: mutateCreateCourse, isPending: pendingCreateCourse } = useMutation<
    unknown,
    AxiosError<{ message: string }>,
    CreateCourseDTO,
    any
  >({
    mutationKey: ['create-course'],
    mutationFn: async (data) => {
      const response = await apiClient.post('/courses', data);
      return response.data;
    },
    onMutate: () => {
      const toastId = toast.loading('Adicionando curso...');
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Curso adicionado com sucesso.', {
        id: context?.toastId,
      });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error, _variables, context) => {
      toast.error('Não foi possível adicionar o curso.', {
        description: error.response?.data.message,
        id: context?.toastId,
      });
    },
  });

  function handleOpenChange(open: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (open) {
      params.set('dialog', 'new-course');
      setIsOpen(true);
    } else {
      params.delete('dialog');
      setIsOpen(false);
    }

    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  useEffect(() => {
    if (searchParams.get('dialog') === 'new-course') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParams]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className={buttonVariants({ variant: 'default' })}>
        <Icon name="plus" /> Adicionar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar curso</DialogTitle>
          <DialogDescription>Preencha as informações para adicionar um novo curso.</DialogDescription>
        </DialogHeader>
        <Form {...formCreateCourse}>
          <form className=" space-y-6 " onSubmit={formCreateCourse.handleSubmit((data) => mutateCreateCourse(data))}>
            <FormField
              control={formCreateCourse.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do curso</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do curso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formCreateCourse.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abreviação do nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Exemplo: DS, ADM, MASSO, EDIFICA..." {...field} />
                  </FormControl>
                  <FormDescription>
                    É necessário que sejá exatamente a mesma abreviação contido no Qr Code dos alunos deste curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formCreateCourse.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Série</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className=" w-full ">
                        <SelectValue placeholder={'Selecionar série'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gradeLevels.map((gradeLevel, index) => (
                        <SelectItem key={index} value={gradeLevel}>{`${gradeLevel}º Série`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={pendingCreateCourse}>
              <Icon name="plus" /> Adicionar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
