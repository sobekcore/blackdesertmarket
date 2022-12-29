<template>
  <AppMarketplaceView>
    <AppMarketplaceProvider>
      <div class="flex flex-grow">
        <nav class="w-1/4 min-w-[250px] overflow-y-scroll bg-dark-200">
          <CategorySidemenu />
        </nav>
        <main class="w-3/4 overflow-y-scroll bg-dark-100">
          <template v-if="maintenance">
            <AppMaintenance />
          </template>
          <template v-else>
            <slot></slot>
          </template>
        </main>
      </div>
    </AppMarketplaceProvider>
  </AppMarketplaceView>
</template>

<script lang="ts" setup>
import { ComputedRef, computed } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useMarketStore } from '@/stores/market';
import AppMaintenance from '@/components/Base/AppMaintenance.vue';
import AppMarketplaceProvider from '@/components/Base/AppMarketplaceProvider.vue';
import AppMarketplaceView from '@/components/Base/AppMarketplaceView.vue';
import CategorySidemenu from '@/components/CategorySidemenu/CategorySidemenu.vue';

const marketStore = useMarketStore();
const router: Router = useRouter();

const maintenance: ComputedRef<boolean> = computed((): boolean => {
  return marketStore.maintenance;
});

router.afterEach((): void => {
  marketStore.maintenance = false;
});
</script>
