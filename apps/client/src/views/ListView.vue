<template>
  <section>
    <CategoryItemList :main-category="mainCategory" :sub-category="subCategory" />
  </section>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, RouteParams, useRoute } from 'vue-router';
import { ComponentException } from '@/exceptions/component-exception';
import CategoryItemList from '@/components/CategoryItemList.vue';

const route: RouteLocationNormalizedLoaded = useRoute();

if (!route.params.mainCategory || !route.params.subCategory) {
  throw new ComponentException('Required route parameters mainCategory or subCategory are empty');
}

const mainCategory: Ref<number> = ref(Number(route.params.mainCategory));
const subCategory: Ref<number> = ref(Number(route.params.subCategory));

watch(
  (): RouteParams => {
    return route.params;
  },
  (): void => {
    mainCategory.value = Number(route.params.mainCategory);
    subCategory.value = Number(route.params.subCategory);
  },
);
</script>
