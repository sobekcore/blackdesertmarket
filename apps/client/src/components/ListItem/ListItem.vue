<!--
  TODO: Move focus automatically into first ListItem when redirecting into any list
-->

<template>
  <div
    :data-test="props.disabled ? 'list-item-disabled' : 'list-item'"
    :data-item-grade="props.item.grade"
    :class="{
      [props.class]: true,
      'flex rounded bg-dark-400 shadow-md': true,
      'pointer-events-none': props.disabled,
    }"
  >
    <button
      data-test="list-item-button"
      :disabled="props.disabled"
      class="border-lighten hocus:bg-lighten-sm w-full cursor-pointer rounded border-t py-1.5 px-2 -outline-offset-1"
      @click="triggerListItemEffect"
    >
      <span class="relative flex items-stretch gap-2.5 overflow-hidden">
        <slot name="icon">
          <ListItemIcon
            :src="itemIcon"
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
          <ListItemProperty
            data-test="list-item-price"
            :label="translate('item.basePrice')"
            :value="itemComposable.getBasePrice()"
          />
          <ListItemSeparator />
          <ListItemProperty data-test="list-item-count" :label="translate('item.count')" :value="props.item.count" />
        </slot>
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { PropType, Ref, defineEmits, defineProps, ref } from 'vue';
import { BlackDesertItem, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { VueAttributeClass } from '@/types/attributes-vue';
import { UseItemTypeReturn, useItemType } from '@/composables/item-type/use-item-type';
import { UseItemReturn, useItem } from '@/composables/item/use-item';
import { UseItemIconFetchReturn, useItemIconFetch } from '@/composables/item/use-item-icon-fetch';
import { TranslateKey, useInject } from '@/composables/use-inject';
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
  disabled: {
    type: Boolean,
    default: false,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});

const translate = useInject(TranslateKey);
const itemComposable: UseItemReturn = useItem(props.item);
const itemTypeComposable: UseItemTypeReturn = useItemType(props.item as BlackDesertItemType);
const itemIconFetch: UseItemIconFetchReturn = useItemIconFetch(props.item.id);

const itemGradeText: Ref<string> = ref('text-sm');
const itemGradeBorder: Ref<string> = ref('');
const itemIcon: Ref<string> = ref('');

const triggerListItemEffect = (): void => {
  emit('effect');
};

if (props.item.grade) {
  itemGradeText.value = `text-sm text:item-grade-${props.item.grade}`;
  itemGradeBorder.value = `border:item-grade-${props.item.grade}`;
}

if (!itemIcon.value) {
  itemIconFetch.fetch().then((icon: string): void => {
    itemIcon.value = icon;
  });
}
</script>
