import { RouteLocationNormalizedLoaded } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

interface UseLayoutReturn {
  extractLayoutFromRoute(route: RouteLocationNormalizedLoaded): unknown;
}

export function useLayout(): UseLayoutReturn {
  const globalDefaultLayout: string = 'DefaultLayout';

  const layouts: Record<string, unknown> = {
    DefaultLayout: DefaultLayout,
    EmptyLayout: EmptyLayout,
  };

  const extractLayoutFromRoute = (route: RouteLocationNormalizedLoaded): unknown => {
    const currentRouteLayout: string = (route.meta.layout as string) || globalDefaultLayout;
    return layouts[currentRouteLayout] || layouts[globalDefaultLayout];
  };

  return {
    extractLayoutFromRoute,
  };
}
