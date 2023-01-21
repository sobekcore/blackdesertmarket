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
            <ListItemIcon
              :src="itemIcon.href"
              :item="props.item"
              :text="itemTypeComposable.getItemIconText()"
              :class="itemGradeBorder"
            />
          </slot>
          <slot name="name">
            <ListItemName :name="itemTypeComposable.getItemName()" :class="itemGradeText" />
          </slot>
          <slot name="append">
            <ListItemSeparator />
            <ListItemProperty data-test="price" label="Base Price" :value="itemComposable.getBasePrice()" />
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
import { UseItemTypeReturn, useItemType } from '@/composables/item-type/use-item-type';
import { UseItemReturn, useItem } from '@/composables/item/use-item';
import { UseConfigReturn, useConfig } from '@/composables/use-config';
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
const itemComposable: UseItemReturn = useItem(props.item);
const itemTypeComposable: UseItemTypeReturn = useItemType(props.item as BlackDesertItemType);

const itemIcon: Ref<URL> = ref(new URL(`/item/${props.item.id}/icon`, config.marketApiUrl));
const itemGradeText: Ref<string> = ref('text-sm');
const itemGradeBorder: Ref<string> = ref('');

const triggerListItemEffect = (): void => {
  emit('effect');
};

if (props.item.grade) {
  itemGradeText.value = `text-sm text:item-grade-${props.item.grade}`;
  itemGradeBorder.value = `border:item-grade-${props.item.grade}`;
}
</script>
