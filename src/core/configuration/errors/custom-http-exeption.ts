import { HttpException, HttpStatus } from '@nestjs/common';
import { EHttpErrorCodes } from './enums/http-error-codes';

export const DEFAULT_TIMEOUT = 300000;

type TErrorData = Record<string, unknown>;
interface IError {
  data?: {
    errors?: string[];
  };
  response?: {
    data?: {
      errors?: string[];
      errorCode?: string;
      statusCode?: number;
      message?: string;
    };
    error: string;
    status: number;
    message?: string;
  };
  status?: number;
  code?: string;
  stack?: string;
  message?: string;
}

function getErrorCodeFrom(error: IError): EHttpErrorCodes | string {
  const status = getStatusCodeFrom(error);
  const code =
    error?.response?.data?.errorCode ?? error?.response?.error ?? error?.code;

  if (status === HttpStatus.UNPROCESSABLE_ENTITY)
    return EHttpErrorCodes.UNPROCESSABLE_ENTITY;

  const errorCode =
    EHttpErrorCodes[code?.toUpperCase() as keyof typeof EHttpErrorCodes] ??
    EHttpErrorCodes.INTERNAL_SERVER_ERROR;

  return errorCode;
}

function getStatusCodeFrom(error: IError): HttpStatus {
  if (
    error.code === EHttpErrorCodes.ECONNREFUSED ||
    error.code === EHttpErrorCodes.ECONNABORTED
  ) {
    return HttpStatus.SERVICE_UNAVAILABLE;
  }

  return (
    error?.response?.data?.statusCode ??
    error?.response?.status ??
    error?.status ??
    HttpStatus.INTERNAL_SERVER_ERROR
  );
}

function getErrorDataFrom(error: IError): { stack: string | null } {
  return { stack: error?.stack ?? null };
}

function getErrorMessageFrom(error: IError): string {
  return (
    error?.response?.data?.message ??
    error?.response?.message ??
    error?.message ??
    ''
  );
}

function getErrorFrom(requestError: any): IError {
  if (requestError?.data?.errors?.length) return requestError.data.errors[0];

  if (requestError?.response?.data?.errors?.length)
    return requestError.response.data.errors[0];

  return requestError;
}

export default class CustomHttpException extends HttpException {
  private errorMessage: string;

  constructor(
    errorCode: string,
    statusCode: HttpStatus,
    errorMessage: string,
    data?: TErrorData,
  ) {
    const errorData = {
      errorCode,
      statusCode,
      errorMessage,
      data: data ?? {},
    };

    super(errorData, errorData.statusCode);

    this.errorMessage = errorMessage;
  }

  getMessage(): string {
    return this.errorMessage;
  }

  static parseError(requestError: any): CustomHttpException {
    const error = getErrorFrom(requestError);
    return new CustomHttpException(
      getErrorCodeFrom(error),
      getStatusCodeFrom(error),
      getErrorMessageFrom(error),
      getErrorDataFrom(error),
    );
  }

  static internalServerError(data?: TErrorData) {
    return new CustomHttpException(
      EHttpErrorCodes.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error',
      data,
    );
  }

  static requestTimeout() {
    return new CustomHttpException(
      EHttpErrorCodes.ECONNABORTED,
      HttpStatus.REQUEST_TIMEOUT,
      `timeout of ${DEFAULT_TIMEOUT} exceeded`,
    );
  }

  static unauthorized(data?: TErrorData) {
    return new CustomHttpException(
      EHttpErrorCodes.UNAUTHORIZED,
      HttpStatus.UNAUTHORIZED,
      'Invalid credentials',
      data,
    );
  }

  static badRequest(data?: TErrorData) {
    return new CustomHttpException(
      EHttpErrorCodes.BAD_REQUEST,
      HttpStatus.BAD_REQUEST,
      'Bad request',
      data,
    );
  }

  static notFound(errorMessage: string) {
    return new CustomHttpException(
      EHttpErrorCodes.NOT_FOUND,
      HttpStatus.NOT_FOUND,
      errorMessage,
      {},
    );
  }
}
