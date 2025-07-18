import { ExecutionContext } from '@nestjs/common';
import RequestContext from '../../interceptors/dto/request-context.dto';
import { v4 as uuid } from 'uuid';

export default class ContextBuilder {
  static build(context: ExecutionContext): RequestContext {
    return new RequestContext({
      context,
      startTime: Date.now(),
      trackId: this.getTrackIdFromContext(context),
      stringifiedBody: this.getBodyFromContext(context),
      metadata: this.getMetaDataFromContext(context),
    });
  }

  private static getTrackIdFromContext(context: ExecutionContext): string {
    const { headers } = context.switchToHttp().getRequest();
    return this.getTrackIdFrom(headers);
  }

  private static getTrackIdFrom(headers: any): string {
    if (!headers.trackId) {
      headers.trackId = uuid();
    }
    return headers.trackId;
  }

  private static getBodyFromContext(context: ExecutionContext): string {
    return JSON.stringify(context.switchToHttp().getRequest().body);
  }

  private static getMetaDataFromContext(context: ExecutionContext): string {
    const { url, method, params, query, body } = context
      .switchToHttp()
      .getRequest();
    return JSON.stringify({
      url,
      method,
      params,
      query,
      body,
    });
  }
}
