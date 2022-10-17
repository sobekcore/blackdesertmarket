<template>
  <AppMarketplaceView>
    <AppMarketplaceProvider>
      <slot></slot>
    </AppMarketplaceProvider>
  </AppMarketplaceView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppMarketplaceView from '@/components/base/AppMarketplaceView.vue';
import AppMarketplaceProvider from '@/components/base/AppMarketplaceProvider.vue';

export default defineComponent({
  name: 'EmptyLayout',
  components: {
    AppMarketplaceView,
    AppMarketplaceProvider,
  },
});
</script>
