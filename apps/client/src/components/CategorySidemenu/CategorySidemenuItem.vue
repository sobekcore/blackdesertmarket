<template>
  <li>
    <button
      :class="{
        'border-lighten flex w-full cursor-pointer items-center justify-between p-3': true,
        'bg-dark-400 hover:bg-dark-600 focus-visible:bg-dark-600': !active,
        'bg-dark-600': active,
      }"
      @click="triggerItemEffect"
    >
      <AppIcon class="-my-[4px] h-[24px]" :src="require(`@/assets/${props.icon}`)" />
      <span
        :class="{
          'text-sm': true,
          'text-light-300': !active,
          'text-light-100': active,
        }"
      >
        {{ props.title }}
      </span>
      <AppDropdownIcon class="-my-[8px] h-[32px] drop-shadow-md" :active="active" />
    </button>
    <ul v-if="props.subCategories" v-show="active" class="mt-0.5 flex flex-col gap-0.5">
      <template v-if="props.subCategories.length">
        <template v-for="subCategory in props.subCategories" :key="subCategory.subCategory">
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
import CategorySidemenuSubItem from '@/components/CategorySidemenu/CategorySidemenuSubItem.vue';
import AppIcon from '@/components/base/AppIcon.vue';
import AppDropdownIcon from '@/components/base/AppDropdownIcon.vue';

type CategorySidemenuItemEffect = (event: Event, active: Ref<boolean>) => void;

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  mainCategory: {
    type: Number,
  },
  subCategories: {
    type: Array as PropType<MarketConfigSubCategory[]>,
  },
  effect: {
    type: Function as PropType<CategorySidemenuItemEffect>,
  },
});

const active: Ref<boolean> = ref(false);

const triggerItemEffect = (event: Event): void => {
  if (props.effect) {
    props.effect(event, active);
    return;
  }

  if (props.subCategories) {
    active.value = !active.value;
  }
};
</script>
