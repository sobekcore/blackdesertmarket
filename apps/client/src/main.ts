import { App as Application, createApp } from 'vue';
import { Pinia, createPinia } from 'pinia';
import { router } from '@/router';
import App from '@/App.vue';
import '@/styles/styles.scss';

const app: Application<Element> = createApp(App);
const store: Pinia = createPinia();

app.use(store);
app.use(router);

app.mount('#app');
