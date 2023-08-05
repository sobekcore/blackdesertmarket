import { ServiceWorkerCache } from '@/enums/cache';
import { ServiceWorkerEvent } from '@/enums/event';

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
