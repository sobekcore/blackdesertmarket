<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in list" :key="item.id">
      <ListItem :item="item" @effect="handleListItemClick(item)" />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, defineProps, onBeforeUnmount, ref, watch } from 'vue';
import { Router, RouteLocationNormalizedLoaded, useRouter, useRoute } from 'vue-router';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { useLocationStore } from '@/stores/location';
import { UseItemTypeListReturn, useItemList } from '@/composables/use-item-list';
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

const list: Ref<BlackDesertItemType[]> = ref([]);

const refetchItemTypeList = (id: number): void => {
  const itemTypeList: UseItemTypeListReturn = useItemList(id);

  itemTypeList.fetch().then((data: BlackDesertItemType[]): void => {
    const itemType: BlackDesertItemType | null = getFirstElement<BlackDesertItemType>(data);

    if (itemType) {
      locationStore.mainCategory = itemType.mainCategory;
      locationStore.subCategory = itemType.subCategory;
    }

    list.value = data;
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

if (!list.value.length) {
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
    refetchItemTypeList(props.id);
  },
);
</script>
