<template>
  <span data-test="label" class="text-right text-xs">
    {{ formatItemTooltipPropertyLabel(props.label) }}
  </span>
  <span data-test="value" :class="props.class">
    {{ props.value }}
  </span>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { VueAttributeClass } from '@/types/attributes-vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
    default: 'text-xs leading-5',
  },
});

const formatItemTooltipPropertyLabel = (label: string): string => {
  return `${label}:`;
};
</script>
