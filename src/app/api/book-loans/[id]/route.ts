import { errorHandler } from '@/common/resolvers/error-handler';
import { capitalCase } from 'change-case';
import { NextRequest, NextResponse } from 'next/server';
import * as pipe from '../book-loans.pipe';
import * as bookLoansService from '../book-loans.service';

export async function GET(_req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const parsedParams = pipe.bookLoanParamsSchema.parse(params);

    const result = await bookLoansService.getById(parsedParams.id);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const body = await req.json();
    const parsedBody = pipe.editBookLoanBodySchema.parse(body);
    const parsedParams = pipe.bookLoanParamsSchema.parse(params);

    const result = await bookLoansService.updateById(parsedParams.id, parsedBody);

    return NextResponse.json({ message: 'Empréstimo atualizado com sucesso.', bookLoan: result }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(_req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const parsedParams = pipe.bookLoanParamsSchema.parse(params);

    const result = await bookLoansService.deleteById(parsedParams.id);

    return NextResponse.json(
      { message: `Empréstimo de ${capitalCase(result.fullname)} removido com sucesso.` },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
