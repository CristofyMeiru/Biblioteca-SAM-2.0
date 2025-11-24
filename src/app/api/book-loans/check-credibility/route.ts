import { errorHandler } from '@/common/resolvers/error-handler';
import { NextRequest, NextResponse } from 'next/server';
import { checkCredibilitySchema } from '../book-loans.pipe';
import * as service from '../book-loans.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fullname = searchParams.get('fullname')?.toLowerCase();
    const rollNumber = searchParams.get('rollNumber')?.toLowerCase();
    const courseSlug = searchParams.get('courseSlug');

    const parsedValues = checkCredibilitySchema.parse({
      fullname,
      rollNumber: Number(rollNumber),
      courseSlug,
    });

    const result = await service.checkCredibility(parsedValues);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
