<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in list" :key="item.id">
      <ListItem :item="item" />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, defineProps, onBeforeUnmount, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
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
const route: RouteLocationNormalizedLoaded = useRoute();

const list: Ref<BlackDesertItemType[]> = ref([]);

const refetchItemTypeList = (id: number): void => {
  const itemTypeList: UseItemTypeListReturn = useItemList(id);

  itemTypeList.fetch().then((data: BlackDesertItemType[]): void => {
    if (data.length) {
      /**
       * TODO: Find categories from BlackDesertItemType collection in a cleaner way
       */
      locationStore.mainCategory = data[0].mainCategory;
      locationStore.subCategory = data[0].subCategory;
    }

    list.value = data;
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
