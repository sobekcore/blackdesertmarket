<template>
  <img data-test="icon" role="presentation" :src="props.src" alt="Icon" :class="props.class" class="object-contain" />
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { VueAttributeClass } from '@/types/attributes-vue';

/**
 * TODO: Create alt prop to customize image attribute on different AppIcon instances
 */
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
    default: 'h-[24px]',
  },
});
</script>
