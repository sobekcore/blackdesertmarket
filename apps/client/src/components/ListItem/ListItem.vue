<template>
  <li :class="props.class" class="border-t-lighten rounded border-t bg-dark-400 py-1.5 px-2 shadow-md">
    <span class="flex items-stretch gap-2.5">
      <slot name="icon">
        <ListItemIcon :src="itemIcon.href" :class="itemGradeBorder" />
      </slot>
      <slot name="name">
        <ListItemName :name="props.item.name" :class="itemGradeText" />
      </slot>
      <slot name="append">
        <ListItemSeparator />
        <ListItemProperty label="Base Price" :value="formatBasePrice(props.item.basePrice)" />
        <ListItemSeparator />
        <ListItemProperty label="In Stock" :value="props.item.count" />
      </slot>
    </span>
  </li>
</template>

<script lang="ts" setup>
import { Ref, PropType, defineProps, ref } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { VueAttributeClass } from '@/types/attributes-vue';
import { UseConfigReturn, useConfig } from '@/composables/use-config';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

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

const itemIcon: Ref<URL> = ref(new URL(`/item/icon/${props.item.id}`, config.marketApiUrl));
const itemGradeText: Ref<string> = ref('');
const itemGradeBorder: Ref<string> = ref('');

const formatBasePrice = (price: number): string => {
  return numberFormat.format(price);
};

if (props.item.grade) {
  itemGradeText.value = `text:item-grade-${props.item.grade}`;
  itemGradeBorder.value = `border:item-grade-${props.item.grade}`;
}
</script>
