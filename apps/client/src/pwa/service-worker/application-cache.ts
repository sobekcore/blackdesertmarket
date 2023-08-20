import { getEventBroker } from '@blackdesertmarket/event-broker';
import { ServiceWorkerCache } from '@/enums/cache';
import { EventBroker, ServiceWorkerEvent } from '@/enums/event';
import { HttpHeader } from '@/enums/http';
import { checkIsUrlExcludedFromSpa } from '@/router/excluded';

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
  const isUrlExcludedFromSpa: boolean = checkIsUrlExcludedFromSpa(request.url);

  if (!isUrlExcludedFromSpa && request.destination === 'document') {
    return caches.match('/');
  }

  const cache: Cache = await caches.open(ServiceWorkerCache.APPLICATION);
  const cachedResponse: Response | undefined = await cache.match(request);

  const handleCachedResponse = (fallback?: Response): Promise<Response | undefined> => {
    const cacheControl: string | null = request.headers.get(HttpHeader.CACHE_CONTROL);

    if (!cachedResponse && cacheControl === 'stale-if-error') {
      getEventBroker(EventBroker.SERVICE_WORKER).postMessage({
        type: ServiceWorkerEvent.APPLICATION_CACHE_REQUEST_FAILED,
      });
    }

    if (!cachedResponse && fallback?.status === 503) {
      return Promise.resolve(fallback);
    }

    return Promise.resolve(cachedResponse);
  };

  return fetch(request)
    .then((response: Response): Promise<Response | undefined> => {
      if (isUrlExcludedFromSpa) {
        return Promise.resolve(response);
      }

      if (!response.ok) {
        return handleCachedResponse(response);
      }

      return cache.put(request, response.clone()).then((): Response => {
        return response;
      });
    })
    .catch((): Promise<Response | undefined> => {
      return handleCachedResponse();
    });
}
