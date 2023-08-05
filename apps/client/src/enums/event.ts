/**
 * Events are meant to be used with BroadcastChannel messaging system
 * There might be some exceptions which require other techniques
 */

export enum ServiceWorkerEvent {
  /**
   * Those 2 events are using native postMessage ServiceWorker methods
   */
  APPLICATION_CACHE_INIT = 'APPLICATION_CACHE_INIT',
  APPLICATION_CACHE_FINISHED = 'APPLICATION_CACHE_FINISHED',

  RUNTIME_CACHE_REQUEST_FAILED = 'RUNTIME_CACHE_REQUEST_FAILED',
}

/**
 * TODO: Create a better abstraction layer for managing events with EventBroker
 */
export enum EventBroker {
  SERVICE_WORKER = 'service-worker',
}
