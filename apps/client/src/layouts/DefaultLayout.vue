<template>
  <AppMarketplaceView>
    <AppMarketplaceProvider>
      <div class="flex flex-grow">
        <nav class="w-1/4 min-w-[250px] overflow-y-scroll bg-dark-200">
          <CategorySidemenu />
        </nav>
        <main class="w-3/4 overflow-y-scroll bg-dark-100">
          <slot></slot>
        </main>
      </div>
    </AppMarketplaceProvider>
  </AppMarketplaceView>
</template>

<script lang="ts" setup>
import AppMarketplaceView from '@/components/base/AppMarketplaceView.vue';
import AppMarketplaceProvider from '@/components/base/AppMarketplaceProvider.vue';
import CategorySidemenu from '@/components/CategorySidemenu/CategorySidemenu.vue';
</script>
