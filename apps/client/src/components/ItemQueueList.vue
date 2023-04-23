<template>
  <div class="flex h-full max-h-full flex-col">
    <ListFilter @filter="handleListFilter" />
    <div class="flex h-full flex-col gap-2 overflow-y-scroll p-2.5 pt-0">
      <template v-if="search">
        <ListItem v-for="item in itemList" :key="item.id" :item="item" @effect="handleListItemClick(item)" />
      </template>
      <template v-else>
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
            <ItemDetailsModal
              v-if="isValidBlackDesertItemQueue(item)"
              :id="item.id"
              :enhancement="item.enhancement"
              @close="handleListItemClick(item)"
            />
          </Teleport>
        </template>
      </template>
    </div>
  </div>
  <AppLoader v-if="!loaded" :size="LoaderSize.LARGE" overlay />
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { Router, useRouter } from 'vue-router';
import { BlackDesertItem, BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { isValidBlackDesertItemQueue } from '@blackdesertmarket/objects';
import { ListFilterData } from '@/interfaces/list-filter';
import { LoaderSize } from '@/enums/loader';
import { UseItemQueueReturn, useItemQueue } from '@/composables/item-queue/use-item-queue';
import { UseQueueItemListReturn, useItemQueueFetch } from '@/composables/item-queue/use-item-queue-fetch';
import { UseItemReturn, useItem } from '@/composables/item/use-item';
import { UseListFilterReturn, useListFilter } from '@/composables/list-filter/use-list-filter';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';
import ListFilter from '@/components/ListFilter/ListFilter.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const translate = useInject(TranslateKey);
const router: Router = useRouter();
const itemQueueFetch: UseQueueItemListReturn = useItemQueueFetch();

const loaded: Ref<boolean> = ref(false);
const search: Ref<boolean> = ref(false);
const itemList: Ref<BlackDesertItem[] | BlackDesertItemQueue[]> = ref([]);
const activeItem: Ref<BlackDesertItemQueue | null> = ref(null);

const getBasePrice = (item: BlackDesertItem | BlackDesertItemQueue): string => {
  const itemComposable: UseItemReturn = useItem(item);
  return itemComposable.getBasePrice();
};

const getEndTime = (item: BlackDesertItem | BlackDesertItemQueue): string => {
  if (!isValidBlackDesertItemQueue(item)) {
    return '';
  }

  const itemQueueComposable: UseItemQueueReturn = useItemQueue(item);
  return itemQueueComposable.getEndTime();
};

const refetchQueueItemList = (): Promise<void> => {
  return itemQueueFetch.fetch().then((data: BlackDesertItemQueue[]): void => {
    itemList.value = data;
    loaded.value = true;
  });
};

const handleListItemClick = (item: BlackDesertItem | BlackDesertItemQueue): void => {
  if (isValidBlackDesertItemQueue(item)) {
    activeItem.value = activeItem.value !== item ? item : null;
    return;
  }

  router.push({
    name: 'item',
    params: {
      id: item.id,
    },
  });
};

const handleListFilter = async (data: ListFilterData): Promise<void> => {
  const listFilter: UseListFilterReturn = useListFilter(data);

  await listFilter.processItemList({
    itemList: itemList,
    loaded: loaded,
    fallback(): Promise<void> {
      return refetchQueueItemList().then((): void => {
        search.value = false;
      });
    },
    callback(): void {
      search.value = true;
    },
  });
};

if (!itemList.value.length) {
  refetchQueueItemList();
}
</script>
