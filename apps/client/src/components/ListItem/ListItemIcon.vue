<template>
  <AppIcon :src="props.src" :class="props.class" class="h-[46px] w-[46px] rounded border border-dark-600 bg-dark-100" />
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { VueAttributeClass } from '@/types/attributes-vue';
import AppIcon from '@/components/base/AppIcon.vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});
</script>
