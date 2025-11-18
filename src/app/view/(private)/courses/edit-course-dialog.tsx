import { CourseSelectDTO, CourseUpdateDTO } from '@/app/api/courses/courses.dto';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import apiClient from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { capitalCase } from 'change-case';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const gradeLevels = ['1', '2', '3'];

export default function EditCourseDialog() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: initialCourseData, isLoading: loadingCourseData } = useQuery<CourseSelectDTO>({
    queryKey: ['course', { courseId: searchParams.get('id') }],
    queryFn: async () => {
      const res = await apiClient.get<CourseSelectDTO>(`/courses/${searchParams.get('id')}`);
      return res.data;
    },
  });

  const { mutate: mutateEditCourse, isPending: pendingEditCourse } = useMutation<unknown, Error, CourseUpdateDTO>({
    mutationKey: ['edit-course'],
    mutationFn: async (data) => {
      const payload: Record<string, string | undefined> = {};

      if (data.name != initialCourseData?.name) {
        payload.name = data.name;
      }
      if (data.gradeLevel != initialCourseData?.gradeLevel) {
        payload.gradeLevel = data.gradeLevel;
      }
      if (data.slug != initialCourseData?.slug) {
        payload.slug = data.slug;
      }

      if (!payload) throw new Error('Nenhum campo modificado.');

      const res = await apiClient.patch(`/courses/${searchParams.get('id')}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Curso editado com sucesso.');
    },
    onError: () => {
      toast.error('Não foi possível realizar a alteração de dados');
    },
  });

  const formEditCourse = useForm<CourseUpdateDTO>({
    defaultValues: {
      name: '',
      gradeLevel: '1',
      slug: '',
    },
  });

  function handleOpenChange(value: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete('dialog-edit');
      params.delete('id');
      formEditCourse.reset();
    }
    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  useEffect(() => {
    const dialogIsOpen = searchParams.get('dialog-edit');

    if (dialogIsOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (initialCourseData) {
      formEditCourse.reset({
        name: capitalCase(initialCourseData.name),
        gradeLevel: initialCourseData.gradeLevel,
        slug: initialCourseData.slug,
      });
    }
  }, [initialCourseData, formEditCourse]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className=" hidden "></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar curso</DialogTitle>
          <DialogDescription>Edição das informações do curso</DialogDescription>
        </DialogHeader>
        <Form {...formEditCourse}>
          <form className=" space-y-4 " onSubmit={formEditCourse.handleSubmit((data) => mutateEditCourse(data))}>
            <FormField
              control={formEditCourse.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {loadingCourseData ? (
                    <div className=" space-y-1 ">
                      <Skeleton className=" w-20 h-4 " />
                      <Skeleton className=" w-full h-9 " />
                    </div>
                  ) : (
                    <>
                      <FormLabel>Curso</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </>
                  )}
                </FormItem>
              )}
            />
            <section className=" flex space-x-2  ">
              <FormField
                control={formEditCourse.control}
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
              <FormField
                control={formEditCourse.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className=" flex-1 ">
                    {loadingCourseData ? (
                      <div className="  space-y-1 ">
                        <Skeleton className=" w-20 h-4 " />
                        <Skeleton className=" w-full h-9 " />
                      </div>
                    ) : (
                      <>
                        <FormLabel>Abreviação / Identificador</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </>
                    )}
                  </FormItem>
                )}
              />
            </section>
          </form>
        </Form>
        <Separator />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancelar</Button>
          </DialogClose>
          <Button onClick={formEditCourse.handleSubmit((data) => mutateEditCourse(data))} disabled={pendingEditCourse}>
            {pendingEditCourse ? (
              <Spinner />
            ) : (
              <>
                <Icon name="save" /> Salvar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
