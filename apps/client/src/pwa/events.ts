import { getEventBroker, handleBrokerEvents } from '@blackdesertmarket/event-broker';
import { EventBroker, ServiceWorkerEvent } from '@/enums/event';
import { useLocationStore } from '@/stores/location';

export function listenForServiceWorkerEvents(): void {
  const locationStore = useLocationStore();

  handleBrokerEvents(getEventBroker(EventBroker.SERVICE_WORKER), {
    [ServiceWorkerEvent.APPLICATION_CACHE_REQUEST_FAILED]: (): void => {
      locationStore.offline = true;
    },
  });
}
