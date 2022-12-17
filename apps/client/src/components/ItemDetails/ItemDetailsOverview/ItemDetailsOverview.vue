<template>
  <div class="flex flex-col gap-y-5">
    <div class="flex w-full items-stretch gap-3.5">
      <ListItemIcon :src="itemIcon.href" :class="itemGradeBorder" />
      <ListItemName :name="itemType.name" :class="itemGradeText" />
      <ItemDetailsOverviewButton
        data-test="1-month"
        label="1 Month"
        :active="months === 1"
        @click="handleButtonClick(1)"
      />
      <ItemDetailsOverviewButton
        data-test="3-months"
        label="3 Months"
        :active="months === 3"
        @click="handleButtonClick(3)"
      />
    </div>
    <div class="flex gap-x-5">
      <div class="w-1/2">
        <div class="grid grid-cols-2 gap-6">
          <ItemDetailsOverviewProperty
            data-test="in-stock"
            label="In Stock"
            :value="formatSellCount(props.itemDetails.sellCount)"
          />
          <ItemDetailsOverviewProperty label="Warehouse Capacity" value="" />
          <ItemDetailsOverviewProperty
            data-test="base-price"
            label="Base Price"
            :value="formatBasePrice(props.itemDetails.basePrice)"
          />
          <ItemDetailsOverviewProperty
            data-test="recent-price"
            label="Recent Price"
            :value="formatRecentPrice(props.itemDetails)"
          />
          <ItemDetailsOverviewProperty
            data-test="total-trades"
            label="Total Trades"
            :value="formatTradeCount(props.itemType.tradeCount)"
          />
          <ItemDetailsOverviewProperty
            data-test="recent-transaction"
            label="Recent Transaction"
            :value="formatRecentTransaction(props.itemDetails)"
          />
        </div>
      </div>
      <div class="w-1/2">
        <div class="h-full w-full bg-dark-100 bg-opacity-50">
          <div class="flex h-full w-full items-center justify-center">
            <span v-if="months === 1">{{ months }}</span>
            <span v-if="months === 3">{{ months }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, Ref, defineProps, ref } from 'vue';
import {
  BlackDesertItemDetails,
  BlackDesertItemDetailsExtended,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { UseDateFormatReturn, useDateFormat } from '@vueuse/core';
import { UseConfigReturn, useConfig } from '@/composables/use-config';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import ItemDetailsOverviewButton from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewButton.vue';
import ItemDetailsOverviewProperty from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewProperty.vue';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';

const props = defineProps({
  itemType: {
    type: Object as PropType<BlackDesertItemType>,
    required: true,
  },
  itemDetails: {
    type: Object as PropType<BlackDesertItemDetails>,
    required: true,
  },
});

const config: UseConfigReturn = useConfig();
const numberFormat: UseNumberFormatReturn = useNumberFormat();

const months: Ref<number> = ref(1);

const itemIcon: Ref<URL> = ref(new URL(`/item/${props.itemType.id}/icon`, config.marketApiUrl));
const itemGradeText: Ref<string> = ref('');
const itemGradeBorder: Ref<string> = ref('');

const handleButtonClick = (month: number): void => {
  months.value = month;
};

const formatSellCount = (count: number): string => {
  return `${count}`;
};

const formatBasePrice = (price: number): string => {
  return numberFormat.format(price);
};

const formatRecentPrice = (itemDetails: BlackDesertItemDetails): string => {
  const itemDetailsExtended = itemDetails as BlackDesertItemDetailsExtended;

  if (!itemDetailsExtended.recentPrice) {
    return '';
  }

  return numberFormat.format(itemDetailsExtended.recentPrice);
};

const formatTradeCount = (count: number): string => {
  return numberFormat.format(count);
};

const formatRecentTransaction = (itemDetails: BlackDesertItemDetails): string => {
  const itemDetailsExtended = itemDetails as BlackDesertItemDetailsExtended;

  if (!itemDetailsExtended.recentTransaction) {
    return '';
  }

  const timeInMilliseconds: number = itemDetailsExtended.recentTransaction * 1000;
  const dateFormat: UseDateFormatReturn = useDateFormat(timeInMilliseconds, 'MM-DD HH:mm');

  return dateFormat.value;
};

if (props.itemType.grade) {
  itemGradeText.value = `text:item-grade-${props.itemType.grade}`;
  itemGradeBorder.value = `border:item-grade-${props.itemType.grade}`;
}
</script>
