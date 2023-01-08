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
import { UseFluctuationTypeReturn, useFluctuationType } from '@/composables/use-fluctuation-type';
import { UseHotItemListReturn, useHotItemList } from '@/composables/use-hot-item-list';
import { UseItemReturn, useItem } from '@/composables/use-item';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import AppIcon from '@/components/Base/AppIcon.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const hotItemList: UseHotItemListReturn = useHotItemList();
const numberFormat: UseNumberFormatReturn = useNumberFormat();

const itemList: Ref<BlackDesertItemHot[]> = ref([]);
const activeItem: Ref<BlackDesertItemHot | null> = ref(null);

const getBasePrice = (item: BlackDesertItemHot): string => {
  const itemComposable: UseItemReturn = useItem(item);
  return itemComposable.getBasePrice();
};

const getFluctuationPrice = (item: BlackDesertItemHot): string => {
  const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(item.fluctuationType);
  const operator: string = fluctuationType.getOperator();
  const price: string = numberFormat.format(item.fluctuationPrice);

  return `${operator}${price}`;
};

const getFluctuationTypeClass = (item: BlackDesertItemHot): string => {
  const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(item.fluctuationType);
  return fluctuationType.getBackgroundClass();
};

const getFluctuationTypeIcon = (item: BlackDesertItemHot): string => {
  const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(item.fluctuationType);
  return fluctuationType.getIcon();
};

const handleListItemClick = (item: BlackDesertItemHot): void => {
  activeItem.value = activeItem.value !== item ? item : null;
};

if (!itemList.value.length) {
  hotItemList.fetch().then((data: BlackDesertItemHot[]): void => {
    itemList.value = data;
  });
}
</script>
