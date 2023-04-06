<template>
  <div class="flex h-full max-h-full flex-col">
    <ListFilter @filter="handleListFilter" />
    <div v-if="search" class="flex h-full flex-col gap-2 overflow-y-scroll p-2.5 pt-0">
      <ListItem v-for="item in itemList" :key="item.id" :item="item" @effect="handleListItemClick(item)" />
    </div>
    <RecycleScroller v-else class="p-2.5 pt-0" :items="itemList" skip-hover>
      <template #default="{ item }">
        <ListItem
          :key="item.id"
          v-memo="[item.id]"
          :item="item"
          :class="getFluctuationTypeClass(item)"
          @effect="handleListItemClick(item)"
        >
          <template #append>
            <ListItemSeparator />
            <ListItemProperty>
              <template #label>
                <span>{{ translate('item.basePrice') }}</span>
                <span class="flex-grow" />
                <span>({{ getFluctuationPrice(item) }})</span>
              </template>
              <template #value>
                <AppIcon :src="getFluctuationTypeIcon(item)" class="h-[20px] drop-shadow" />
                <span class="flex-grow" />
                <span>{{ getBasePrice(item) }}</span>
              </template>
            </ListItemProperty>
            <ListItemSeparator />
            <ListItemProperty :label="translate('item.count')" :value="item.count" />
          </template>
        </ListItem>

        <Teleport v-if="activeItem === item" to="#modal">
          <ItemDetailsModal
            v-if="isValidBlackDesertItemHot(item)"
            :id="item.id"
            :enhancement="item.enhancement"
            @close="handleListItemClick(item)"
          />
        </Teleport>
      </template>
    </RecycleScroller>
  </div>
  <AppLoader v-if="!loaded" :size="LoaderSize.LARGE" overlay />
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { Router, useRouter } from 'vue-router';
import { RecycleScroller } from 'vue-virtual-scroller';
import { BlackDesertItem, BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { isValidBlackDesertItemHot } from '@blackdesertmarket/objects';
import { ListFilterData } from '@/interfaces/list-filter';
import { ItemSize } from '@/enums/item-size';
import { LoaderSize } from '@/enums/loader';
import { UseFluctuationTypeReturn, useFluctuationType } from '@/composables/item-hot/use-fluctuation-type';
import { UseItemHotReturn, useItemHot } from '@/composables/item-hot/use-item-hot';
import { UseItemHotFetchReturn, useItemHotFetch } from '@/composables/item-hot/use-item-hot-fetch';
import { UseItemReturn, useItem } from '@/composables/item/use-item';
import { UseListFilterReturn, useListFilter } from '@/composables/list-filter/use-list-filter';
import { UseDocumentSizeReturn, useDocumentSize } from '@/composables/use-document-size';
import { TranslateKey, useInject } from '@/composables/use-inject';
import { UseTailwindConfigReturn, useTailwindConfig } from '@/composables/use-tailwind-config';
import { UseVirtualScrollReturn, useVirtualScroll } from '@/composables/use-virtual-scroll';
import AppIcon from '@/components/Base/AppIcon.vue';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';
import ListFilter from '@/components/ListFilter/ListFilter.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const translate = useInject(TranslateKey);
const router: Router = useRouter();
const tailwindConfig: UseTailwindConfigReturn = useTailwindConfig();
const documentSize: UseDocumentSizeReturn = useDocumentSize();
const itemHotFetch: UseItemHotFetchReturn = useItemHotFetch();

const loaded: Ref<boolean> = ref(false);
const search: Ref<boolean> = ref(false);
const itemList: Ref<BlackDesertItem[] | BlackDesertItemHot[]> = ref([]);
const activeItem: Ref<BlackDesertItemHot | null> = ref(null);

const getBasePrice = (item: BlackDesertItem | BlackDesertItemHot): string => {
  const itemComposable: UseItemReturn = useItem(item);
  return itemComposable.getBasePrice();
};

const getFluctuationPrice = (item: BlackDesertItem | BlackDesertItemHot): string => {
  if (!isValidBlackDesertItemHot(item)) {
    return '';
  }

  const itemHotComposable: UseItemHotReturn = useItemHot(item);
  return itemHotComposable.getFluctuationPrice();
};

const getFluctuationTypeClass = (item: BlackDesertItem | BlackDesertItemHot): string => {
  if (!isValidBlackDesertItemHot(item)) {
    return '';
  }

  const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(item.fluctuationType);
  return fluctuationType.getBackgroundClass();
};

const getFluctuationTypeIcon = (item: BlackDesertItem | BlackDesertItemHot): string => {
  if (!isValidBlackDesertItemHot(item)) {
    return '';
  }

  const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(item.fluctuationType);
  return fluctuationType.getIcon();
};

const prepareHotItemList = (data: BlackDesertItemHot[]) => {
  const virtualScroll: UseVirtualScrollReturn = useVirtualScroll();
  const gap: number = documentSize.remToRaw(tailwindConfig.getValue('gap', '2'));

  itemList.value = virtualScroll.prepareData<BlackDesertItem>(data, ItemSize.HEIGHT, gap);
};

const refetchHotItemList = (): Promise<void> => {
  return itemHotFetch.fetch().then((data: BlackDesertItemHot[]): void => {
    prepareHotItemList(data);
    loaded.value = true;
  });
};

const handleListItemClick = (item: BlackDesertItem | BlackDesertItemHot): void => {
  if (isValidBlackDesertItemHot(item)) {
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
      return refetchHotItemList().then((): void => {
        search.value = false;
      });
    },
    callback(): void {
      search.value = true;
    },
  });
};

if (!itemList.value.length) {
  refetchHotItemList();
}
</script>
