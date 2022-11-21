<template>
  <AppMarketplaceView>
    <AppMarketplaceProvider>
      <slot></slot>
    </AppMarketplaceProvider>
  </AppMarketplaceView>
</template>

<script lang="ts" setup>
import AppMarketplaceProvider from '@/components/Base/AppMarketplaceProvider.vue';
import AppMarketplaceView from '@/components/Base/AppMarketplaceView.vue';
</script>
