'use client';

import { CourseSelectDTO } from '@/app/api/courses/courses.dto';
import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { CoursesTable } from './courses-table';
import CreateCourseDialog from './create-course-dialog';
import { coursesTableColumns } from './courses-table-columns';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function CoursesPage() {
  const { data: coursesData, isLoading: loadingCoursesData } = useQuery<CourseSelectDTO[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await apiClient.get<CourseSelectDTO[]>('/courses');
      return response.data;
    },
  });

  return (
    <main className=" w-full p-8 ">
      <section className="flex justify-between items-center mb-6">
        <div className=" flex items-center space-x-2 ">
          <Button size={"icon-lg"} className=" disabled:opacity-100 " disabled>
            <Icon name="graduationCap" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Cursos</h1>
            <span className="text-muted-foreground mt-1">Gerencie os cursos cadastrados</span>
          </div>
        </div>
        <CreateCourseDialog />
      </section>
      <section>
        <CoursesTable columns={coursesTableColumns} data={coursesData ?? []} isLoading={loadingCoursesData} />
      </section>
    </main>
  );
}
