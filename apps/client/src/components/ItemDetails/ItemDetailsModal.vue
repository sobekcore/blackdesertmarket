<template>
  <AppModal title="Purchase" :fullsize="true" @close="triggerItemDetailsModalClose">
    <div class="flex w-2/3 flex-col">
      <div class="item-details">
        <template v-if="itemType && itemDetails">
          <ItemDetails :item-type="itemType" :item-details="itemDetails" />
        </template>
        <template v-else>
          <AppLoader />
        </template>
      </div>
      <div class="item-details-additional">
        <ItemDetailsAdditional />
      </div>
    </div>
    <div class="item-details-availability">
      <template v-if="itemDetails">
        <ItemDetailsAvailability>
          <template v-for="item in itemDetails.availability" :key="item.onePrice">
            <ItemDetailsAvailabilityItem :class="getItemAvailabilityBackgroundClass(itemDetails, item)">
              <span class="w-full text-left text-sm text-dark-800">
                {{ formatSellCount(item.sellCount) }}
              </span>
              <span :class="getItemAvailabilityTextClass(itemDetails, item)" class="w-full text-center">
                {{ formatOnePrice(item.onePrice) }}
              </span>
              <span class="w-full text-right text-sm text-dark-800">
                {{ formatBuyCount(item.buyCount) }}
              </span>
            </ItemDetailsAvailabilityItem>
          </template>
        </ItemDetailsAvailability>
      </template>
      <template v-else>
        <AppLoader />
      </template>
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import { Ref, defineEmits, defineProps, ref } from 'vue';
import {
  BlackDesertItemDetails,
  BlackDesertItemDetailsAvailability,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { UseItemAvailabilityReturn, useItemAvailability } from '@/composables/use-item-availability';
import { UseItemDetailsReturn, useItemDetails } from '@/composables/use-item-details';
import { UseItemTypeListReturn, useItemList } from '@/composables/use-item-list';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import AppLoader from '@/components/Base/AppLoader.vue';
import AppModal from '@/components/Base/AppModal/AppModal.vue';
import ItemDetails from '@/components/ItemDetails/ItemDetails.vue';
import ItemDetailsAdditional from '@/components/ItemDetails/ItemDetailsAdditional.vue';
import ItemDetailsAvailability from '@/components/ItemDetails/ItemDetailsAvailability.vue';
import ItemDetailsAvailabilityItem from '@/components/ItemDetails/ItemDetailsAvailabilityItem.vue';

const emit = defineEmits({
  close: null,
});

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  enhancement: {
    type: Number,
    required: true,
  },
});

const itemListComposable: UseItemTypeListReturn = useItemList(props.id);
const itemDetailsComposable: UseItemDetailsReturn = useItemDetails(props.id, props.enhancement);
const numberFormat: UseNumberFormatReturn = useNumberFormat();

const itemType: Ref<BlackDesertItemType | null> = ref(null);
const itemDetails: Ref<BlackDesertItemDetails | null> = ref(null);

const formatOnePrice = (price: number): string => {
  return numberFormat.format(price);
};

const formatSellCount = (count: number): string => {
  if (count === 0) {
    return '';
  }

  return `Listed: ${count}`;
};

const formatBuyCount = (count: number): string => {
  if (count === 0) {
    return '';
  }

  return `Orders: ${count}`;
};

const getItemAvailabilityBackgroundClass = (
  itemDetails: BlackDesertItemDetails,
  itemAvailability: BlackDesertItemDetailsAvailability,
): string => {
  const itemAvailabilityComposable: UseItemAvailabilityReturn = useItemAvailability(itemDetails, itemAvailability);
  return itemAvailabilityComposable.getBackgroundClass();
};

const getItemAvailabilityTextClass = (
  itemDetails: BlackDesertItemDetails,
  itemAvailability: BlackDesertItemDetailsAvailability,
): string => {
  const itemAvailabilityComposable: UseItemAvailabilityReturn = useItemAvailability(itemDetails, itemAvailability);
  return itemAvailabilityComposable.getTextClass();
};

const triggerItemDetailsModalClose = (): void => {
  emit('close');
};

if (!itemType.value) {
  itemListComposable.fetchBaseType().then((data: BlackDesertItemType | null): void => {
    itemType.value = data;
  });
}

if (!itemDetails.value) {
  itemDetailsComposable.fetch().then((data: BlackDesertItemDetails | null): void => {
    itemDetails.value = data;
  });
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.item-details {
  @apply relative h-1/2 overflow-y-auto bg-dark-200 bg-opacity-90 p-5;
}

.item-details-additional {
  @apply relative h-1/2 overflow-y-auto border-t border-t-dark-700 p-5;
  background: url('@/assets/images/other/modal-noise.png'), $DARK_300;
}

.item-details-availability {
  @apply relative w-1/3 overflow-y-auto border-l border-l-dark-600 bg-dark-100 bg-opacity-90;
}
</style>
