<!--
  TODO: Implement virtual scroll into long item lists to improve performance
-->

<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in itemList" :key="item.id">
      <ListItem :item="item" :class="getFluctuationTypeClass(item)" @effect="handleListItemClick(item)">
        <template #append>
          <ListItemSeparator />
          <ListItemProperty>
            <template #label>
              <span>Base Price</span>
              <span class="flex-grow" />
              <span>({{ getFluctuationPrice(item) }})</span>
            </template>
            <template #value>
              <AppIcon :src="getFluctuationTypeIcon(item)" class="h-[20px] drop-shadow" />
              <span class="flex-grow" />
              <span>{{ getBasePrice(item) }}</span>
            </template>
          </ListItemProperty>
          <ListItemSeparator />
          <ListItemProperty label="In Stock" :value="item.count" />
        </template>
      </ListItem>

      <Teleport v-if="activeItem === item" to="#modal">
        <ItemDetailsModal :id="item.id" :enhancement="item.enhancement" @close="handleListItemClick(item)" />
      </Teleport>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { UseFluctuationTypeReturn, useFluctuationType } from '@/composables/item-hot/use-fluctuation-type';
import { UseItemHotReturn, useItemHot } from '@/composables/item-hot/use-item-hot';
import { UseItemHotFetchReturn, useItemHotFetch } from '@/composables/item-hot/use-item-hot-fetch';
import { UseItemReturn, useItem } from '@/composables/item/use-item';
import AppIcon from '@/components/Base/AppIcon.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const itemHotFetch: UseItemHotFetchReturn = useItemHotFetch();

const itemList: Ref<BlackDesertItemHot[]> = ref([]);
const activeItem: Ref<BlackDesertItemHot | null> = ref(null);

const getBasePrice = (itemHot: BlackDesertItemHot): string => {
  const itemComposable: UseItemReturn = useItem(itemHot);
  return itemComposable.getBasePrice();
};

const getFluctuationPrice = (itemHot: BlackDesertItemHot): string => {
  const itemHotComposable: UseItemHotReturn = useItemHot(itemHot);
  return itemHotComposable.getFluctuationPrice();
};

const getFluctuationTypeClass = (itemHot: BlackDesertItemHot): string => {
  const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(itemHot.fluctuationType);
  return fluctuationType.getBackgroundClass();
};

const getFluctuationTypeIcon = (itemHot: BlackDesertItemHot): string => {
  const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(itemHot.fluctuationType);
  return fluctuationType.getIcon();
};

const handleListItemClick = (itemHot: BlackDesertItemHot): void => {
  activeItem.value = activeItem.value !== itemHot ? itemHot : null;
};

if (!itemList.value.length) {
  itemHotFetch.fetch().then((data: BlackDesertItemHot[]): void => {
    itemList.value = data;
  });
}
</script>
