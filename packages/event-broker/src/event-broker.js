import { EventBrokerException } from './event-broker-exception';

const brokers = {};

export function getEventBroker(name) {
  if (!brokers[name]) {
    brokers[name] = new BroadcastChannel(name);
  }

  return brokers[name];
}

export function handleBrokerEvents(broker, events) {
  broker.addEventListener('message', (event) => {
    if (!events[event.data.type]) {
      throw new EventBrokerException(`Event of type ${event.data.type} is not handled by this broker instance`);
    }

    events[event.data.type](event);
  });
}
