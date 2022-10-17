<template>
  <AppMarketplaceView>
    <AppMarketplaceProvider>
      <slot></slot>
    </AppMarketplaceProvider>
  </AppMarketplaceView>
</template>

<script lang="ts" setup>
import AppMarketplaceView from '@/components/base/AppMarketplaceView.vue';
import AppMarketplaceProvider from '@/components/base/AppMarketplaceProvider.vue';
</script>
