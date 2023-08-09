<template>
  <div class="flex xl:hidden">
    <ItemDetailsTab :id="0" v-model="activeTab" :label="translate('itemDetails.detailsTab')" />
    <ItemDetailsTab :id="1" v-model="activeTab" :label="translate('itemDetails.additionalTab')" />
    <ItemDetailsTab :id="2" v-model="activeTab" :label="translate('itemDetails.availabilityTab')" />
  </div>
  <div
    :class="{
      'flex flex-col overflow-y-auto xl:w-2/3': true,
      'h-full': activeTab !== 2,
    }"
  >
    <div
      :class="{
        'item-details': true,
        'hidden xl:block': activeTab !== 0,
      }"
    >
      <ItemDetailsOverview v-if="itemType && itemDetails" :item-type="itemType" :item-details="itemDetails" />
      <AppLoader v-else :size="LoaderSize.LARGE" />
    </div>
    <div
      :class="{
        'item-details-additional': true,
        'hidden xl:block': activeTab !== 1,
      }"
    >
      <ItemDetailsAdditional />
    </div>
  </div>
  <div
    :class="{
      'item-details-availability': true,
      'hidden xl:block': activeTab !== 2,
    }"
  >
    <ItemDetailsAvailability v-if="itemDetails">
      <ItemDetailsAvailabilityItem
        v-for="item in itemDetails.availability"
        :key="item.onePrice"
        :class="getItemAvailabilityBackgroundClass(itemDetails, item)"
      >
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
    </ItemDetailsAvailability>
    <AppLoader v-else :size="LoaderSize.LARGE" />
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
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import ItemDetailsAdditional from '@/components/ItemDetails/ItemDetailsAdditional.vue';
import ItemDetailsAvailability from '@/components/ItemDetails/ItemDetailsAvailability.vue';
import ItemDetailsAvailabilityItem from '@/components/ItemDetails/ItemDetailsAvailabilityItem.vue';
import ItemDetailsOverview from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverview.vue';
import ItemDetailsTab from '@/components/ItemDetails/ItemDetailsTab.vue';

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

const translate = useInject(TranslateKey);
const itemListFetch: UseItemTypeFetchReturn = useItemTypeFetch(props.id);
const itemDetailsFetch: UseItemDetailsFetchReturn = useItemDetailsFetch(props.id, props.enhancement, true);

const itemType: Ref<BlackDesertItemType | null> = ref(null);
const itemDetails: Ref<BlackDesertItemDetails | null> = ref(null);
const activeTab: Ref<number> = ref(0);

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
  itemListFetch.fetchByEnhancement(props.enhancement).then((data: BlackDesertItemType | null): void => {
    itemType.value = data;
  });
}

if (!itemDetails.value) {
  itemDetailsFetch.fetch().then((data: BlackDesertItemDetails | null): void => {
    itemDetails.value = data;
  });
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.item-details {
  @apply relative h-full w-full overflow-x-hidden bg-dark-200 bg-opacity-90 p-5 xl:h-1/2 xl:overflow-y-auto;
}

.item-details-additional {
  @apply relative h-full overflow-y-auto border-t-dark-700 p-5 xl:h-1/2 xl:border-t;
  background: url('@/assets/images/modal/modal-noise.png'), $DARK_300;
}

.item-details-availability {
  @apply relative w-full overflow-y-auto border-l-dark-600 bg-dark-100 bg-opacity-90 xl:w-1/3 xl:border-l;
}
</style>
