// domain/errors/app-error.ts

export enum ErrorType {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  CONFLICT = "CONFLICT",
  VALIDATION_ERROR = "VALIDATION_ERROR",
}

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL_SERVER_ERROR,
    statusCode?: number,
    details?: unknown
  ) {
    super(message);
    this.name = "AppError";
    this.type = type;
    this.statusCode = statusCode ?? AppError.mapTypeToStatusCode(type);
    this.details = details;

    Error.captureStackTrace?.(this, AppError);
  }

  private static mapTypeToStatusCode(type: ErrorType): number {
    switch (type) {
      case ErrorType.BAD_REQUEST:
      case ErrorType.VALIDATION_ERROR:
        return 400;
      case ErrorType.UNAUTHORIZED:
        return 401;
      case ErrorType.FORBIDDEN:
        return 403;
      case ErrorType.NOT_FOUND:
        return 404;
      case ErrorType.CONFLICT:
        return 409;
      default:
        return 500;
    }
  }
}
