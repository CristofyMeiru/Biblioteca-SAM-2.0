import { errorHandler } from '@/common/resolvers/error-handler';
import { NextRequest, NextResponse } from 'next/server';
import * as pipe from '../book-loans.pipe';
import * as bookLoansService from '../book-loans.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const parsedValues = pipe.countBookLoansSchemaQuery.parse(Object.fromEntries(searchParams.entries()));

    const result = await bookLoansService.count(parsedValues);

    return NextResponse.json({total: result}, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
