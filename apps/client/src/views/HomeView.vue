<template>
  <AppMarketplaceView>
    <AppMarketplaceProvider>
      <div class="flex flex-grow">
        <nav class="category-sidemenu w-1/4 overflow-y-scroll">
          <CategorySidemenu />
        </nav>
        <main class="w-3/4 overflow-y-scroll">
          <section class="flex h-full w-full items-center justify-center">
            <AppLogo />
          </section>
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
import AppLogo from '@/components/base/AppLogo.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppMarketplaceView,
    AppMarketplaceProvider,
    CategorySidemenu,
    AppLogo,
  },
});
</script>

<style lang="scss" scoped>
.category-sidemenu {
  min-width: 250px;
}
</style>
