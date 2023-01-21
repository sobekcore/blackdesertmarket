<template>
  <div class="flex w-2/3 flex-col">
    <div class="item-details">
      <template v-if="itemType && itemDetails">
        <ItemDetailsOverview :item-type="itemType" :item-details="itemDetails" />
      </template>
      <template v-else>
        <AppLoader :size="LoaderSize.LARGE" />
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
              {{ getSellCount(itemDetails, item) }}
            </span>
            <span :class="getItemAvailabilityTextClass(itemDetails, item)" class="w-full text-center">
              {{ getOnePrice(itemDetails, item) }}
            </span>
            <span class="w-full text-right text-sm text-dark-800">
              {{ getBuyCount(itemDetails, item) }}
            </span>
          </ItemDetailsAvailabilityItem>
        </template>
      </ItemDetailsAvailability>
    </template>
    <template v-else>
      <AppLoader :size="LoaderSize.LARGE" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Ref, defineProps, ref } from 'vue';
import {
  BlackDesertItemDetails,
  BlackDesertItemDetailsAvailability,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { LoaderSize } from '@/enums/loader';
import { UseItemAvailabilityReturn, useItemAvailability } from '@/composables/item-details/use-item-availability';
import { UseItemDetailsFetchReturn, useItemDetailsFetch } from '@/composables/item-details/use-item-details-fetch';
import { UseItemTypeFetchReturn, useItemTypeFetch } from '@/composables/item-type/use-item-type-fetch';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import ItemDetailsAdditional from '@/components/ItemDetails/ItemDetailsAdditional.vue';
import ItemDetailsAvailability from '@/components/ItemDetails/ItemDetailsAvailability.vue';
import ItemDetailsAvailabilityItem from '@/components/ItemDetails/ItemDetailsAvailabilityItem.vue';
import ItemDetailsOverview from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverview.vue';

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

const itemListComposable: UseItemTypeFetchReturn = useItemTypeFetch(props.id);
const itemDetailsComposable: UseItemDetailsFetchReturn = useItemDetailsFetch(props.id, props.enhancement, true);

const itemType: Ref<BlackDesertItemType | null> = ref(null);
const itemDetails: Ref<BlackDesertItemDetails | null> = ref(null);

const getOnePrice = (
  itemDetails: BlackDesertItemDetails,
  itemAvailability: BlackDesertItemDetailsAvailability,
): string => {
  const itemAvailabilityComposable: UseItemAvailabilityReturn = useItemAvailability(itemDetails, itemAvailability);
  return itemAvailabilityComposable.getOnePrice();
};

const getSellCount = (
  itemDetails: BlackDesertItemDetails,
  itemAvailability: BlackDesertItemDetailsAvailability,
): string => {
  const itemAvailabilityComposable: UseItemAvailabilityReturn = useItemAvailability(itemDetails, itemAvailability);
  return itemAvailabilityComposable.getSellCount();
};

const getBuyCount = (
  itemDetails: BlackDesertItemDetails,
  itemAvailability: BlackDesertItemDetailsAvailability,
): string => {
  const itemAvailabilityComposable: UseItemAvailabilityReturn = useItemAvailability(itemDetails, itemAvailability);
  return itemAvailabilityComposable.getBuyCount();
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

if (!itemType.value) {
  itemListComposable.fetchByEnhancement(props.enhancement).then((data: BlackDesertItemType | null): void => {
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
@import '@/styles/variables.scss';

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
