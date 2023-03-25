<template>
  <div class="flex flex-col gap-2 p-2.5">
    <template v-for="item in itemList" :key="item.id">
      <ListItem :item="item" @effect="handleListItemClick(item)">
        <template #append>
          <ListItemSeparator />
          <ListItemProperty :label="translate('itemQueue.basePrice')" :value="getBasePrice(item)" />
          <ListItemSeparator />
          <ListItemProperty :label="translate('itemQueue.endTime')" :value="getEndTime(item)" />
        </template>
      </ListItem>

      <Teleport v-if="activeItem === item" to="#modal">
        <ItemDetailsModal :id="item.id" :enhancement="item.enhancement" @close="handleListItemClick(item)" />
      </Teleport>
    </template>
  </div>
  <AppLoader v-if="!loaded" :size="LoaderSize.LARGE" overlay />
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { LoaderSize } from '@/enums/loader';
import { UseItemQueueReturn, useItemQueue } from '@/composables/item-queue/use-item-queue';
import { UseQueueItemListReturn, useItemQueueFetch } from '@/composables/item-queue/use-item-queue-fetch';
import { UseItemReturn, useItem } from '@/composables/item/use-item';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const translate = useInject(TranslateKey);
const itemQueueFetch: UseQueueItemListReturn = useItemQueueFetch();

const loaded: Ref<boolean> = ref(false);
const itemList: Ref<BlackDesertItemQueue[]> = ref([]);
const activeItem: Ref<BlackDesertItemQueue | null> = ref(null);

const getBasePrice = (itemQueue: BlackDesertItemQueue): string => {
  const itemComposable: UseItemReturn = useItem(itemQueue);
  return itemComposable.getBasePrice();
};

const getEndTime = (itemQueue: BlackDesertItemQueue): string => {
  const itemQueueComposable: UseItemQueueReturn = useItemQueue(itemQueue);
  return itemQueueComposable.getEndTime();
};

const handleListItemClick = (itemQueue: BlackDesertItemQueue): void => {
  activeItem.value = activeItem.value !== itemQueue ? itemQueue : null;
};

if (!itemList.value.length) {
  itemQueueFetch.fetch().then((data: BlackDesertItemQueue[]): void => {
    itemList.value = data;
    loaded.value = true;
  });
}
</script>
