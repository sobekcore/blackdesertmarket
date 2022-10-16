<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import axios, { AxiosInstance } from 'axios';
import { MarketConfig } from '@/interfaces/market-config';
import marketConfig from '@/config/market.config';

export default defineComponent({
  name: 'AppMarketplaceProvider',
  setup(): void {
    provide('axios', axios as AxiosInstance);
    provide('marketConfig', marketConfig as MarketConfig);
  },
});
</script>
