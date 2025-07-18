import { v4 } from 'uuid';
import { AsyncLocalStorage } from 'async_hooks';

export class ContextHandler {
  public static TRACK_ID_KEY = 'trackId';

  private readonly asyncLocalStorage: AsyncLocalStorage<Map<string, any>>;

  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage();
  }

  addTrackId = (callback: () => any, trackId = v4()) => {
    if (this.asyncLocalStorage) {
      return this.asyncLocalStorage.run(new Map(), () => {
        const store = this.asyncLocalStorage.getStore();
        if (store) {
          store.set(ContextHandler.TRACK_ID_KEY, trackId);
        }
        return callback();
      });
    }
  };

  getTrackId = () => {
    return this.asyncLocalStorage.getStore()?.get(ContextHandler.TRACK_ID_KEY);
  };
}

const { getTrackId, addTrackId } = new ContextHandler();

export default { getTrackId, addTrackId };
