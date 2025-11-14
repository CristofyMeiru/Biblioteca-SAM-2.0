import { CourseSelectDTO } from '@/app/api/courses/courses.dto';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
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
  {
    accessorKey: 'select',
    header: () => <div className="text-center">Ações</div>,
    cell: () => (
      <DropdownMenu>
        <div className=" w-full flex justify-center ">
          <DropdownMenuTrigger asChild>
            <Icon name="moreHorizontal" />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className=" space-y-2 " align="end" side="left">
          <DropdownMenuItem asChild>
            <Button className=" w-full " size={'sm'} variant={'outline'}>
              <Icon name="pencil" /> Editar
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className=" p-0 ">
            <Button className=" w-full " size={'sm'} variant={'destructive'}>
              <Icon className=" text-white " name="trash" /> Excluir
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
