<!--
  TODO: Move focus automatically into first ListItem when redirecting into any list
-->

<template>
  <li>
    <div data-test="inner" :class="props.class" class="flex rounded bg-dark-400 shadow-md">
      <button
        data-test="button"
        class="border-lighten hocus:bg-lighten-sm w-full cursor-pointer rounded border-t py-1.5 px-2"
        @click="triggerListItemEffect"
      >
        <span class="relative flex items-stretch gap-2.5">
          <slot name="icon">
            <ListItemIcon :src="itemIcon.href" :text="getItemIconText(props.item)" :class="itemGradeBorder" />
          </slot>
          <slot name="name">
            <ListItemName :name="getItemName(props.item)" :class="itemGradeText" />
          </slot>
          <slot name="append">
            <ListItemSeparator />
            <ListItemProperty data-test="price" label="Base Price" :value="formatBasePrice(props.item.basePrice)" />
            <ListItemSeparator />
            <ListItemProperty data-test="count" label="In Stock" :value="props.item.count" />
          </slot>
        </span>
      </button>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { PropType, Ref, defineEmits, defineProps, ref } from 'vue';
import { BlackDesertItem, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { VueAttributeClass } from '@/types/attributes-vue';
import { UseConfigReturn, useConfig } from '@/composables/use-config';
import {
  ItemEnhancementNameData,
  UseItemEnhancementReturn,
  useItemEnhancement,
} from '@/composables/use-item-enhancement';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const emit = defineEmits({
  effect: null,
});

const props = defineProps({
  item: {
    type: Object as PropType<BlackDesertItem>,
    required: true,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});

const config: UseConfigReturn = useConfig();
const numberFormat: UseNumberFormatReturn = useNumberFormat();

const itemIcon: Ref<URL> = ref(new URL(`/item/${props.item.id}/icon`, config.marketApiUrl));
const itemGradeText: Ref<string> = ref('text-sm');
const itemGradeBorder: Ref<string> = ref('');

const formatBasePrice = (price: number): string => {
  return numberFormat.format(price);
};

const getItemIconText = (item: BlackDesertItem): string => {
  const itemType: BlackDesertItemType = item as BlackDesertItemType;
  const itemEnhancement: UseItemEnhancementReturn = useItemEnhancement(itemType);
  const itemEnhancementName: ItemEnhancementNameData = itemEnhancement.getName();

  if (!itemEnhancementName.name) {
    return '';
  }

  return itemEnhancementName.short;
};

const getItemName = (item: BlackDesertItem): string => {
  const itemType: BlackDesertItemType = item as BlackDesertItemType;
  const itemEnhancement: UseItemEnhancementReturn = useItemEnhancement(itemType);
  const itemEnhancementName: ItemEnhancementNameData = itemEnhancement.getName();

  if (!itemEnhancementName.name) {
    return itemType.name;
  }

  if (itemEnhancementName.advanced) {
    return `${itemEnhancementName.name}: ${itemType.name}`;
  }

  return `${itemEnhancementName.name} ${itemType.name}`;
};

const triggerListItemEffect = (): void => {
  emit('effect');
};

if (props.item.grade) {
  itemGradeText.value = `text-sm text:item-grade-${props.item.grade}`;
  itemGradeBorder.value = `border:item-grade-${props.item.grade}`;
}
</script>
