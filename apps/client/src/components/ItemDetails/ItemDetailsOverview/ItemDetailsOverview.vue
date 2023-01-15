<template>
  <div class="flex h-full flex-col gap-y-5">
    <div class="flex w-full items-stretch gap-3.5">
      <ListItemIcon :src="itemIcon.href" :item="props.itemType" :class="itemGradeBorder" />
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
    <div class="flex h-full gap-x-5">
      <div class="w-1/3">
        <div class="grid h-full grid-cols-2 gap-6">
          <ItemDetailsOverviewProperty
            data-test="in-stock"
            label="In Stock"
            :value="itemDetailsComposable.getSellCount()"
          />
          <ItemDetailsOverviewProperty label="Warehouse Capacity" value="" />
          <ItemDetailsOverviewProperty
            data-test="base-price"
            label="Base Price"
            :value="itemDetailsComposable.getBasePrice()"
          />
          <ItemDetailsOverviewProperty
            data-test="recent-price"
            label="Recent Price"
            :value="itemDetailsComposable.getRecentPrice()"
          />
          <ItemDetailsOverviewProperty
            data-test="total-trades"
            label="Total Trades"
            :value="itemTypeComposable.getTradeCount()"
          />
          <ItemDetailsOverviewProperty
            data-test="recent-transaction"
            label="Recent Transaction"
            :value="itemDetailsComposable.getRecentTransaction()"
          />
        </div>
      </div>
      <div class="w-2/3">
        <ItemDetailsOverviewChart :data="props.itemDetails.history" :days="days" class="-mt-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, Ref, computed, defineProps, ref } from 'vue';
import { BlackDesertItemDetails, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { ComponentException } from '@/exceptions/component-exception';
import { UseItemDetailsReturn, useItemDetails } from '@/composables/item-details/use-item-details';
import { UseItemTypeReturn, useItemType } from '@/composables/item-type/use-item-type';
import { UseConfigReturn, useConfig } from '@/composables/use-config';
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

const config: UseConfigReturn = useConfig();
const itemTypeComposable: UseItemTypeReturn = useItemType(props.itemType);
const itemDetailsComposable: UseItemDetailsReturn = useItemDetails(props.itemDetails);

const itemIcon: Ref<URL> = ref(new URL(`/item/${props.itemType.id}/icon`, config.marketApiUrl));
const itemGradeText: Ref<string> = ref('');
const itemGradeBorder: Ref<string> = ref('');

const months: Ref<number> = ref(1);

const days: ComputedRef<number> = computed((): number => {
  switch (months.value) {
    case 1:
      return 31;
    case 3:
      return 89;
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
</script>
