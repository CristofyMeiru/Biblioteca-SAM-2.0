import { errorHandler } from '@/common/resolvers/error-handler';
import { NextRequest, NextResponse } from 'next/server';
import * as pipe from '../courses.pipe';
import * as coursesService from '../courses.service';


export async function GET(_req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const parsedParams = await pipe.paramsCourseSchema.parseAsync(params);

    const result = await coursesService.getUnique(parsedParams);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const body = await req.json();
    const params = await Promise.resolve(context.params);

    const parsedBody = await pipe.updateCourseSchema.parseAsync(body);
    const parsedParams = await pipe.paramsCourseSchema.parseAsync(params);

    const result = await coursesService.updateById(parsedParams.id, parsedBody);

    return NextResponse.json({ message: 'Curso atualizado com sucesso.', course: result }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(_req: NextRequest, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const parsedParams = await pipe.paramsCourseSchema.parseAsync(params);

    const result = await coursesService.deleteById(parsedParams.id);

    return NextResponse.json({ message: 'Curso deletado com sucesso.', course: result }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

