<template>
  <span class="flex w-1/5 flex-col justify-between">
    <span class="flex items-center justify-start text-xs text-dark-800">
      <slot name="label">
        {{ props.label }}
      </slot>
    </span>
    <span class="flex items-center justify-end">
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
