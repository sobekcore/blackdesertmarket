<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script lang="ts" setup>
import { Ref, shallowRef, watch } from 'vue';
import { RouteLocationNormalizedLoaded, RouteRecordName, useRoute } from 'vue-router';
import { useLayout } from '@/composables/use-layout';

const route: RouteLocationNormalizedLoaded = useRoute();
const { extractLayoutFromRoute } = useLayout();

const layout: Ref<unknown> = shallowRef(extractLayoutFromRoute(route));

watch(
  (): RouteRecordName | null | undefined => {
    return route.name;
  },
  (): void => {
    layout.value = extractLayoutFromRoute(route);
  },
);
</script>
