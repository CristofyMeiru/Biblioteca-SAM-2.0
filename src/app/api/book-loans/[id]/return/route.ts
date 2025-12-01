import { errorHandler } from '@/common/resolvers/error-handler';
import { capitalCase } from 'change-case';
import { NextRequest, NextResponse } from 'next/server';
import * as pipe from '../../book-loans.pipe';
import * as bookLoansService from '../../book-loans.service';

export async function PATCH(_req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const parsedParams = pipe.bookLoanParamsSchema.parse(params);

    const result = await bookLoansService.returnById(parsedParams.id);

    return NextResponse.json(
      { message: `Empréstimo de ${capitalCase(result.fullname)} concluído com sucesso.` },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
