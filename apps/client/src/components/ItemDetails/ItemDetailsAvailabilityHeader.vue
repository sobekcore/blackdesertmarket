<template>
  <div class="relative">
    <div class="absolute inset-0 my-2.5 mx-2">
      <div class="h-full w-full rounded bg-dark-500"></div>
    </div>
    <div class="scroll-gutter-stable relative overflow-y-auto">
      <div class="my-2.5 mx-2 flex items-center p-2">
        <span class="w-full text-center text-xs">
          {{ translate('itemDetails.availability.header.sellCount') }}
        </span>
        <span class="w-full text-center text-xs">
          {{ translate('itemDetails.availability.header.onePrice') }}
        </span>
        <span class="w-full text-center text-xs">
          {{ translate('itemDetails.availability.header.buyCount') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslateKey, useInject } from '@/composables/use-inject';

const translate = useInject(TranslateKey);
</script>
