import { errorHandler } from '@/common/resolvers/error-handler';
import { NextRequest, NextResponse } from 'next/server';
import * as pipe from './book-loans.pipe';
import * as bookLoansService from './book-loans.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const parsedValues = pipe.getBookLoansSchemaQuery.parse(Object.fromEntries(searchParams.entries()));

    const result = await bookLoansService.get({
      page: parsedValues.page,
      limit: parsedValues.limit,
      status: parsedValues.status,
      search: parsedValues.search,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = await pipe.createBookLoanSchema.parseAsync(body);

    const result = await bookLoansService.createBookLoan(parsedBody);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
