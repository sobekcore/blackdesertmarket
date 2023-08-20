<template>
  <div class="flex h-full flex-col gap-y-5">
    <div class="flex flex-col-reverse gap-3.5 sm:flex-row">
      <div class="flex w-full gap-3.5 overflow-hidden">
        <ListItemIcon :src="itemIcon" :item="props.itemType" :class="itemGradeBorder" />
        <ListItemName :name="itemType.name" :class="itemGradeText" />
      </div>
      <div class="flex gap-3.5">
        <ItemDetailsOverviewButton
          data-test="one-month"
          :label="`1 ${translate('date.month')}`"
          :active="months === 1"
          @click="handleButtonClick(1)"
        />
        <ItemDetailsOverviewButton
          data-test="three-months"
          :label="`3 ${translate('date.months')}`"
          :active="months === 3"
          @click="handleButtonClick(3)"
        />
      </div>
    </div>
    <div class="flex flex-grow flex-col gap-5 pb-5 xl:flex-row">
      <div class="xl:w-1/3">
        <div class="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
          <ItemDetailsOverviewProperty
            data-test="in-stock"
            :label="translate('item.count')"
            :value="itemDetailsComposable.getSellCount()"
          />
          <ItemDetailsOverviewProperty :label="translate('generic.warehouseCapacity')" value="" />
          <ItemDetailsOverviewProperty
            data-test="base-price"
            :label="translate('item.basePrice')"
            :value="itemDetailsComposable.getBasePrice()"
          />
          <ItemDetailsOverviewProperty
            data-test="recent-price"
            :label="translate('itemDetails.recentPrice')"
            :value="itemDetailsComposable.getRecentPrice()"
          />
          <ItemDetailsOverviewProperty
            data-test="total-trades"
            :label="translate('itemType.tradeCount')"
            :value="itemTypeComposable.getTradeCount()"
          />
          <ItemDetailsOverviewProperty
            data-test="recent-transaction"
            :label="translate('itemDetails.recentTransaction')"
            :value="itemDetailsComposable.getRecentTransaction()"
          />
        </div>
      </div>
      <div class="h-full min-h-[300px] xl:w-2/3">
        <ItemDetailsOverviewChart :data="props.itemDetails.history" :days="days" class="xl:-mt-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, Ref, computed, defineProps, ref } from 'vue';
import { BlackDesertItemDetails, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { ComponentException } from '@/exceptions/component-exception';
import { ItemDetailsDays } from '@/enums/item-details';
import { UseItemDetailsReturn, useItemDetails } from '@/composables/item-details/use-item-details';
import { UseItemTypeReturn, useItemType } from '@/composables/item-type/use-item-type';
import { UseItemIconFetchReturn, useItemIconFetch } from '@/composables/item/use-item-icon-fetch';
import { TranslateKey, useInject } from '@/composables/use-inject';
import ItemDetailsOverviewButton from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewButton.vue';
import ItemDetailsOverviewChart from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewChart.vue';
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

const translate = useInject(TranslateKey);
const itemTypeComposable: UseItemTypeReturn = useItemType(props.itemType);
const itemDetailsComposable: UseItemDetailsReturn = useItemDetails(props.itemDetails);
const itemIconFetch: UseItemIconFetchReturn = useItemIconFetch(props.itemType.id);

const itemGradeText: Ref<string> = ref('');
const itemGradeBorder: Ref<string> = ref('');
const itemIcon: Ref<string> = ref('');

const months: Ref<number> = ref(1);

const days: ComputedRef<number> = computed((): ItemDetailsDays => {
  switch (months.value) {
    case 1:
      return ItemDetailsDays.ONE_MONTH;
    case 3:
      return ItemDetailsDays.THREE_MONTHS;
  }

  throw new ComponentException(`Could not compute days number for ${months.value} months`);
});

const handleButtonClick = (month: number): void => {
  months.value = month;
};

if (props.itemType.grade) {
  itemGradeText.value = `text:item-grade-${props.itemType.grade}`;
  itemGradeBorder.value = `border:item-grade-${props.itemType.grade}`;
}

if (!itemIcon.value) {
  itemIconFetch.fetch().then((icon: string): void => {
    itemIcon.value = icon;
  });
}
</script>
