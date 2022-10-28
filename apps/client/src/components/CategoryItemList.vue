<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in list" :key="item.id">
      <ListItem :item="item" />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, defineProps, ref, watch } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
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

const categoryItemList: UseCategoryItemListReturn = useCategoryItemList();

const list: Ref<BlackDesertItem[]> = ref([]);

const refetchCategoryItemList = (mainCategory: number, subCategory: number): void => {
  categoryItemList.fetch(mainCategory, subCategory).then((data: BlackDesertItem[]): void => {
    list.value = data;
  });
};

if (!list.value.length) {
  refetchCategoryItemList(props.mainCategory, props.subCategory);
}

watch(
  (): number[] => {
    return [props.mainCategory, props.subCategory];
  },
  (): void => {
    refetchCategoryItemList(props.mainCategory, props.subCategory);
  },
);
</script>
