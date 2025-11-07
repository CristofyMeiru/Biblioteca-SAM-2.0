import { errorHandler } from '@/common/resolvers/error-handler';
import { NextResponse } from 'next/server';
import * as booksService from '../books.service';

export async function GET() {
  try {
    const result = await booksService.count();

    return NextResponse.json({ count: result }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
