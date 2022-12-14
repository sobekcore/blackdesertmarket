<!--
  TODO: Implement virtual scroll into long item lists to improve performance
-->

<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in list" :key="item.id">
      <ListItem :item="item" :class="getFluctuationTypeClass(item)" @effect="handleListItemClick(item)">
        <template #append>
          <ListItemSeparator />
          <ListItemProperty>
            <template #label>
              <span>Base Price</span>
              <span class="flex-grow"></span>
              <span>({{ formatFluctuationPrice(item) }})</span>
            </template>
            <template #value>
              <AppIcon :src="getFluctuationTypeIcon(item)" class="h-[20px] drop-shadow" />
              <span class="flex-grow"></span>
              <span>{{ formatBasePrice(item.basePrice) }}</span>
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
import { UseHotItemListReturn, useHotItemList } from '@/composables/use-hot-item-list';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import { UseFluctuationTypeReturn, useFluctuationType } from '@/composables/use-fluctuation-type';
import AppIcon from '@/components/base/AppIcon.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';

const hotItemList: UseHotItemListReturn = useHotItemList();
const numberFormat: UseNumberFormatReturn = useNumberFormat();

const list: Ref<BlackDesertItemHot[]> = ref([]);
const activeItem: Ref<BlackDesertItemHot | null> = ref(null);

const formatBasePrice = (price: number): string => {
  return numberFormat.format(price);
};

const formatFluctuationPrice = (item: BlackDesertItemHot): string => {
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

if (!list.value.length) {
  hotItemList.fetch().then((data: BlackDesertItemHot[]): void => {
    list.value = data;
  });
}
</script>
