import { ServiceWorkerCache } from '@/enums/cache';
import { EventBroker, ServiceWorkerEvent } from '@/enums/event';
import { HttpHeader } from '@/enums/http';

const channel: BroadcastChannel = new BroadcastChannel(EventBroker.SERVICE_WORKER);

export async function findRuntimeCache(request: Request): Promise<Response | undefined> {
  if (request.destination === 'document') {
    return caches.match('/');
  }

  const cache: Cache = await caches.open(ServiceWorkerCache.RUNTIME);
  const cachedResponse: Response | undefined = await caches.match(request);

  const handleCachedResponse = (): Promise<Response | undefined> => {
    const cacheControl: string | null = request.headers.get(HttpHeader.CACHE_CONTROL);

    if (!cachedResponse && cacheControl === 'stale-if-error') {
      channel.postMessage({
        type: ServiceWorkerEvent.RUNTIME_CACHE_REQUEST_FAILED,
      });
    }

    return Promise.resolve(cachedResponse);
  };

  return fetch(request)
    .then((response: Response): Promise<Response | undefined> => {
      if (response.status && !response.ok) {
        return handleCachedResponse();
      }

      return cache.put(request, response.clone()).then((): Response => {
        return response;
      });
    })
    .catch((): Promise<Response | undefined> => {
      return handleCachedResponse();
    });
}
