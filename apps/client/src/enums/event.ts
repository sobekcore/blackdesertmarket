/**
 * Events are meant to be used with @blackdesertmarket/event-broker package
 * There might be some exceptions which require other broker instances than EventBroker
 */
export enum EventBroker {
  SERVICE_WORKER = 'service-worker',
}

export enum ServiceWorkerEvent {
  /**
   * Those 2 events are using ServiceWorkerGlobalScope broker instance
   */
  APPLICATION_CACHE_INIT = 'APPLICATION_CACHE_INIT',
  APPLICATION_CACHE_FINISHED = 'APPLICATION_CACHE_FINISHED',

  RUNTIME_CACHE_REQUEST_FAILED = 'RUNTIME_CACHE_REQUEST_FAILED',
}
