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

self.addEventListener('message', (event: ExtendableMessageEvent): void => {
  switch (event.data.type) {
    case ServiceWorkerEvent.APPLICATION_CACHE_INIT:
      event.waitUntil(populateApplicationCache(event.data.payload));
      return;
  }
});

self.addEventListener('fetch', (event: FetchEvent): void => {
  event.respondWith(findRuntimeCache(event.request) as Promise<Response>);
});

export {};
