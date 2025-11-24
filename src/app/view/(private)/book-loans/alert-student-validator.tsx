import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useBookLoansPageContext } from './context';

type CredibilityStatus = 'completely' | 'partially' | 'no';

export default function AlertStudentValidator() {
  const { studentData } = useBookLoansPageContext();

  const { data: credibilityData, isLoading } = useQuery({
    queryKey: ['credibility', studentData?.Nome, studentData?.['Número da Chamada'], studentData?.['Curso']],
    queryFn: async () => {
      if (!studentData) return null;
      console.log(studentData);

      const res = await apiClient.get<{ isCredible: CredibilityStatus; loans: any[] }>(
        '/book-loans/check-credibility',
        {
          params: {
            fullname: studentData.Nome,
            rollNumber: studentData['Número da Chamada'],
            courseSlug: studentData['Curso'],
          },
        }
      );

      return res.data;
    },
    enabled: !!studentData,
  });

  const status = credibilityData?.isCredible;

  console.log(status);

  return (
    <Button className=" disabled:opacity-100 " variant={'outline'} disabled>
      {studentData ? (
        isLoading ? (
          <span className=" text-muted-foreground ">Verificando pendências...</span>
        ) : (
          <>
            {status === 'completely' && (
              <>
                <Icon name="checkCircle" className=" text-primary " />
                <span className=" text-sm text-primary ">Esse aluno não possui empréstimos pendentes</span>
              </>
            )}
            {status === 'partially' && (
              <>
                <Icon name="alertTriangle" className=" text-yellow-500 " />
                <span className=" text-sm text-yellow-500 ">Esse aluno já possui emprestimos ativos</span>
              </>
            )}
            {status === 'no' && (
              <>
                <Icon name="alertCircle" className=" text-destructive " />
                <span className=" text-sm text-destructive">Esse aluno possui empréstimos atrasados</span>
              </>
            )}
            {!status && <span className="text-muted-foreground">Status de pendência não disponível</span>}
          </>
        )
      ) : (
        <span className=" text-muted-foreground ">Nenhum estudante informado</span>
      )}
    </Button>
  );
}
