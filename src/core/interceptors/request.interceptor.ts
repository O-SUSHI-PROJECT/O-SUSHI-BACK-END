import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import AppLogger from '../configuration/loggers/app.logger';
import RequestContextBuilder from '../configuration/context/context.builder';
import RequestContext from './dto/request-context.dto';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const requestStart = Date.now();
      const httpContext: HttpArgumentsHost = context.switchToHttp();
      const request = httpContext.getRequest<Request>();
      this.logRequestStart(request);
      const requestContext = RequestContextBuilder.build(context);

      return next.handle().pipe(
        tap(() => this.logRequestEnd(requestContext, requestStart)),
        catchError((err) => {
          this.logRequestError(requestContext, err, requestStart);
          return throwError(err);
        }),
      );
    }
    return next.handle();
  }

  private logRequestStart(request: Request): void {
    this.logger.info({
      message: `Started HTTP Request ${request.method} ${request.url}`,
    });
  }

  private logRequestEnd(request: RequestContext, requestStart: number): void {
    const elapsedTime = Date.now() - requestStart;
    this.logger.info(
      `[${request.trackId}] Finished HTTP in ${elapsedTime}ms | Metadata: ${request.metadata}`,
    );
  }

  private logRequestError(
    request: RequestContext,
    error: any,
    requestStart: number,
  ): void {
    const stack = error?.stack;
    const elapsedTime = Date.now() - requestStart;
    const body = request.stringifiedBody;
    const status = error?.status || error?.response?.status;
    const log = `[${request.trackId}] Finished HTTP in ${elapsedTime}ms |
    Metadata: ${request.metadata} | Body: ${body} | Status: ${status}`;
    this.logger.error(log, stack);
  }
}
