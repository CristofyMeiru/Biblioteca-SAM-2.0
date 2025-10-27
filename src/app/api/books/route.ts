import { errorHandler } from "@/common/resolvers/error-handler";
import { NextRequest, NextResponse } from "next/server";
import * as pipe from "./books.pipe";
import * as booksService from "./books.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const parsedValues = pipe.getBooksSchemaQuery.parse({ page, limit });

    const result = await booksService.get({ page: parsedValues.page, limit: parsedValues.limit });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = pipe.createBookSchema.parse(body);

    const result = await booksService.create(data);

    return NextResponse.json({ message: "Livro criado com sucesso", book: result }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
