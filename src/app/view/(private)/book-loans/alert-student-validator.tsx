import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useBookLoansPageContext } from './context';

export default function AlertStudentValidator() {
  const { studentData } = useBookLoansPageContext();

  const [isCredible, setIsCredible] = useState<boolean>(true);

  return (
    <Button className=' disabled:opacity-100 '  variant={'outline'} disabled>
      {studentData ? (
        isCredible ? (
          <>
            <Icon name="checkCircle" className=" text-primary " />
            <span className=" text-sm text-primary ">Esse aluno não possui emprestimos pendentes</span>
          </>
        ) : (
          <>
            <Icon name="alertCircle" className=" text-destructive " />
            <span className=" text-sm text-destructive">Esse aluno possui empréstimos pendentes</span>
          </>
        )
      ) : (
        <span className=" text- ">Nenhum estudante informado</span>
      )}
    </Button>
  );
}
