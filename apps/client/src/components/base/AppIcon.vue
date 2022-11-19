<template>
  <img role="presentation" :class="props.class" class="select-none object-contain" :src="props.src" alt="Icon" />
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { VueAttributeClass } from '@/types/attributes-vue';

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
