import { App as Application, createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/styles/styles.scss';

const app: Application<Element> = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
