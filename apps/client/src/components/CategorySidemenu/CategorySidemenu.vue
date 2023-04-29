<template>
  <div class="flex max-h-full flex-col">
    <CategorySidemenuHeader />
    <div ref="list" class="overflow-y-scroll">
      <CategorySidemenuList @effect="categorySidemenuListEffect" @navigate="categorySidemenuListNavigate" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, defineEmits, nextTick, ref } from 'vue';
import CategorySidemenuHeader from '@/components/CategorySidemenu/CategorySidemenuHeader/CategorySidemenuHeader.vue';
import CategorySidemenuList from '@/components/CategorySidemenu/CategorySidemenuList.vue';

const emit = defineEmits({
  navigate: null,
});

const list: Ref<HTMLElement | null> = ref(null);

const categorySidemenuListEffect = (element: HTMLElement): void => {
  nextTick((): void => {
    list.value?.scrollTo({
      top: element.offsetTop - list.value.offsetTop,
      behavior: 'smooth',
    });
  });
};

const categorySidemenuListNavigate = (): void => {
  emit('navigate');
};
</script>
