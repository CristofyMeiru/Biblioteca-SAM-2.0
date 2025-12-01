import { BookLoansWithDetailsDTO } from '@/app/api/book-loans/book-loans.dto';
import { Form } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { capitalCase } from 'change-case';
import { useForm } from 'react-hook-form';

type DialogEditBookLoanFormProps = {
  dataBookLoan: BookLoansWithDetailsDTO | undefined;
};

export default function DialogEditBookLoanForm({ dataBookLoan }: DialogEditBookLoanFormProps) {
  const formEditBookLoan = useForm<BookLoansWithDetailsDTO>({
    defaultValues: dataBookLoan,
  });

  return (
    <Form {...formEditBookLoan}>
      <form>
        <fieldset className=" space-y-2 mb-4 " disabled>
          <div className=" flex items-center space-x-2 ">
            <h2 className=" text-lg font-semibold ">Informações do aluno</h2>
            <Icon name="user" />
          </div>

          <div className=" space-y-1 ">
            <Label>Nome</Label>
            <Input className=" disabled:opacity-100 " value={capitalCase(dataBookLoan?.fullname || '')} />
          </div>

          <div className=" flex flex-1 space-x-2 ">
            <div className=" flex-1 space-y-1 ">
              <Label>Turma</Label>
              <Input
                className=" disabled:opacity-100 "
                value={capitalCase(`${dataBookLoan?.courseGradeLevel || ''}º ${dataBookLoan?.courseName || ''}` || '')}
              />
            </div>
            <div className=" space-y-1 ">
              <Label>Nº da Chamada</Label>
              <Input className=" disabled:opacity-100 " value={dataBookLoan?.rollNumber || ''} />
            </div>
          </div>
        </fieldset>

        <Separator />

        <fieldset disabled>
          <div className=" flex items-center space-x-2 ">
            <h2 className=" text-lg font-semibold ">Informações do livro</h2>
            <Icon name="book" />
          </div>

          <div className=' flex items-center space-x-2 '>
            <div className=" flex-1 space-y-1 ">
              <Label>Título</Label>
              <Input className=" outline disabled:opacity-100 " value={capitalCase(dataBookLoan?.bookTitle || '')} />
            </div>

            <div className=" flex-1 space-y-1 ">
              <Label>Autor</Label>
              <Input className=" disabled:opacity-100 " value={capitalCase(dataBookLoan?.bookAuthor || '')} />
            </div>
          </div>
        </fieldset>

      </form>
    </Form>
  );
}
