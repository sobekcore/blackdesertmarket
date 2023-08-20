<template>
  <div
    data-test="item-favorites-item"
    :data-search-word="props.searchWord"
    class="bg-lighten-xs flex items-center justify-between gap-2 rounded py-1.5 px-2 text-sm"
  >
    <span class="inline-flex overflow-hidden">
      <span data-test="label" class="truncate">{{ getItemLabel() }}</span>
    </span>
    <span class="flex flex-none gap-2">
      <AppTooltip placement="bottom">
        <button data-test="search-button" class="brightness-50 hocus:brightness-100" @click="handleSearchButtonClick">
          <AppIcon :src="require('@/assets/images/list-filter/search.png')" class="h-[24px] drop-shadow-md" />
        </button>
        <template #popper>
          {{ translate('itemFavorites.searchButton') }}
        </template>
      </AppTooltip>
      <AppTooltip placement="bottom">
        <button data-test="remove-button" class="brightness-50 hocus:brightness-100" @click="handleRemoveButtonClick">
          <AppIcon :src="require('@/assets/images/list-filter/remove.png')" class="h-[24px] drop-shadow-md" />
        </button>
        <template #popper>
          {{ translate('itemFavorites.removeButton') }}
        </template>
      </AppTooltip>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import { useLocationStore } from '@/stores/location';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppIcon from '@/components/Base/AppIcon.vue';
import AppTooltip from '@/components/Base/AppTooltip.vue';

const emit = defineEmits({
  effect: null,
});

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  searchWord: {
    type: String,
    required: true,
  },
});

const translate = useInject(TranslateKey);
const locationStore = useLocationStore();
const favoritesStore = useFavoritesStore();

const getItemLabel = (): string => {
  return `${props.index}. ${props.searchWord}`;
};

const handleSearchButtonClick = (): void => {
  locationStore.activeSearchWord = props.searchWord;
  emit('effect');
};

const handleRemoveButtonClick = (): void => {
  favoritesStore.removeFavorite(props.searchWord);
};
</script>
