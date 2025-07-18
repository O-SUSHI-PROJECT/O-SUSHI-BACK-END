import { Logger } from '@nestjs/common';
import { formatISO } from 'date-fns';
import AppLogger from './app.logger';
import RequestContext from '../../interceptors/dto/request-context.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');

export default class RequestLogger extends Logger {
  constructor(
    private readonly reqContext: RequestContext,
    private logger: AppLogger,
  ) {
    super();
  }

  public reqStart(): void {
    const req = this.reqContext;
    const startTime = formatISO(req.startTime);
    const log = `[${req.trackId}] Request started at ${startTime} | Input: ${req.stringifiedBody} | Metadata: ${req.metadata}`;
    this.logger.info(log);
  }

  public reqEnd(): void {
    const requestDuration = Date.now() - this.reqContext.startTime;
    const log = `[${this.reqContext.trackId}] Request took ${requestDuration} ms`;
    this.logger.info(log);
  }

  public reqError(error: any): void {
    const requestDuration = Date.now() - this.reqContext.startTime;
    const formattedError = JSON.stringify(error.response.errorMessage);
    const log = `[${this.reqContext.trackId}] Request took ${requestDuration} ms | Error: ${formattedError}`;
    this.error(log);
    this.logger.error(log, error.stack);
    newrelic.noticeError(error, {
      log,
      input: this.reqContext.stringifiedBody,
      metadata: this.reqContext.metadata,
    });
  }
}
