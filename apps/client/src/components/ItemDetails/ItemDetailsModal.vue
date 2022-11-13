<template>
  <AppModal title="Purchase" :fullsize="true" @close="triggerItemDetailsModalClose">
    <div class="flex w-2/3 flex-col">
      <div class="relative h-1/2 overflow-y-auto bg-dark-200 bg-opacity-90 p-5">
        <template v-if="itemType && itemDetails">
          <ItemDetails :item-type="itemType" :item-details="itemDetails" />
        </template>
        <template v-else>
          <AppLoader />
        </template>
      </div>
      <div class="item-details-additional">
        <AppComingSoon />
      </div>
    </div>
    <div class="relative w-1/3 overflow-y-auto border-l border-l-dark-600 bg-dark-100 bg-opacity-90">
      <template v-if="itemDetails">
        <ItemDetailsAvailability :availability="itemDetails.availability" />
      </template>
      <template v-else>
        <AppLoader />
      </template>
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import { Ref, defineEmits, defineProps, ref } from 'vue';
import { BlackDesertItemDetails, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { UseItemTypeListReturn, useItemList } from '@/composables/use-item-list';
import { UseItemDetailsReturn, useItemDetails } from '@/composables/use-item-details';
import AppModal from '@/components/base/AppModal/AppModal.vue';
import AppLoader from '@/components/base/AppLoader.vue';
import AppComingSoon from '@/components/base/AppComingSoon.vue';
import ItemDetails from '@/components/ItemDetails/ItemDetails.vue';
import ItemDetailsAvailability from '@/components/ItemDetails/ItemDetailsAvailability.vue';

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

const itemType: Ref<BlackDesertItemType | null> = ref(null);
const itemDetails: Ref<BlackDesertItemDetails | null> = ref(null);

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

.item-details-additional {
  @apply relative h-1/2 overflow-y-auto border-t border-t-dark-700 p-5;
  background: url('@/assets/images/other/modal-noise.png'), $DARK_300;
}
</style>
