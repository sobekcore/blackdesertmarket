<template>
  <div class="h-full max-h-full">
    <RecycleScroller class="p-2.5" :items="itemList" skip-hover>
      <template #default="{ item }">
        <ListItem
          :key="item.id"
          v-memo="[item.id]"
          :item="item"
          :class="getFluctuationTypeClass(item)"
          @effect="handleListItemClick(item)"
        >
          <template #append>
            <ListItemSeparator />
            <ListItemProperty>
              <template #label>
                <span>{{ translate('item.basePrice') }}</span>
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
            <ListItemProperty :label="translate('item.count')" :value="item.count" />
          </template>
        </ListItem>

        <Teleport v-if="activeItem === item" to="#modal">
          <ItemDetailsModal :id="item.id" :enhancement="item.enhancement" @close="handleListItemClick(item)" />
        </Teleport>
      </template>
    </RecycleScroller>
  </div>
  <AppLoader v-if="!loaded" :size="LoaderSize.LARGE" overlay />
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import { BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { ItemSize } from '@/enums/item-size';
import { LoaderSize } from '@/enums/loader';
import { UseFluctuationTypeReturn, useFluctuationType } from '@/composables/item-hot/use-fluctuation-type';
import { UseItemHotReturn, useItemHot } from '@/composables/item-hot/use-item-hot';
import { UseItemHotFetchReturn, useItemHotFetch } from '@/composables/item-hot/use-item-hot-fetch';
import { UseItemReturn, useItem } from '@/composables/item/use-item';
import { UseDocumentSizeReturn, useDocumentSize } from '@/composables/use-document-size';
import { TranslateKey, useInject } from '@/composables/use-inject';
import { UseTailwindConfigReturn, useTailwindConfig } from '@/composables/use-tailwind-config';
import { UseVirtualScrollReturn, useVirtualScroll } from '@/composables/use-virtual-scroll';
import AppIcon from '@/components/Base/AppIcon.vue';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const translate = useInject(TranslateKey);
const tailwindConfig: UseTailwindConfigReturn = useTailwindConfig();
const documentSize: UseDocumentSizeReturn = useDocumentSize();
const itemHotFetch: UseItemHotFetchReturn = useItemHotFetch();

const loaded: Ref<boolean> = ref(false);
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
    const virtualScroll: UseVirtualScrollReturn = useVirtualScroll();
    const gap: number = documentSize.remToRaw(tailwindConfig.getValue('gap', '2'));

    itemList.value = virtualScroll.prepareData<BlackDesertItemHot>(data, ItemSize.HEIGHT, gap);
    loaded.value = true;
  });
}
</script>
