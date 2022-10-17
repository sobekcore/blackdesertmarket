<template>
  <li>
    <button
      :class="{
        'border-lighten flex w-full rounded-sm p-2.5': true,
        'bg-dark-300 hover:bg-dark-500 focus-visible:bg-dark-500': true,
      }"
      @click="redirectToCategoryItemList"
    >
      <span class="text-sm text-brand-700">
        {{ title }}
      </span>
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Router, useRouter } from 'vue-router';

interface CategorySidemenuSubItemProps {
  title: string;
  mainCategory: number;
  subCategory: number;
}

interface CategorySidemenuSubItemData {
  redirectToCategoryItemList(): void;
}

export default defineComponent({
  name: 'CategorySidemenuSubItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    mainCategory: {
      type: Number,
      required: true,
    },
    subCategory: {
      type: Number,
      required: true,
    },
  },
  setup(props: CategorySidemenuSubItemProps): CategorySidemenuSubItemData {
    const router: Router = useRouter();

    const redirectToCategoryItemList = (): void => {
      router.push({
        name: 'list',
        params: {
          mainCategory: props.mainCategory,
          subCategory: props.subCategory,
        },
      });
    };

    return { redirectToCategoryItemList };
  },
});
</script>
