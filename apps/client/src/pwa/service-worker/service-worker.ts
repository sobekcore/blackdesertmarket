import { handleBrokerEvents } from '@blackdesertmarket/event-broker';
import { ServiceWorkerEvent } from '@/enums/event';
import { findApplicationCache, populateApplicationCache } from '@/pwa/service-worker/application-cache';

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent): void => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event: ExtendableEvent): void => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event: FetchEvent): void => {
  event.respondWith(findApplicationCache(event.request) as Promise<Response>);
});

handleBrokerEvents<ServiceWorkerGlobalScope, ExtendableMessageEvent>(self, {
  [ServiceWorkerEvent.APPLICATION_CACHE_INIT]: (event: ExtendableMessageEvent): void => {
    event.waitUntil(populateApplicationCache(event.data.payload));
  },
});

export {};
