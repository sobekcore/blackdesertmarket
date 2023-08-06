import { handleBrokerEvents } from '@blackdesertmarket/event-broker';
import { ServiceWorkerEvent } from '@/enums/event';
import { populateApplicationCache } from '@/pwa/service-worker/application-cache';
import { findRuntimeCache } from '@/pwa/service-worker/runtime-cache';

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent): void => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event: ExtendableEvent): void => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event: FetchEvent): void => {
  event.respondWith(findRuntimeCache(event.request) as Promise<Response>);
});

handleBrokerEvents<ServiceWorkerGlobalScope, ExtendableMessageEvent>(self, {
  [ServiceWorkerEvent.APPLICATION_CACHE_INIT]: (event: ExtendableMessageEvent): void => {
    event.waitUntil(populateApplicationCache(event.data.payload));
  },
});

export {};
