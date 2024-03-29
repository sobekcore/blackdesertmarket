import { handleBrokerEvents } from '@blackdesertmarket/event-broker';
import { ServiceWorkerEvent } from '@/enums/event';
import { getApplicationFiles } from '@/pwa/files';

export function registerOrActivateServiceWorker(): Promise<void> {
  return new Promise((resolve, reject): void => {
    navigator.serviceWorker
      /* webpackChunkName: "service-worker" */
      .register(new URL('service-worker/service-worker.ts', import.meta.url))
      .then((registration: ServiceWorkerRegistration): void => {
        if (registration.active) {
          return resolve();
        }

        if (!registration.installing) {
          return reject();
        }

        handleBrokerEvents<ServiceWorkerContainer>(navigator.serviceWorker, {
          [ServiceWorkerEvent.APPLICATION_CACHE_FINISHED]: (): void => {
            return resolve();
          },
        });

        registration.installing.postMessage({
          type: ServiceWorkerEvent.APPLICATION_CACHE_INIT,
          payload: getApplicationFiles(),
        });
      })
      .catch((): void => {
        reject();
      });
  });
}
