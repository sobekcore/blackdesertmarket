<template>
  <ul class="flex flex-col gap-2 p-2.5">
    <template v-for="item in list" :key="item.id">
      <ListItem :item="item" :class="getFluctuationTypeClass(item)">
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
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { UseHotItemListReturn, useHotItemList } from '@/composables/use-hot-item-list';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import { UseFluctuationTypeReturn, useFluctuationType } from '@/composables/use-fluctuation-type';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';
import AppIcon from '@/components/base/AppIcon.vue';

const hotItemList: UseHotItemListReturn = useHotItemList();
const numberFormat: UseNumberFormatReturn = useNumberFormat();

const list: Ref<BlackDesertItemHot[]> = ref([]);

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
  return fluctuationType.getClass('bg');
};

const getFluctuationTypeIcon = (item: BlackDesertItemHot): string => {
  const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(item.fluctuationType);
  return fluctuationType.getIcon();
};

hotItemList.fetch().then((data: BlackDesertItemHot[]): void => {
  list.value = data;
});
</script>
