<template>
  <img :class="props.class" class="select-none" :src="props.src" alt="Icon" />
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
