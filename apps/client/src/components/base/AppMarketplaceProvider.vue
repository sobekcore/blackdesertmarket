<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import { MarketConfig } from '@/interfaces/market-config';
import marketConfig from '@/config/market.config';

provide('marketConfig', marketConfig as MarketConfig);
</script>
