import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ListView from '@/views/ListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/list/:mainCategory/:subCategory',
    name: 'list',
    component: ListView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
