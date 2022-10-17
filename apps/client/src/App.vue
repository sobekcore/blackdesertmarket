<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, RouteRecordName, useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

const globalDefaultLayout = 'DefaultLayout';

const layouts: Record<string, unknown> = {
  DefaultLayout: DefaultLayout,
  EmptyLayout: EmptyLayout,
};

const extractLayoutFromRoute = (route: RouteLocationNormalizedLoaded): string => {
  return (route.meta.layout as string) || globalDefaultLayout;
};

const route: RouteLocationNormalizedLoaded = useRoute();

const currentRouteLayout: string = extractLayoutFromRoute(route);
const layout: Ref<unknown> = ref(layouts[currentRouteLayout] || layouts[globalDefaultLayout]);

watch(
  (): RouteRecordName | null | undefined => {
    return route.name;
  },
  (): void => {
    const currentRouteLayout: string = extractLayoutFromRoute(route);
    layout.value = layouts[currentRouteLayout] || layouts[globalDefaultLayout];
  },
);
</script>
