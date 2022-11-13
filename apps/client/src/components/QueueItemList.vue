<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in list" :key="item.id">
      <ListItem :item="item" @effect="handleListItemClick(item)">
        <template #append>
          <ListItemSeparator />
          <ListItemProperty label="Registered Price" :value="formatRegisteredPrice(item.basePrice)" />
          <ListItemSeparator />
          <ListItemProperty label="Registered Time" :value="formatRegisteredTime(item.endTime)" />
        </template>
      </ListItem>

      <Teleport v-if="activeItem === item" to="#modal">
        <ItemDetailsModal :id="item.id" :enhancement="item.enhancement" @close="handleListItemClick(item)" />
      </Teleport>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { ComputedRef, Ref, ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { UseQueueItemListReturn, useQueueItemList } from '@/composables/use-queue-item-list';
import { useNumberFormat, UseNumberFormatReturn } from '@/composables/use-number-format';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';

const queueItemList: UseQueueItemListReturn = useQueueItemList();
const numberFormat: UseNumberFormatReturn = useNumberFormat();

const list: Ref<BlackDesertItemQueue[]> = ref([]);
const activeItem: Ref<BlackDesertItemQueue | null> = ref(null);

const formatRegisteredPrice = (price: number): string => {
  return numberFormat.format(price);
};

const formatRegisteredTime = (time: number): string => {
  const dateFormat: ComputedRef<string> = useDateFormat(time, 'MM-DD HH:mm');
  return dateFormat.value;
};

const handleListItemClick = (item: BlackDesertItemQueue): void => {
  activeItem.value = activeItem.value !== item ? item : null;
};

if (!list.value.length) {
  queueItemList.fetch().then((data: BlackDesertItemQueue[]): void => {
    list.value = data;
  });
}
</script>
