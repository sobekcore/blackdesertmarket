<template>
  <AppModal :title="translate('listFilter.favorites')" @close="triggerItemFavoritesModalClose">
    <ItemFavorites @effect="triggerItemFavoritesModalClose" />
  </AppModal>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppModal from '@/components/Base/AppModal/AppModal.vue';
import ItemFavorites from '@/components/ItemFavorites/ItemFavorites.vue';

const emit = defineEmits({
  close: null,
});

const translate = useInject(TranslateKey);

const triggerItemFavoritesModalClose = (): void => {
  emit('close');
};
</script>
