<template>
  <div class="flex gap-x-2.5">
    <div class="w-full">
      <ListFilterButton :variant="ListFilterButtonVariant.LIGHT" @click="addToFavorites">
        {{ translate('itemFavorites.listToFavorites') }}
      </ListFilterButton>
    </div>
    <div class="w-full">
      <ListFilterButton :variant="ListFilterButtonVariant.LIGHT" @click="removeAllFavorites">
        {{ translate('itemFavorites.allReset') }}
      </ListFilterButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ListFilterButtonVariant } from '@/enums/list-filter';
import { useFavoritesStore } from '@/stores/favorites';
import { useLocationStore } from '@/stores/location';
import { TranslateKey, useInject } from '@/composables/use-inject';
import ListFilterButton from '@/components/ListFilter/ListFilterButton.vue';

const translate = useInject(TranslateKey);
const locationStore = useLocationStore();
const favoritesStore = useFavoritesStore();

const addToFavorites = (): void => {
  favoritesStore.addFavorite(locationStore.getSearchWord);
};

const removeAllFavorites = (): void => {
  favoritesStore.removeFavorites();
};
</script>
