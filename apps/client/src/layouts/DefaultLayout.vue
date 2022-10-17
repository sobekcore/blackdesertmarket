<template>
  <AppMarketplaceView>
    <AppMarketplaceProvider>
      <div class="flex flex-grow">
        <nav class="category-sidemenu w-1/4 overflow-y-scroll bg-dark-200">
          <CategorySidemenu />
        </nav>
        <main class="w-3/4 overflow-y-scroll bg-dark-100">
          <slot></slot>
        </main>
      </div>
    </AppMarketplaceProvider>
  </AppMarketplaceView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppMarketplaceView from '@/components/base/AppMarketplaceView.vue';
import AppMarketplaceProvider from '@/components/base/AppMarketplaceProvider.vue';
import CategorySidemenu from '@/components/CategorySidemenu.vue';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    AppMarketplaceView,
    AppMarketplaceProvider,
    CategorySidemenu,
  },
});
</script>

<style lang="scss" scoped>
.category-sidemenu {
  min-width: 250px;
}
</style>
