<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import axios, { AxiosInstance } from 'axios';
import { MarketConfig } from '@/interfaces/market-config';
import marketConfig from '@/config/market.config';

provide('axios', axios as AxiosInstance);
provide('marketConfig', marketConfig as MarketConfig);
</script>
