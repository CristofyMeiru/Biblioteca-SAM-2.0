'use client';

import { CourseSelectDTO } from '@/app/api/courses/courses.dto';
import { Button } from '@/components/ui/button';
import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableInputSearch,
  DataTablePagination,
} from '@/components/ui/data-table';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { coursesTableColumns } from './courses-table-columns';
import CreateCourseDialog from './create-course-dialog';

export default function CoursesPage() {
  const searchParams = useSearchParams();

  const [searchString, setSearchString] = useState<string | null>(null);

  const { data: coursesData, isFetching: loadingCoursesData } = useQuery<CourseSelectDTO[]>({
    queryKey: ['courses', searchString],
    queryFn: async () => {
      const response = await apiClient.get<CourseSelectDTO[]>('/courses', { params: { search: searchString ?? null } });
      return response.data;
    },
  });

  useEffect(() => {
    setSearchString(searchParams.get('search'));
  }, [searchParams]);

  return (
    <main className=" w-full p-8 ">
      <section className="flex justify-between items-center">
        <div className=" flex items-center space-x-2 ">
          <Button size={'icon-lg'} className=" disabled:opacity-100 " disabled>
            <Icon name="graduationCap" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Cursos e Turmas</h1>
            <span className=" text-sm text-muted-foreground">Gerencie os cursos e turmas cadastrados</span>
          </div>
        </div>
        <CreateCourseDialog />
      </section>

      <Separator className=' my-4 ' />

      <section>
        <DataTable
          name="courses-table"
          columns={coursesTableColumns}
          data={coursesData ?? []}
          isLoading={loadingCoursesData}
        >
          <DataTableHeader>
            <DataTableInputSearch />
          </DataTableHeader>
          <DataTableContent />
          <DataTablePagination />
        </DataTable>
      </section>
    </main>
  );
}
