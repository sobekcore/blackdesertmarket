<template>
  <AppMarketplaceProvider>
    <slot></slot>
  </AppMarketplaceProvider>
</template>

<script lang="ts" setup>
import AppMarketplaceProvider from '@/components/Base/AppMarketplaceProvider.vue';
</script>
