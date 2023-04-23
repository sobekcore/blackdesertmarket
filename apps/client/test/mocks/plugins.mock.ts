import { I18n, createI18n } from 'vue-i18n';
import { Router } from 'vue-router';
import { Pinia, createPinia } from 'pinia';
import { router } from '@/router/router';
import { messages } from '@/i18n/i18n';

export function mockPlugins(): [Pinia, I18n, Router] {
  const store: Pinia = createPinia();

  const i18n: I18n = createI18n({
    messages: messages,
    legacy: false,
  });

  return [store, i18n, router];
}
