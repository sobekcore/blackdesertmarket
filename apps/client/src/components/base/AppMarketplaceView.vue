<template>
  <div class="flex h-screen">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppMarketplaceView',
});
</script>
