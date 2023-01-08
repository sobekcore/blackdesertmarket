<template>
  <Tooltip
    container="#tooltip"
    :distance="distance"
    :placement="props.placement"
    :disabled="props.disabled"
    auto-boundary-max-size
    handle-resize
    @show="triggerTooltipShow"
  >
    <slot></slot>
    <template #popper>
      <slot name="popper"></slot>
    </template>
  </Tooltip>
</template>

<script lang="ts" setup>
import { PropType, defineEmits, defineProps } from 'vue';
import { Placement, Tooltip } from 'floating-vue';
import { UseDocumentSizeReturn, useDocumentSize } from '@/composables/use-document-size';
import { UseTailwindConfigReturn, useTailwindConfig } from '@/composables/use-tailwind-config';

const emit = defineEmits({
  show: null,
});

const props = defineProps({
  placement: {
    type: String as PropType<Placement>,
    default: 'top',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const tailwindConfig: UseTailwindConfigReturn = useTailwindConfig();
const documentSize: UseDocumentSizeReturn = useDocumentSize();

const distance: number = documentSize.remToRaw(tailwindConfig.getValue('padding', '2.5'));

const triggerTooltipShow = (): void => {
  emit('show');
};
</script>

<style lang="scss">
@import '@/styles/variables';

.v-popper--theme-tooltip .v-popper__inner {
  @apply border border-dark-600 bg-dark-100 bg-opacity-90 p-3 text-sm text-dark-900;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
  @apply border-none;
}
</style>
