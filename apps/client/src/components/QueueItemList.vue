<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in list" :key="item.id">
      <ListItem :item="item">
        <template #append>
          <ListItemSeparator />
          <ListItemProperty label="Registered Price" :value="formatRegisteredPrice(item.basePrice)" />
          <ListItemSeparator />
          <ListItemProperty label="Registered Time" :value="formatRegisteredTime(item.endTime)" />
        </template>
      </ListItem>
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

const queueItemList: UseQueueItemListReturn = useQueueItemList();
const numberFormat: UseNumberFormatReturn = useNumberFormat();

const list: Ref<BlackDesertItemQueue[]> = ref([]);

const formatRegisteredPrice = (price: number): string => {
  return numberFormat.format(price);
};

const formatRegisteredTime = (time: number): string => {
  const dateFormat: ComputedRef<string> = useDateFormat(time, 'MM-DD HH:mm');
  return dateFormat.value;
};

queueItemList.fetch().then((data: BlackDesertItemQueue[]): void => {
  list.value = data;
});
</script>
