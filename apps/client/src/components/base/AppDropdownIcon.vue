<template>
  <AppIcon :class="props.class" :src="icon" />
</template>

<script lang="ts" setup>
import { PropType, ComputedRef, defineProps, computed } from 'vue';
import { VueAttributeClass } from '@/types/attributes-vue';
import { useDropdownIcon } from '@/composables/use-dropdown-icon';
import AppIcon from '@/components/base/AppIcon.vue';

const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
    default: 'h-[24px] drop-shadow-md',
  },
});

const icon: ComputedRef<string> = computed((): string => {
  return useDropdownIcon(props.active);
});
</script>
