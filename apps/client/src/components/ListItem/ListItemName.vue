<template>
  <span data-test="name" :class="props.class" class="flex flex-grow items-center overflow-hidden">
    <span class="truncate">{{ props.name }}</span>
  </span>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { VueAttributeClass } from '@/types/attributes-vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});
</script>
