<template>
  <ul class="flex flex-col gap-0.5 p-0.5">
    <template v-for="(category, index) in categories" :key="index">
      <CategorySidemenuItem
        :title="category.title"
        :main-category="category.mainCategory"
        :sub-categories="category.subCategories"
      />
    </template>
  </ul>
</template>

<script lang="ts">
import { Ref, defineComponent, inject, ref } from 'vue';
import { MarketConfig, MarketConfigCategory } from '@/interfaces/market-config';
import CategorySidemenuItem from '@/components/CategorySidemenuItem.vue';

interface CategorySidemenuData {
  categories: Ref<MarketConfigCategory[]>;
}

export default defineComponent({
  name: 'CategorySidemenu',
  components: {
    CategorySidemenuItem,
  },
  setup(): CategorySidemenuData {
    const marketConfig: MarketConfig | undefined = inject('marketConfig');

    const categories: Ref<MarketConfigCategory[]> = ref([]);

    if (marketConfig) {
      categories.value = marketConfig.categories;
    }

    return { categories };
  },
});
</script>
