<template>
  <li>
    <button
      data-test="button"
      :class="{
        'flex w-full rounded-sm border py-3 px-6 hocus:text-dark-900': true,
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
import { ComputedRef, Ref, computed, defineEmits, defineProps, ref, watch } from 'vue';
import { RouteLocationNamedRaw, Router, useLink, useRouter } from 'vue-router';
import { useLocationStore } from '@/stores/location';

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

const categoryItemListRoute: RouteLocationNamedRaw = {
  name: 'list',
  params: {
    mainCategory: props.mainCategory,
    subCategory: props.subCategory,
  },
};

const locationStore = useLocationStore();
const router: Router = useRouter();
const { isActive: categoryItemListActiveRoute } = useLink({ to: categoryItemListRoute });

const itemListActiveRoute: Ref<boolean> = ref(false);

const isActive: ComputedRef<boolean> = computed((): boolean => {
  return categoryItemListActiveRoute.value || itemListActiveRoute.value;
});

const triggerCategorySidemenuSubItemEffect = (): void => {
  router.push(categoryItemListRoute);
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

watch(
  (): Array<number | null> => {
    return [locationStore.getMainCategory, locationStore.getSubCategory];
  },
  (): void => {
    const matchMainCategory: boolean = props.mainCategory === locationStore.getMainCategory;
    const matchSubCategory: boolean = props.subCategory === locationStore.getSubCategory;

    itemListActiveRoute.value = matchMainCategory && matchSubCategory;
  },
  { immediate: process.env.NODE_ENV === 'test' },
);
</script>

<style lang="scss" scoped>
.button-inactive-state {
  @apply border-dark-200 bg-dark-300 text-brand-700 hocus:bg-dark-500;
}

.button-active-state {
  @apply bg-dark-500 text-dark-800;
}
</style>
