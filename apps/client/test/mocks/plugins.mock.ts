import { Pinia, createPinia } from 'pinia';
import { router } from '@/router/router';

export function mockPlugins() {
  const store: Pinia = createPinia();
  return [store, router];
}
