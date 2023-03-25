import { App as Application, createApp } from 'vue';
import { I18n, createI18n } from 'vue-i18n';
import virtualScroll from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import floating from 'floating-vue';
import 'floating-vue/dist/style.css';
import { Pinia, createPinia } from 'pinia';
import { router } from '@/router/router';
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

app.use(i18n);
app.use(router);
app.use(floating);
app.use(virtualScroll);

app.mount('#app');
