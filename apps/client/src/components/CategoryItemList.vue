<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in itemList" :key="item.id">
      <ListItem :item="item" @effect="handleListItemClick(item)" />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, defineProps, onBeforeUnmount, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from 'vue-router';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { useLocationStore } from '@/stores/location';
import { UseCategoryItemListReturn, useCategoryItemList } from '@/composables/use-category-item-list';
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

const itemList: Ref<BlackDesertItem[]> = ref([]);

const refetchCategoryItemList = (mainCategory: number, subCategory: number): void => {
  locationStore.mainCategory = mainCategory;
  locationStore.subCategory = subCategory;

  const categoryItemList: UseCategoryItemListReturn = useCategoryItemList(mainCategory, subCategory);

  categoryItemList.fetch().then((data: BlackDesertItem[]): void => {
    itemList.value = data;
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
    refetchCategoryItemList(props.mainCategory, props.subCategory);
  },
);
</script>
