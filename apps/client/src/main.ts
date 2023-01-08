import { App as Application, createApp } from 'vue';
import floating from 'floating-vue';
import 'floating-vue/dist/style.css';
import { Pinia, createPinia } from 'pinia';
import { router } from '@/router/router';
import '@/styles/styles.scss';
import App from '@/App.vue';

const app: Application<Element> = createApp(App);
const store: Pinia = createPinia();

app.use(store);
app.use(router);
app.use(floating);

app.mount('#app');
