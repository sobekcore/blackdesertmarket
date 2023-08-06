export type EventBroker = BroadcastChannel;

export type EventBrokerCallback<T> = (event: T) => void;

export function getEventBroker(name: string): EventBroker;

export function handleBrokerEvents<T = EventBroker, E extends Event = Event>(broker: T, events: Record<string, EventBrokerCallback<E>>): void;
