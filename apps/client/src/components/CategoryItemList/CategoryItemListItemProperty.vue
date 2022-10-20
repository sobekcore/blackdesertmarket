<template>
  <span class="flex w-1/5 flex-col">
    <span class="text-left text-xs text-light-300">{{ props.label }}</span>
    <span class="text-right">{{ props.value }}</span>
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>
