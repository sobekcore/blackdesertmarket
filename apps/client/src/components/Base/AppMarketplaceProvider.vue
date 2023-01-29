<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import { Composer, useI18n } from 'vue-i18n';
import marketCategoriesConfig from '@/configs/market-categories.config';
import marketEnhancementConfig from '@/configs/market-enhancement.config';
import {
  LocaleKey,
  MarketCategoriesConfigKey,
  MarketEnhancementConfigKey,
  TranslateKey,
} from '@/composables/use-inject';

const i18n: Composer = useI18n();

provide(LocaleKey, i18n.locale);
provide(TranslateKey, i18n.t);

provide(MarketCategoriesConfigKey, marketCategoriesConfig);
provide(MarketEnhancementConfigKey, marketEnhancementConfig);
</script>
