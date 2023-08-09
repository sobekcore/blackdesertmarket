import { getEventBroker } from '@blackdesertmarket/event-broker';
import { ServiceWorkerCache } from '@/enums/cache';
import { EventBroker, ServiceWorkerEvent } from '@/enums/event';
import { HttpHeader } from '@/enums/http';

declare const self: ServiceWorkerGlobalScope;

export async function populateApplicationCache(files: string[]): Promise<void> {
  const cache: Cache = await caches.open(ServiceWorkerCache.APPLICATION);
  await cache.addAll(files);

  const clients: readonly Client[] = await self.clients.matchAll({ includeUncontrolled: true });

  for (const client of clients) {
    client.postMessage({
      type: ServiceWorkerEvent.APPLICATION_CACHE_FINISHED,
    });
  }
}

export async function findApplicationCache(request: Request): Promise<Response | undefined> {
  if (request.destination === 'document') {
    return caches.match('/');
  }

  const cache: Cache = await caches.open(ServiceWorkerCache.APPLICATION);
  const cachedResponse: Response | undefined = await cache.match(request);

  const handleCachedResponse = (): Promise<Response | undefined> => {
    const cacheControl: string | null = request.headers.get(HttpHeader.CACHE_CONTROL);

    if (!cachedResponse && cacheControl === 'stale-if-error') {
      getEventBroker(EventBroker.SERVICE_WORKER).postMessage({
        type: ServiceWorkerEvent.APPLICATION_CACHE_REQUEST_FAILED,
      });
    }

    return Promise.resolve(cachedResponse);
  };

  return fetch(request)
    .then((response: Response): Promise<Response | undefined> => {
      if (!response.ok) {
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
