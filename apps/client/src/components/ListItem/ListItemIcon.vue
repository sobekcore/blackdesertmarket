<template>
  <span class="relative flex items-center">
    <AppIcon
      :src="props.src"
      :class="props.class"
      class="h-[46px] w-[46px] rounded border border-dark-600 bg-dark-100"
    />
    <span role="presentation" aria-hidden="true" class="text-over-icon">
      {{ text }}
    </span>
  </span>
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
  text: {
    type: String,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.text-over-icon {
  @apply absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 select-none font-dejavu-sans-condensed text-lg;
  text-shadow: 0 0 1px $ITEM_ICON_HIGHLIGHT, 0 0 2px $ITEM_ICON_HIGHLIGHT, 0 0 3px $ITEM_ICON_HIGHLIGHT,
    0 0 4px $ITEM_ICON_HIGHLIGHT, 0 0 5px $ITEM_ICON_HIGHLIGHT, 0 0 6px $ITEM_ICON_HIGHLIGHT;
}
</style>
