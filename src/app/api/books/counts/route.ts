import { errorHandler } from "@/common/resolvers/error-handler";
import { NextRequest, NextResponse } from "next/server";
import * as booksService from "../books.service";

export async function GET(_req: NextRequest) {
  try {
    const result = await booksService.count();

    return NextResponse.json({ count: result }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
