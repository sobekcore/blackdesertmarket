<template>
  <span class="hidden w-1/5 min-w-1/5 flex-col justify-between sm:flex">
    <span class="flex items-center justify-start gap-1 text-xs text-dark-800">
      <slot name="label">
        {{ props.label }}
      </slot>
    </span>
    <span data-test="value" class="flex items-center justify-end">
      <slot name="value">
        {{ props.value }}
      </slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: [String, Number],
  },
});
</script>
