<template>
  <span class="block text-xs">
    {{ formatItemFavoritesHeaderText(translate('itemFavorites.headerTextRegister')) }}
  </span>
  <span class="block text-xs">
    {{ formatItemFavoritesHeaderText(translate('itemFavorites.headerTextCount')) }}
  </span>
</template>

<script lang="ts" setup>
import { TranslateKey, useInject } from '@/composables/use-inject';

const translate = useInject(TranslateKey);

const formatItemFavoritesHeaderText = (text: string): string => {
  return `– ${text}`;
};
</script>
