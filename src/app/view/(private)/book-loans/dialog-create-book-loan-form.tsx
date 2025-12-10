import { CourseSelectDTO } from '@/app/api/courses/courses.dto';
import CalendarPopover from '@/components/ui/calendar-popover';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { capitalCase } from 'change-case';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useBookLoansPageContext } from './context';

export default function DialogCreateBookLoanForm() {
  const { studentData, formCreateBookLoan, bookData, setBookData } = useBookLoansPageContext();

  const { data: coursesData, isLoading: loadingCourses } = useQuery({
    queryKey: ['courses'],
    queryFn: () =>
      apiClient
        .get<CourseSelectDTO[]>('/courses')
        .then((res) => res.data.sort((a, b) => Number(a.gradeLevel) - Number(b.gradeLevel))),
  });

  const courseId = useWatch({
    control: formCreateBookLoan.control,
    name: 'courseId',
  });

  const courseName = useWatch({
    control: formCreateBookLoan.control,
    name: 'courseName',
  });

  const { data: selectedCourse, isLoading: loadingSelectedCourse } = useQuery<CourseSelectDTO>({
    queryKey: ['courses', { courseId }],
    queryFn: async () => apiClient.get<CourseSelectDTO>(`/courses/${courseId}`).then((res) => res.data),
    enabled: !!courseId,
  });

  useEffect(() => {
    console.log('ta passando no effect');
    if (studentData) {
      formCreateBookLoan.setValue('fullname', capitalCase(studentData.Nome));
      formCreateBookLoan.setValue('rollNumber', studentData['Número da Chamada']);
      formCreateBookLoan.setValue('courseName', studentData.Curso);

      if (coursesData) {
        const [gradeLevelStr, slug] = studentData.Curso.split(' ');
        const matchedCourse = coursesData.find(
          (c) => c.gradeLevel === gradeLevelStr && c.slug.toLowerCase() === slug?.toLowerCase()
        );

        if (matchedCourse) {
          formCreateBookLoan.setValue('courseId', matchedCourse.id);
        } else {
          formCreateBookLoan.setValue('courseId', '');
        }
      } else {
        formCreateBookLoan.setValue('courseId', '');
      }
    }
    if (bookData) {
      console.log(bookData);
      formCreateBookLoan.setValue('bookTitle', capitalCase(bookData.Titulo));
      formCreateBookLoan.setValue('bookAuthor', capitalCase(bookData.Autor));
      formCreateBookLoan.setValue('bookGenre', capitalCase(bookData.Genero));
      formCreateBookLoan.setValue('bookId', bookData.Id);
          console.log(bookData);

    }
  }, [studentData, formCreateBookLoan, bookData, setBookData, coursesData]);

  return (
    <Form {...formCreateBookLoan}>
      <form className=" flex-1 ">
        <section className=" space-y-4 ">
          <div className=" flex items-center mb-2 space-x-2 ">
            <h2 className=" text-xl font-bold ">Informações do aluno</h2>
            <Icon name="user" />
          </div>
          <Separator className=" w-full my-2 " />

          <FormField
            control={formCreateBookLoan.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className=" flex-1 ">
                <FormLabel>Nome do aluno</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo do aluno" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className=" flex space-x-2 ">
            <FormField
              control={formCreateBookLoan.control}
              name="courseId"
              render={({ field }) => (
                <FormItem className=" flex-1 ">
                  <FormLabel>Curso</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className=" w-full ">
                        <SelectValue placeholder="Selecione o curso">
                          {loadingSelectedCourse && courseId ? (
                            <Skeleton className="w-full h-full" />
                          ) : selectedCourse ? (
                            `${selectedCourse.gradeLevel}º ${selectedCourse.slug} - ${capitalCase(selectedCourse.name)}`
                          ) : courseName ? (
                            courseName
                          ) : (
                            'Selecione o curso'
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loadingCourses && (
                        <SelectItem value="none" disabled>
                          <Skeleton className=" w-full h-full " />
                        </SelectItem>
                      )}
                      {coursesData?.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.gradeLevel}º {course.slug} - {capitalCase(course.name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={formCreateBookLoan.control}
              name="rollNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da chamada</FormLabel>
                  <FormControl>
                    <Input placeholder="Número da chamada" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className=" flex items-center mb-2 space-x-2 ">
            <h2 className=" text-xl font-bold ">Informações do livro</h2>
            <Icon name="book" />
          </div>
          <Separator className=" w-full my-2 " />

          <FormField
            control={formCreateBookLoan.control}
            name="bookTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do livro</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do livro" {...field} readOnly />
                </FormControl>
              </FormItem>
            )}
          />

          <div className=" flex space-x-2 ">
            <FormField
              control={formCreateBookLoan.control}
              name="bookAuthor"
              render={({ field }) => (
                <FormItem className=" flex-1 ">
                  <FormLabel>Nome do autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do autor" {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formCreateBookLoan.control}
              name="bookGenre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gênero</FormLabel>
                  <FormControl>
                    <Input placeholder="Gênero" {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className=" flex items-center mb-2 space-x-2 ">
            <h2 className=" text-xl font-bold ">Informações do empréstimo</h2>
            <Icon name="handshake" />
          </div>
          <Separator className=" w-full my-2 " />

          <div className=" flex space-x-2 ">
            <FormField
              control={formCreateBookLoan.control}
              name="loanDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Data de empréstimo</FormLabel>
                  <CalendarPopover field={field} />
                </FormItem>
              )}
            />
            <FormField
              control={formCreateBookLoan.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Data de devolução</FormLabel>
                  <CalendarPopover field={field} />
                </FormItem>
              )}
            />
          </div>
        </section>
      </form>
    </Form>
  );
}
