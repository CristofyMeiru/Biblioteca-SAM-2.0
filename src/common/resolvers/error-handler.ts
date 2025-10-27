// lib/error-handler.ts
import { AppError } from "@/common/resolvers/app-error";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function errorHandler(error: unknown) {
  console.error(error);

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        message: error.message,
        type: error.type,
        details: error.details ?? undefined,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json({ message: "Erro de validação.", issues: error.issues }, { status: 400 });
  }

  return NextResponse.json({ message: "Erro interno inesperado." }, { status: 500 });
}
