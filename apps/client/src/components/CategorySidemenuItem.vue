<template>
  <li>
    <button
      :class="{
        'border-lighten flex w-full cursor-pointer items-center justify-between p-2.5': true,
        'bg-dark-400 hover:bg-dark-600 focus-visible:bg-dark-600': !toggled,
        'bg-dark-600': toggled,
      }"
      @click="toggleSidemenuItem"
    >
      <span>
        <!-- TODO: Display individual category in-game icon -->
      </span>
      <span
        :class="{
          'text-sm': true,
          'text-light-300': !toggled,
          'text-light-100': toggled,
        }"
      >
        {{ props.title }}
      </span>
      <span>
        <!-- TODO: Display individual category state triangle icon -->
      </span>
    </button>
    <ul v-show="toggled" class="mt-0.5 flex flex-col gap-0.5">
      <template v-if="props.subCategories && props.subCategories.length">
        <template v-for="(subCategory, index) in props.subCategories" :key="index">
          <CategorySidemenuSubItem
            :title="subCategory.title"
            :main-category="props.mainCategory"
            :sub-category="subCategory.subCategory"
          />
        </template>
      </template>
      <template v-else>
        <li class="p-2.5 text-sm text-light-300">Could not find any sub-categories...</li>
      </template>
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { Ref, PropType, defineProps, ref } from 'vue';
import { MarketConfigSubCategory } from '@/interfaces/market-config';
import CategorySidemenuSubItem from '@/components/CategorySidemenuSubItem.vue';

interface CategorySidemenuItemProps {
  title: string;
  mainCategory: number;
  subCategories: MarketConfigSubCategory[];
}

const props: CategorySidemenuItemProps = defineProps({
  title: {
    type: String,
    required: true,
  },
  mainCategory: {
    type: Number,
    required: true,
  },
  subCategories: {
    type: Array as PropType<MarketConfigSubCategory[]>,
    required: true,
  },
});

const toggled: Ref<boolean> = ref(false);

const toggleSidemenuItem = (): void => {
  toggled.value = !toggled.value;
};
</script>
