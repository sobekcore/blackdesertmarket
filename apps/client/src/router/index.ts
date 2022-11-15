import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HotView from '@/views/HotView.vue';
import QueueView from '@/views/QueueView.vue';
import ListView from '@/views/ListView.vue';
import ItemView from '@/views/ItemView.vue';
import ItemDetailsView from '@/views/ItemDetailsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes: RouteRecordRaw[] = [
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
    path: '/item/:id',
    name: 'item',
    component: ItemView,
    children: [
      {
        path: ':enhancement',
        name: 'item-details',
        component: ItemDetailsView,
      },
    ],
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
