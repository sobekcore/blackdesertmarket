<template>
  <li>
    <button
      :class="{
        'border-lighten flex w-full rounded-sm p-3': true,
        'bg-dark-300 hover:bg-dark-500 focus-visible:bg-dark-500': true,
      }"
      @click="redirectToCategoryItemList"
    >
      <span class="text-sm text-brand-700">
        {{ props.title }}
      </span>
    </button>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Router, useRouter } from 'vue-router';

const props = defineProps({
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
});

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
</script>
