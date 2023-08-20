<template>
  <div class="flex h-full max-h-full flex-col">
    <ListFilter ref="listFilter" @filter="handleListFilter">
      <template v-if="!search" #bottom>
        <ListFilterButton @click="handleListFilterButtonClick">
          <ListFilterButtonContent :icon="require('@/assets/images/list-filter/return.png')">
            <span class="pr-2">{{ translate('listFilter.previous') }}</span>
          </ListFilterButtonContent>
        </ListFilterButton>
      </template>
    </ListFilter>
    <div class="flex h-full flex-col gap-2 overflow-y-scroll p-2.5 pt-0">
      <ListItem
        v-if="!search && itemType"
        :item="itemType"
        disabled
        class="bg-gradient-to-b from-brand-600/60 to-brand-300/80"
      >
        <template #append>
          <ListItemSeparator />
          <ListItemProperty :label="translate('itemType.tradeCount')" :value="getTradeCount(itemType)" />
          <ListItemSeparator />
          <ListItemProperty :label="translate('item.count')" :value="itemType.count" />
        </template>
      </ListItem>
      <ListItem v-for="item in itemList" :key="getListItemKey(item)" :item="item" @effect="handleListItemClick(item)" />
    </div>
  </div>
  <AppLoader v-if="!loaded" :size="LoaderSize.LARGE" overlay />
</template>

<script lang="ts" setup>
import { Ref, defineProps, onBeforeUnmount, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from 'vue-router';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { BlackDesertItem, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { isValidBlackDesertItemType } from '@blackdesertmarket/objects';
import { ListFilterData } from '@/interfaces/list-filter';
import { LoaderSize } from '@/enums/loader';
import { useLocationStore } from '@/stores/location';
import { UseItemTypeReturn, useItemType } from '@/composables/item-type/use-item-type';
import { UseItemTypeFetchReturn, useItemTypeFetch } from '@/composables/item-type/use-item-type-fetch';
import { UseListFilterReturn, useListFilter } from '@/composables/list-filter/use-list-filter';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import { ListFilterExposed } from '@/components/ListFilter/ListFilter.d';
import ListFilter from '@/components/ListFilter/ListFilter.vue';
import ListFilterButton from '@/components/ListFilter/ListFilterButton.vue';
import ListFilterButtonContent from '@/components/ListFilter/ListFilterButtonContent.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const translate = useInject(TranslateKey);
const locationStore = useLocationStore();
const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

const loaded: Ref<boolean> = ref(false);
const search: Ref<boolean> = ref(false);
const itemList: Ref<BlackDesertItem[] | BlackDesertItemType[]> = ref([]);
const itemType: Ref<BlackDesertItemType | null> = ref(null);
const listFilter: Ref<ListFilterExposed | null> = ref(null);

const getListItemKey = (item: BlackDesertItem | BlackDesertItemType): string => {
  return isValidBlackDesertItemType(item) ? `${item.id}.${item.enhancement}` : `${item.id}`;
};

const getTradeCount = (itemType: BlackDesertItemType): string => {
  const itemTypeComposable: UseItemTypeReturn = useItemType(itemType);
  return itemTypeComposable.getTradeCount();
};

const refetchItemTypeList = (id: number): Promise<void> => {
  const itemTypeFetch: UseItemTypeFetchReturn = useItemTypeFetch(id);

  return itemTypeFetch.fetch().then((data: BlackDesertItemType[]): void => {
    itemType.value = Object.assign({}, getFirstElement<BlackDesertItemType>(data));

    if (itemType.value) {
      const itemTypeComposable: UseItemTypeReturn = useItemType(itemType.value);
      itemTypeComposable.aggregateItemByList(data);

      locationStore.mainCategory = itemType.value.mainCategory;
      locationStore.subCategory = itemType.value.subCategory;
      locationStore.searchWord = itemType.value.name;
    }

    itemList.value = data;
    loaded.value = true;
  });
};

const redirectItemTypeList = (): void => {
  loaded.value = false;
  refetchItemTypeList(props.id);

  if (listFilter.value) {
    listFilter.value.resetFilterState();
  }
};

const handleListItemClick = (item: BlackDesertItem | BlackDesertItemType): void => {
  if (isValidBlackDesertItemType(item)) {
    router.push({
      name: 'item-details',
      params: {
        id: item.id,
        enhancement: item.enhancement,
      },
    });

    return;
  }

  if (props.id === item.id) {
    redirectItemTypeList();
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
      return refetchItemTypeList(props.id).then((): void => {
        search.value = false;
      });
    },
    callback(): void {
      search.value = true;
    },
  });
};

const handleListFilterButtonClick = (): void => {
  if (!itemType.value) {
    return;
  }

  router.push({
    name: 'list',
    params: {
      mainCategory: itemType.value.mainCategory,
      subCategory: itemType.value.subCategory,
    },
  });
};

if (!itemList.value.length) {
  refetchItemTypeList(props.id);
}

onBeforeUnmount((): void => {
  if (route.name === 'list') {
    return;
  }

  locationStore.mainCategory = null;
  locationStore.subCategory = null;
  locationStore.searchWord = '';
});

watch(
  (): number => {
    return props.id;
  },
  (): void => {
    redirectItemTypeList();
  },
);
</script>
