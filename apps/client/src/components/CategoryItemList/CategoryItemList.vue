<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="(item, index) in list" :key="index">
      <CategoryItemListItem :item="item" />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, defineProps, ref, watch } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { useCategoryItemList } from '@/composables/use-category-item-list';
import CategoryItemListItem from '@/components/CategoryItemList/CategoryItemListItem.vue';

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

const { fetchCategoryItemList } = useCategoryItemList();

const list: Ref<BlackDesertItem[]> = ref([]);

const refetchCategoryItemList = (mainCategory: number, subCategory: number): void => {
  fetchCategoryItemList(mainCategory, subCategory).then((response: BlackDesertItem[]): void => {
    list.value = response;
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
