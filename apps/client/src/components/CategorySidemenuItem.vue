<template>
  <li>
    <button
      :class="{
        'auto-light-border flex w-full cursor-pointer items-center justify-between p-2.5': true,
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
        {{ title }}
      </span>
      <span>
        <!-- TODO: Display individual category state triangle icon -->
      </span>
    </button>
    <ul v-show="toggled" class="mt-0.5 flex flex-col gap-0.5">
      <template v-if="subCategories && subCategories.length">
        <template v-for="(subCategory, index) in subCategories" :key="index">
          <CategorySidemenuSubItem :title="subCategory.title" :sub-category="subCategory.subCategory" />
        </template>
      </template>
      <template v-else>
        <li class="p-2.5 text-sm text-light-300">Could not find any subcategories...</li>
      </template>
    </ul>
  </li>
</template>

<script lang="ts">
import { Ref, defineComponent, ref } from 'vue';
import CategorySidemenuSubItem from '@/components/CategorySidemenuSubItem.vue';

interface CategorySidemenuItemData {
  toggled: Ref<boolean>;
  toggleSidemenuItem(): void;
}

export default defineComponent({
  name: 'CategorySidemenuItem',
  components: {
    CategorySidemenuSubItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    mainCategory: {
      type: Number,
      required: true,
    },
    subCategories: {
      type: Array,
      required: true,
    },
  },
  setup(): CategorySidemenuItemData {
    const toggled: Ref<boolean> = ref(false);

    const toggleSidemenuItem = (): void => {
      toggled.value = !toggled.value;
    };

    return { toggled, toggleSidemenuItem };
  },
});
</script>
