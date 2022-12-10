<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import { MarketCategoriesConfig, MarketEnhancementConfig } from '@/interfaces/market-config';
import marketCategoriesConfig from '@/configs/market-categories.config';
import marketEnhancementConfig from '@/configs/market-enhancement.config';

provide('marketCategoriesConfig', marketCategoriesConfig as MarketCategoriesConfig);
provide('marketEnhancementConfig', marketEnhancementConfig as MarketEnhancementConfig);
</script>
