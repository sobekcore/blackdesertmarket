<template>
  <template v-if="favoritesList.length">
    <ItemFavoritesItem
      v-for="(searchWord, index) in favoritesList"
      :key="searchWord"
      :index="++index"
      :search-word="searchWord"
      @effect="itemFavoritesItemEffect"
    />
  </template>
  <div v-else class="flex h-full items-center justify-center text-sm">
    {{ translate('itemFavorites.emptyFavorites') }}
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, computed, defineEmits } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import { TranslateKey, useInject } from '@/composables/use-inject';
import ItemFavoritesItem from '@/components/ItemFavorites/ItemFavoritesItem.vue';

const emit = defineEmits({
  effect: null,
});

const translate = useInject(TranslateKey);
const favoritesStore = useFavoritesStore();

const favoritesList: ComputedRef<string[]> = computed((): string[] => {
  return favoritesStore.getFavorites;
});

const itemFavoritesItemEffect = (): void => {
  emit('effect');
};
</script>
