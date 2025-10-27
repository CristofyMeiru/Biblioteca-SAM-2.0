import { CourseSelectDTO } from '@/app/api/courses/courses.dto';
import { ColumnDef } from '@tanstack/react-table';
import { capitalCase } from 'change-case';

export const coursesTableColumns: ColumnDef<CourseSelectDTO>[] = [
  {
    accessorKey: 'name',
    header: 'Curso',
    cell: ({ renderValue }) => capitalCase(renderValue() as string),
  },
  {
    accessorKey: 'gradeLevel',
    header: () => <div className=" w-full text-center ">Série</div>,
    cell: ({ renderValue }) => <div className=" w-full text-center ">{`${renderValue() as string}º`}</div>,
  },
  {
    accessorKey: 'slug',
    header: () => <div className=" w-full text-center ">Abreviação / Identificador</div>,
    cell: ({ renderValue }) => <div className=" w-full text-center ">{`${renderValue() as string}`}</div>,
  },
];
