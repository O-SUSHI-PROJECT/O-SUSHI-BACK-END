import { ExecutionContext } from '@nestjs/common';

export default class RequestContextDto {
  context: ExecutionContext;

  stringifiedBody: string;

  trackId: string;

  startTime: number;

  metadata: string;

  constructor(props: Partial<RequestContextDto>) {
    Object.assign(this, props);
  }
}
