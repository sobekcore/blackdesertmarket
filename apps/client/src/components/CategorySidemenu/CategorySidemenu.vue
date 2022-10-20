<template>
  <ul class="flex flex-col gap-0.5 p-0.5">
    <CategorySidemenuItem
      title="Volatile Price Items"
      icon="images/other/volatile-price-items.png"
      :effect="volatilePriceItemsEffect"
    />
    <template v-for="(category, index) in categories" :key="index">
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
</script>
