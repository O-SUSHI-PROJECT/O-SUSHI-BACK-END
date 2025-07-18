import { v4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';
import contextHandler, {
  ContextHandler,
} from '../configuration/context/context.handler';

class ContextMiddleware {
  middleware = (req: Request, res: Response, next: NextFunction) => {
    const trackIdValue = req.get(ContextHandler.TRACK_ID_KEY) || v4();
    res.setHeader(ContextHandler.TRACK_ID_KEY, trackIdValue);
    return contextHandler.addTrackId(next, trackIdValue);
  };
}

const { middleware } = new ContextMiddleware();

export default { middleware };
