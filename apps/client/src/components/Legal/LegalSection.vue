<template>
  <div class="flex justify-center">
    <div class="flex w-[800px] flex-col gap-3 sm:gap-4">
      <LegalTitle :title="props.title" />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import LegalTitle from '@/components/Legal/LegalTitle.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
