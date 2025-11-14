import { errorHandler } from '@/common/resolvers/error-handler';
import { NextRequest, NextResponse } from 'next/server';
import * as pipe from '../books.pipe';
import * as bookService from '../books.service';

export async function GET(_req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const parsedParams = pipe.bookParamsSchema.parse(params);

    const result = await bookService.getUnique(parsedParams);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(_req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const parsedParams = pipe.bookParamsSchema.parse(params);

    const result = await bookService.deleteById(parsedParams.id);

    return NextResponse.json({ message: 'Livro deletado com sucesso.', book: result }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const body = await req.json();
    const parsedBody = pipe.editBookBodySchema.parse(body);
    const parsedParams = pipe.bookParamsSchema.parse(params);

    const result = await bookService.updateById(parsedParams.id, parsedBody);

    return NextResponse.json({ message: 'Livro atualizado com sucesso.', book: result }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
