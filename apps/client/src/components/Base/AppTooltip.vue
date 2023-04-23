<template>
  <Tooltip
    container="#tooltip"
    :distance="distance"
    :placement="props.placement"
    :disabled="props.disabled"
    :popper-class="props.class"
    class="flex"
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
import { VueAttributeClass } from '@/types/attributes-vue';
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
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
    default: 'tooltip:default',
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
@import '@/styles/variables.scss';
@import '@/styles/modules/item-grade.scss';

@each $itemGrade, $color in $itemGrades {
  .v-popper--theme-tooltip.tooltip\:item-grade-#{$itemGrade} .v-popper__inner {
    @apply border-item-grade-#{$itemGrade} rounded-md p-3;
    background: linear-gradient(to top, rgba($DARK_100, 90%) 60%, map-get($itemGradesBackground, $itemGrade));

    .text\:item-grade-#{$itemGrade} {
      color: map-get($itemGradesText, $itemGrade);
      text-shadow: 1px 1px 1px $DARK_100;
    }
  }
}

.v-popper--theme-tooltip.tooltip\:default .v-popper__inner {
  @apply rounded-md border-dark-600 bg-dark-100 bg-opacity-90 p-1.5 text-sm;
}

.v-popper--theme-tooltip.tooltip\:item-default .v-popper__inner {
  @apply rounded-md border-dark-600 bg-dark-100 bg-opacity-90 p-3;
}

.v-popper--theme-tooltip .v-popper__inner {
  @apply border text-sm text-dark-900;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
  @apply border-none;
}
</style>
