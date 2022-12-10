import { Router } from 'vue-router';
import { Pinia, createPinia } from 'pinia';
import { router } from '@/router/router';

export function mockPlugins(): [Pinia, Router] {
  const store: Pinia = createPinia();
  return [store, router];
}
