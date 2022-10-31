<template>
  <span :class="props.class" class="flex flex-grow items-center text-sm">
    {{ props.name }}
  </span>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
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
