<template>
  <div class="flex h-full w-full items-center justify-center">
    <h2>{{ translate('generic.comingSoon') }}...</h2>
  </div>
</template>

<script lang="ts" setup>
import { TranslateKey, useInject } from '@/composables/use-inject';

const translate = useInject(TranslateKey);
</script>
