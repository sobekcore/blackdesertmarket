import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HotView from '@/views/HotView.vue';
import QueueView from '@/views/QueueView.vue';
import ListView from '@/views/ListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/hot',
    name: 'hot',
    component: HotView,
  },
  {
    path: '/queue',
    name: 'queue',
    component: QueueView,
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

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
