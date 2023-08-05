import { EventBroker, ServiceWorkerEvent } from '@/enums/event';
import { useLocationStore } from '@/stores/location';

const channel: BroadcastChannel = new BroadcastChannel(EventBroker.SERVICE_WORKER);

export function listenForGlobalEvents(): void {
  const locationStore = useLocationStore();

  channel.addEventListener('message', (event: MessageEvent): void => {
    switch (event.data.type) {
      case ServiceWorkerEvent.RUNTIME_CACHE_REQUEST_FAILED:
        locationStore.offline = true;
        return;
    }
  });
}
