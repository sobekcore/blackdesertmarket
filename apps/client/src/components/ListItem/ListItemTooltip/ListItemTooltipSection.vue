<template>
  <div data-test="outer" :class="props.class" class="flex flex-col rounded p-1.5 text-xs text-dark-900">
    <span data-test="name" :class="props.nameClass" class="section-name">
      {{ getItemTooltipSectionName() }}
    </span>
    <div v-if="props.itemTooltipSection.values" class="section-values mt-0.5 ml-2.5 flex flex-col gap-0.5">
      <template v-for="value in props.itemTooltipSection.values" :key="value">
        <span data-test="value" :class="props.valueClass">
          {{ getItemTooltipSectionValue(value) }}
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { BlackDesertItemTooltipSection } from '@blackdesertmarket/interfaces';
import { VueAttributeClass } from '@/types/attributes-vue';
import { FormatNameFunction, FormatValueFunction } from '@/composables/item-tooltip/use-item-tooltip';
import {
  UseItemTooltipSectionReturn,
  useItemTooltipSection,
} from '@/composables/item-tooltip/use-item-tooltip-section';

const props = defineProps({
  itemTooltipSection: {
    type: Object as PropType<BlackDesertItemTooltipSection>,
    required: true,
  },
  formatName: {
    type: Function as PropType<FormatNameFunction>,
  },
  formatValue: {
    type: Function as PropType<FormatValueFunction>,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
  nameClass: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
  valueClass: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});

const itemTooltipSectionComposable: UseItemTooltipSectionReturn = useItemTooltipSection(props.itemTooltipSection);

const getItemTooltipSectionName = (): string => {
  if (!props.formatName) {
    return itemTooltipSectionComposable.getSectionName();
  }

  return props.formatName(itemTooltipSectionComposable.getSectionName());
};

const getItemTooltipSectionValue = (value: string): string => {
  if (!props.formatValue) {
    return value;
  }

  return props.formatValue(value);
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.inline-name-values {
  @apply inline;

  .section-name {
    @apply inline;
  }

  .section-values {
    @apply mt-0 ml-1 inline;
  }
}

.durability {
  .section-values {
    @apply ml-0;

    & > span {
      @apply rounded border border-dark-700 bg-item-icon-highlight pt-[1px] text-center leading-[6px];
      box-shadow: 0 0 0 1px $DARK_100 inset;
    }
  }
}
</style>
