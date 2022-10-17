<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script lang="ts">
import { Ref, defineComponent, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, RouteRecordName, useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

interface AppData {
  layout: Ref<string>;
}

export default defineComponent({
  name: 'App',
  components: {
    DefaultLayout,
    EmptyLayout,
  },
  setup(): AppData {
    const extractLayoutFromRoute = (route: RouteLocationNormalizedLoaded): string => {
      return (route.meta.layout as string) || 'DefaultLayout';
    };

    const route: RouteLocationNormalizedLoaded = useRoute();
    const currentRouteLayout: string = extractLayoutFromRoute(route);

    const layout: Ref<string> = ref(currentRouteLayout);

    watch(
      (): RouteRecordName | null | undefined => {
        return route.name;
      },
      (): void => {
        layout.value = extractLayoutFromRoute(route);
      },
    );

    return { layout };
  },
});
</script>
