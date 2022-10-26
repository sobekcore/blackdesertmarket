<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in list" :key="item.id">
      <ListItem :item="item" />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { UseQueueItemListReturn, useQueueItemList } from '@/composables/use-queue-item-list';
import ListItem from '@/components/ListItem/ListItem.vue';

const queueItemList: UseQueueItemListReturn = useQueueItemList();

const list: Ref<BlackDesertItemType[]> = ref([]);

queueItemList.fetch().then((response: BlackDesertItemType[]): void => {
  list.value = response;
});
</script>
