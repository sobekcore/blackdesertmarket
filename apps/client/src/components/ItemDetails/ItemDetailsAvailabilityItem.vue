<template>
  <li class="flex items-center rounded bg-dark-500 py-1 px-5">
    <span class="w-full text-left text-sm text-dark-800">
      {{ formatSellCount(props.item.sellCount) }}
    </span>
    <span class="w-full text-center">
      {{ formatOnePrice(props.item.onePrice) }}
    </span>
    <span class="w-full text-right text-sm text-dark-800">
      {{ formatBuyCount(props.item.buyCount) }}
    </span>
  </li>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { BlackDesertItemDetailsAvailability } from '@blackdesertmarket/interfaces';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';

const props = defineProps({
  item: {
    type: Object as PropType<BlackDesertItemDetailsAvailability>,
    required: true,
  },
});

const numberFormat: UseNumberFormatReturn = useNumberFormat();

const formatSellCount = (count: number): string => {
  if (count === 0) {
    return '';
  }

  return `Listed: ${count}`;
};

const formatOnePrice = (price: number): string => {
  return numberFormat.format(price);
};

const formatBuyCount = (count: number): string => {
  if (count === 0) {
    return '';
  }

  /**
   * TODO: Format buyCount exactly the same as in the original design
   */
  return `${count}`;
};
</script>
