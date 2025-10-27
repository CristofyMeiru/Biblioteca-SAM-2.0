import { errorHandler } from "@/common/resolvers/error-handler";
import { NextRequest, NextResponse } from "next/server";
import * as pipe from "./courses.pipe";
import * as coursesService from "./courses.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = pipe.createCourseSchema.parse(body);

    const result = await coursesService.create(parsedBody);

    return NextResponse.json({ message: "Curso adicionado com sucesso.", course: result }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
