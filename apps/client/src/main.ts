import { App as Application, createApp } from 'vue';
import { I18n, createI18n } from 'vue-i18n';
import toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { ToastOptionsAndRequiredContent as Toast, ToastComponent } from 'vue-toastification/dist/types/types';
import virtualScroll from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import floating from 'floating-vue';
import 'floating-vue/dist/style.css';
import { Pinia, createPinia } from 'pinia';
import { router } from '@/router/router';
import { listenForServiceWorkerEvents } from '@/pwa/events';
import { registerOrActivateServiceWorker } from '@/pwa/pwa';
import { usePreferencesStore } from '@/stores/preferences';
import '@/styles/styles.scss';
import App from '@/App.vue';
import { messages } from '@/i18n/i18n';

const app: Application<Element> = createApp(App);

const store: Pinia = createPinia();
app.use(store);

const preferencesStore = usePreferencesStore();

const i18n: I18n = createI18n({
  locale: preferencesStore.getLanguage,
  messages: messages,
  legacy: false,
});

const options: PluginOptions = {
  transition: 'Vue-Toastification__fade',
  timeout: 3000,
  closeButton: false,
  filterBeforeCreate(toast: Toast, toasts: Toast[]): Toast | false {
    const filtered: Toast[] = toasts.filter((entry: Toast): boolean => {
      const entryContent: ToastComponent = entry.content as ToastComponent;
      const toastContent: ToastComponent = toast.content as ToastComponent;

      return (
        entryContent?.props?.title === toastContent?.props?.title &&
        entryContent?.props?.message === toastContent?.props?.message
      );
    });

    if (filtered.length !== 0) {
      return false;
    }

    return toast;
  },
};

app.use(i18n);
app.use(router);
app.use(toast, options);
app.use(floating);
app.use(virtualScroll);

registerOrActivateServiceWorker()
  .then((): void => {
    listenForServiceWorkerEvents();
    app.mount('#app');
  })
  .catch((): void => {
    app.mount('#app');
  });
