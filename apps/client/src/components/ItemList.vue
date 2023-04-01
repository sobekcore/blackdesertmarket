<template>
  <div class="flex h-full max-h-full flex-col">
    <ListFilter @filter="handleListFilter" />
    <div class="flex h-full flex-col gap-2 overflow-y-scroll p-2.5 pt-0">
      <ListItem v-for="item in itemList" :key="item.id" :item="item" @effect="handleListItemClick(item)" />
    </div>
  </div>
  <AppLoader v-if="!loaded" :size="LoaderSize.LARGE" overlay />
</template>

<script lang="ts" setup>
import { Ref, defineProps, onBeforeUnmount, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from 'vue-router';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ListFilterData } from '@/interfaces/list-filter';
import { LoaderSize } from '@/enums/loader';
import { useLocationStore } from '@/stores/location';
import { UseItemSearchFetchReturn, useItemSearchFetch } from '@/composables/item-search/use-item-search-fetch';
import { UseItemFetchReturn, useItemFetch } from '@/composables/item/use-item-fetch';
import { UseListFilterReturn, useListFilter } from '@/composables/list-filter/use-list-filter';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import ListFilter from '@/components/ListFilter/ListFilter.vue';
import ListItem from '@/components/ListItem/ListItem.vue';

const props = defineProps({
  mainCategory: {
    type: Number,
    required: true,
  },
  subCategory: {
    type: Number,
    required: true,
  },
});

const locationStore = useLocationStore();
const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

const loaded: Ref<boolean> = ref(false);
const itemList: Ref<BlackDesertItem[]> = ref([]);

const refetchCategoryItemList = (mainCategory: number, subCategory: number): Promise<void> => {
  locationStore.mainCategory = mainCategory;
  locationStore.subCategory = subCategory;

  const itemFetch: UseItemFetchReturn = useItemFetch(mainCategory, subCategory);

  return itemFetch.fetch().then((data: BlackDesertItem[]): void => {
    itemList.value = data;
    loaded.value = true;
  });
};

const handleListItemClick = (item: BlackDesertItem): void => {
  router.push({
    name: 'item',
    params: {
      id: item.id,
    },
  });
};

const handleListFilter = async (data: ListFilterData): Promise<void> => {
  loaded.value = false;

  if (data.search) {
    const itemSearchFetch: UseItemSearchFetchReturn = useItemSearchFetch(data.search);

    await itemSearchFetch.fetch().then((data: BlackDesertItem[]): void => {
      itemList.value = data;
      loaded.value = true;
    });
  } else {
    await refetchCategoryItemList(props.mainCategory, props.subCategory);
  }

  const listFilter: UseListFilterReturn = useListFilter(data);

  listFilter.sortItemList(itemList.value);
};

if (!itemList.value.length) {
  refetchCategoryItemList(props.mainCategory, props.subCategory);
}

onBeforeUnmount((): void => {
  if (route.name === 'item') {
    return;
  }

  locationStore.mainCategory = null;
  locationStore.subCategory = null;
});

watch(
  (): number[] => {
    return [props.mainCategory, props.subCategory];
  },
  (): void => {
    loaded.value = false;
    refetchCategoryItemList(props.mainCategory, props.subCategory);
  },
);
</script>
