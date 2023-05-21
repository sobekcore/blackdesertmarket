<template>
  <div class="flex gap-x-2.5">
    <div class="w-full">
      <ListFilterButton data-test="list-to-favorites" :variant="ListFilterButtonVariant.LIGHT" @click="addToFavorites">
        {{ translate('itemFavorites.listToFavorites') }}
      </ListFilterButton>
    </div>
    <div class="w-full">
      <ListFilterButton data-test="all-reset" :variant="ListFilterButtonVariant.LIGHT" @click="removeAllFavorites">
        {{ translate('itemFavorites.allReset') }}
      </ListFilterButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ListFilterButtonVariant } from '@/enums/list-filter';
import { NotificationType } from '@/enums/notification';
import { useFavoritesStore } from '@/stores/favorites';
import { useLocationStore } from '@/stores/location';
import { TranslateKey, useInject } from '@/composables/use-inject';
import { UseNotificationReturn, useNotification } from '@/composables/use-notification';
import ListFilterButton from '@/components/ListFilter/ListFilterButton.vue';

const translate = useInject(TranslateKey);
const locationStore = useLocationStore();
const favoritesStore = useFavoritesStore();
const notification: UseNotificationReturn = useNotification();

const addToFavorites = (): void => {
  if (!locationStore.getSearchWord) {
    notification.show(NotificationType.ERROR, 'notification.errorCurrentPage');
    return;
  }

  if (favoritesStore.getFavorite(locationStore.getSearchWord)) {
    notification.show(NotificationType.ERROR, 'notification.errorRegistered');
    return;
  }

  favoritesStore.addFavorite(locationStore.getSearchWord);
};

const removeAllFavorites = (): void => {
  favoritesStore.removeFavorites();
};
</script>
