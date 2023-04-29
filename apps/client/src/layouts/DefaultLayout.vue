<template>
  <AppMarketplaceView ref="view">
    <AppMarketplaceProvider>
      <div class="flex h-full flex-grow flex-col xl:flex-row">
        <div class="navigation-sm">
          <button class="h-full" @click="showNavigation">
            <AppIcon :src="require('@/assets/images/icon.png')" class="h-full" />
          </button>
        </div>
        <div
          :class="{
            backdrop: true,
            'pointer-events-none bg-dark-100 bg-opacity-0': !navigationOnCanvas,
            'bg-dark-100 bg-opacity-70': navigationOnCanvas,
          }"
          @click="hideNavigation"
        ></div>
        <nav
          :class="{
            navigation: true,
            '-translate-x-full': !navigationOnCanvas,
            'translate-x-0': navigationOnCanvas,
          }"
        >
          <CategorySidemenu @navigate="categorySidemenuNavigate" />
        </nav>
        <main :key="locationStore.reload" class="h-full w-full overflow-y-hidden bg-dark-100 xl:w-3/4">
          <AppMaintenance v-if="maintenance" />
          <slot v-else></slot>
        </main>
      </div>
    </AppMarketplaceProvider>
  </AppMarketplaceView>
</template>

<script lang="ts" setup>
import { ComputedRef, Ref, computed, ref } from 'vue';
import { Router, useRouter } from 'vue-router';
import { UseSwipeReturn, useSwipe } from '@vueuse/core';
import { useLocationStore } from '@/stores/location';
import AppIcon from '@/components/Base/AppIcon.vue';
import AppMaintenance from '@/components/Base/AppMaintenance.vue';
import AppMarketplaceProvider from '@/components/Base/AppMarketplaceProvider.vue';
import AppMarketplaceView from '@/components/Base/AppMarketplaceView.vue';
import CategorySidemenu from '@/components/CategorySidemenu/CategorySidemenu.vue';

const locationStore = useLocationStore();
const router: Router = useRouter();

const view: Ref<HTMLElement | null> = ref(null);
const navigationOnCanvas: Ref<boolean> = ref(false);

const swipe: UseSwipeReturn = useSwipe(view, {
  onSwipe(): void {
    if (swipe.lengthX.value < -100) {
      showNavigation();
    } else if (swipe.lengthX.value > 100) {
      hideNavigation();
    }
  },
});

const showNavigation = (): void => {
  navigationOnCanvas.value = true;
};

const hideNavigation = (): void => {
  navigationOnCanvas.value = false;
};

const categorySidemenuNavigate = (): void => {
  hideNavigation();
};

const maintenance: ComputedRef<boolean> = computed((): boolean => {
  return locationStore.maintenance;
});

router.afterEach((): void => {
  locationStore.maintenance = false;
});
</script>

<style lang="scss" scoped>
.navigation {
  @apply absolute z-20 h-full w-auto border-r border-r-dark-600 bg-dark-200 xl:static xl:w-1/4 xl:translate-x-0;
  transition: transform 0.3s;
}

.navigation-sm {
  @apply h-[50px] border-b border-b-dark-600 bg-dark-200 p-2 hover:bg-dark-200 xl:hidden;
}

.backdrop {
  @apply absolute z-20 h-full w-full xl:hidden;
  transition: background 0.3s;
}
</style>
