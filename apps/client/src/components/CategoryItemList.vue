<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="(item, index) in list" :key="index">
      <CategoryItemListItem :item="item" />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, defineProps, inject, ref, watch } from 'vue';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Store, useStore } from 'vuex';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import CategoryItemListItem from '@/components/CategoryItemListItem.vue';

interface ItemsListProps {
  mainCategory: number;
  subCategory: number;
}

const props: ItemsListProps = defineProps({
  mainCategory: {
    type: Number,
    required: true,
  },
  subCategory: {
    type: Number,
    required: true,
  },
});

const axios: AxiosInstance | undefined = inject('axios');

const store: Store<never> = useStore();

const list: Ref<BlackDesertItem[]> = ref([]);

const fetchCategoryItemList = (mainCategory: number, subCategory: number): Promise<BlackDesertItem[]> => {
  if (!axios) {
    return new Promise((resolve): void => {
      return resolve([]);
    });
  }

  const config: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    params: {
      region: store.getters['preferences/region'],
      language: store.getters['preferences/language'],
    },
  };

  /**
   * TODO: Create separate axios instance intended only for connecting with @blackdesertmarket/api
   */
  return axios
    .get(`/list/${mainCategory}/${subCategory}`, config)
    .then((response: AxiosResponse): unknown[] => {
      return response.data.data ? response.data.data : [];
    })
    .then((data: unknown[]) => {
      return data as BlackDesertItem[];
    });
};

const refetchCategoryItemList = (mainCategory: number, subCategory: number): void => {
  fetchCategoryItemList(mainCategory, subCategory).then((response: BlackDesertItem[]): void => {
    list.value = response;
  });
};

if (!list.value.length) {
  refetchCategoryItemList(props.mainCategory, props.subCategory);
}

watch(
  (): string => {
    return `${props.mainCategory}.${props.subCategory}`;
  },
  (): void => {
    refetchCategoryItemList(props.mainCategory, props.subCategory);
  },
);
</script>
