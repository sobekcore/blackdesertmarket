<template>
  <li>
    <button
      :class="{
        'flex w-full rounded-sm border py-3 px-6 hocus:text-light-100': true,
        'button-inactive-state': !isActive,
        'border-lighten button-active-state': isActive,
      }"
      @click="triggerCategorySidemenuSubItemEffect"
    >
      <span class="text-sm">
        {{ props.title }}
      </span>
    </button>
  </li>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, watch } from 'vue';
import { RouteLocationNamedRaw, Router, useRouter, useLink } from 'vue-router';

const emit = defineEmits({
  effect: null,
});

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

const categorySidemenuSubItemRoute: RouteLocationNamedRaw = {
  name: 'list',
  params: {
    mainCategory: props.mainCategory,
    subCategory: props.subCategory,
  },
};

const router: Router = useRouter();
const { isActive } = useLink({ to: categorySidemenuSubItemRoute });

const triggerCategorySidemenuSubItemEffect = (): void => {
  router.push(categorySidemenuSubItemRoute);
  emit('effect');
};

watch(
  (): boolean => {
    return isActive.value;
  },
  (): void => {
    if (isActive.value) {
      emit('effect');
    }
  },
);
</script>

<style lang="scss" scoped>
.button-inactive-state {
  @apply border-dark-200 bg-dark-300 text-brand-700 hocus:bg-dark-500;
}

.button-active-state {
  @apply bg-dark-500 text-light-300;
}
</style>
