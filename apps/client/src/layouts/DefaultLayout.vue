<template>
  <AppMarketplaceView>
    <AppMarketplaceProvider>
      <div class="flex flex-grow">
        <nav class="w-1/4 min-w-[250px] border-r border-r-dark-600 bg-dark-200">
          <CategorySidemenu />
        </nav>
        <main :key="locationStore.reload" class="w-3/4 overflow-y-scroll bg-dark-100">
          <AppMaintenance v-if="maintenance" />
          <slot v-else></slot>
        </main>
      </div>
    </AppMarketplaceProvider>
  </AppMarketplaceView>
</template>

<script lang="ts" setup>
import { ComputedRef, computed } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useLocationStore } from '@/stores/location';
import AppMaintenance from '@/components/Base/AppMaintenance.vue';
import AppMarketplaceProvider from '@/components/Base/AppMarketplaceProvider.vue';
import AppMarketplaceView from '@/components/Base/AppMarketplaceView.vue';
import CategorySidemenu from '@/components/CategorySidemenu/CategorySidemenu.vue';

const locationStore = useLocationStore();
const router: Router = useRouter();

const maintenance: ComputedRef<boolean> = computed((): boolean => {
  return locationStore.maintenance;
});

router.afterEach((): void => {
  locationStore.maintenance = false;
});
</script>
