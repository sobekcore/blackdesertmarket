<template>
  <div class="flex max-h-full flex-col">
    <CategorySidemenuHeader />
    <div ref="list" class="overflow-y-scroll">
      <CategorySidemenuList @effect="categorySidemenuListEffect" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, nextTick, ref } from 'vue';
import CategorySidemenuHeader from '@/components/CategorySidemenu/CategorySidemenuHeader/CategorySidemenuHeader.vue';
import CategorySidemenuList from '@/components/CategorySidemenu/CategorySidemenuList.vue';

const list: Ref<HTMLElement | null> = ref(null);

const categorySidemenuListEffect = (element: HTMLElement): void => {
  nextTick((): void => {
    list.value?.scrollTo({
      top: element.offsetTop - list.value.offsetTop,
      behavior: 'smooth',
    });
  });
};
</script>
