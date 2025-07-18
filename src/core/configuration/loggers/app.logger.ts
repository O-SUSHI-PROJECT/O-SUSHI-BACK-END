import winston, { createLogger, format, transports } from 'winston';
import { Injectable, LoggerService } from '@nestjs/common';

const isProduction = process.env.NODE_ENV === 'production';
@Injectable()
export default class AppLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(...this.getFormats()),
      defaultMeta: this.getDefaultMeta(),
      transports: [new transports.Console()],
    });
  }

  error(message: unknown, trace?: string): void {
    this.logger.error({ message, trace });
  }

  log(message: unknown): void {
    this.logger.info(message);
  }

  warn(message: unknown): void {
    this.logger.warn(message);
  }

  info(message: unknown): void {
    this.logger.info(message);
  }

  private traceableInfo = format((info) => {
    return {
      ...info,
    };
  });

  private getFormats = (): winston.Logform.Format[] => {
    const formats = [this.traceableInfo(), format.timestamp(), format.json()];

    return [...formats, format.prettyPrint()];
  };

  private getDefaultMeta = () => {
    const meta = { service: process.env.npm_package_name };
    return isProduction
      ? {
          ...meta,
          pod: process.env.POD_ID,
        }
      : meta;
  };
}
