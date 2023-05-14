<template>
  <div class="flex h-full flex-col">
    <div class="item-favorites-header">
      <ItemFavoritesHeader />
    </div>
    <div class="item-favorites-list">
      <ItemFavoritesList @effect="triggerItemFavoritesEffect" />
    </div>
    <div class="item-favorites-actions">
      <ItemFavoritesActions />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import ItemFavoritesActions from '@/components/ItemFavorites/ItemFavoritesActions.vue';
import ItemFavoritesHeader from '@/components/ItemFavorites/ItemFavoritesHeader.vue';
import ItemFavoritesList from '@/components/ItemFavorites/ItemFavoritesList.vue';

const emit = defineEmits({
  effect: null,
});

const triggerItemFavoritesEffect = (): void => {
  emit('effect');
};
</script>

<style lang="scss" scoped>
.item-favorites-header {
  @apply border-b border-b-dark-600 bg-dark-200 bg-opacity-90 p-2.5;
}

.item-favorites-list {
  @apply flex h-full flex-col gap-2 overflow-y-auto bg-dark-100 bg-opacity-90 p-2.5 xl:h-[452px];
}

.item-favorites-actions {
  @apply border-t border-t-dark-600 bg-dark-200 bg-opacity-90 p-2.5;
}
</style>
