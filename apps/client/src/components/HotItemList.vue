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
import { UseHotItemListReturn, useHotItemList } from '@/composables/use-hot-item-list';
import ListItem from '@/components/ListItem/ListItem.vue';

const hotItemList: UseHotItemListReturn = useHotItemList();

const list: Ref<BlackDesertItemType[]> = ref([]);

hotItemList.fetch().then((data: BlackDesertItemType[]): void => {
  list.value = data;
});
</script>
