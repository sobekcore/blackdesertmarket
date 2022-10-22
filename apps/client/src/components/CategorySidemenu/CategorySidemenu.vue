<template>
  <ul class="flex flex-col gap-0.5 p-0.5">
    <CategorySidemenuItem
      title="Volatile Price Items"
      icon="images/other/volatile-price-items.png"
      :effect="volatilePriceItemsEffect"
    />
    <CategorySidemenuItem
      title="In Registration Queue"
      icon="images/other/in-registration-queue.png"
      :effect="inRegistrationQueueEffect"
    />
    <template v-for="category in categories" :key="category.mainCategory">
      <CategorySidemenuItem
        :title="category.title"
        :icon="category.icon"
        :main-category="category.mainCategory"
        :sub-categories="category.subCategories"
      />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, inject, ref } from 'vue';
import { Router, useRouter } from 'vue-router';
import { MarketConfig, MarketConfigCategory } from '@/interfaces/market-config';
import CategorySidemenuItem from '@/components/CategorySidemenu/CategorySidemenuItem.vue';

const marketConfig: MarketConfig | undefined = inject('marketConfig');
const router: Router = useRouter();

const categories: Ref<MarketConfigCategory[]> = ref([]);

if (marketConfig) {
  categories.value = marketConfig.categories;
}

const volatilePriceItemsEffect = () => {
  router.push({ name: 'hot' });
};

const inRegistrationQueueEffect = () => {
  router.push({ name: 'queue' });
};
</script>
