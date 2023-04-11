<template>
  <div class="flex h-full max-h-full flex-col">
    <ListFilter ref="listFilter" @filter="handleListFilter" />
    <div class="flex h-full flex-col gap-2 overflow-y-scroll p-2.5 pt-0">
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
import { UseItemTypeFetchReturn, useItemTypeFetch } from '@/composables/item-type/use-item-type-fetch';
import { UseListFilterReturn, useListFilter } from '@/composables/list-filter/use-list-filter';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import { ListFilterExposed } from '@/components/ListFilter/ListFilter.d';
import ListFilter from '@/components/ListFilter/ListFilter.vue';
import ListItem from '@/components/ListItem/ListItem.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const locationStore = useLocationStore();
const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

const loaded: Ref<boolean> = ref(false);
const itemList: Ref<BlackDesertItem[] | BlackDesertItemType[]> = ref([]);
const listFilter: Ref<ListFilterExposed | null> = ref(null);

const getListItemKey = (item: BlackDesertItem | BlackDesertItemType): string => {
  return isValidBlackDesertItemType(item) ? `${item.id}.${item.enhancement}` : `${item.id}`;
};

const refetchItemTypeList = (id: number): Promise<void> => {
  const itemTypeFetch: UseItemTypeFetchReturn = useItemTypeFetch(id);

  return itemTypeFetch.fetch().then((data: BlackDesertItemType[]): void => {
    const itemType: BlackDesertItemType | null = getFirstElement<BlackDesertItemType>(data);

    if (itemType) {
      locationStore.mainCategory = itemType.mainCategory;
      locationStore.subCategory = itemType.subCategory;
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
      return refetchItemTypeList(props.id);
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
