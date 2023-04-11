<template>
  <span :class="props.class" class="flex">
    <AppIcon :src="props.icon" :class="props.iconClass" />
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { VueAttributeClass } from '@/types/attributes-vue';
import AppIcon from '@/components/Base/AppIcon.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
    default: 'items-center gap-2',
  },
  iconClass: {
    type: [String, Object] as PropType<VueAttributeClass>,
    default: 'h-[20px]',
  },
});
</script>
