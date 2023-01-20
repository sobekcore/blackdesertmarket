<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in itemList" :key="item.id">
      <ListItem :item="item" @effect="handleListItemClick(item)" />
    </template>
  </ul>
  <template v-if="!loaded">
    <AppLoader :size="LoaderSize.LARGE" overlay />
  </template>
</template>

<script lang="ts" setup>
import { Ref, defineProps, onBeforeUnmount, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from 'vue-router';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { LoaderSize } from '@/enums/loader';
import { useLocationStore } from '@/stores/location';
import { UseItemTypeFetchReturn, useItemTypeFetch } from '@/composables/item-type/use-item-type-fetch';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
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
const itemList: Ref<BlackDesertItemType[]> = ref([]);

const refetchItemTypeList = (id: number): void => {
  const itemTypeFetch: UseItemTypeFetchReturn = useItemTypeFetch(id);

  itemTypeFetch.fetch().then((data: BlackDesertItemType[]): void => {
    const itemType: BlackDesertItemType | null = getFirstElement<BlackDesertItemType>(data);

    if (itemType) {
      locationStore.mainCategory = itemType.mainCategory;
      locationStore.subCategory = itemType.subCategory;
    }

    itemList.value = data;
    loaded.value = true;
  });
};

const handleListItemClick = (itemType: BlackDesertItemType): void => {
  router.push({
    name: 'item-details',
    params: {
      id: itemType.id,
      enhancement: itemType.enhancement,
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
    loaded.value = false;
    refetchItemTypeList(props.id);
  },
);
</script>
