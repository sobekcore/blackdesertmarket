<template>
  <div v-if="itemType">
    {{ itemType.name }}
  </div>
</template>

<script lang="ts" setup>
import { Ref, defineProps, ref } from 'vue';
import { BlackDesertItemType, BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { UseItemTypeListReturn, useItemList } from '@/composables/use-item-list';
import { UseItemDetailsReturn, useItemDetails } from '@/composables/use-item-details';

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

const itemList: UseItemTypeListReturn = useItemList(props.id);
const itemDetails: UseItemDetailsReturn = useItemDetails(props.id, props.enhancement);

const itemType: Ref<BlackDesertItemType | null> = ref(null);
const details: Ref<BlackDesertItemDetails | null> = ref(null);

if (!itemType.value) {
  itemList.fetchBaseType().then((data: BlackDesertItemType | null): void => {
    itemType.value = data;
  });
}

if (!details.value) {
  itemDetails.fetch().then((data: BlackDesertItemDetails | null): void => {
    details.value = data;
  });
}
</script>
