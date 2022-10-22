<template>
  <li class="rounded border-t border-t-dark-600 bg-dark-400 py-1.5 px-2 shadow-md">
    <span class="flex items-stretch gap-2.5">
      <CategoryItemListItemIcon :src="icon" />
      <CategoryItemListItemName :name="props.item.name" />
      <CategoryItemListItemSeparator />
      <CategoryItemListItemProperty label="Base Price" :value="props.item.basePrice" />
      <CategoryItemListItemSeparator />
      <CategoryItemListItemProperty label="In Stock" :value="props.item.count" />
    </span>
  </li>
</template>

<script lang="ts" setup>
import { Ref, PropType, defineProps, ref } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import CategoryItemListItemIcon from '@/components/CategoryItemList/CategoryItemListItemIcon.vue';
import CategoryItemListItemName from '@/components/CategoryItemList/CategoryItemListItemName.vue';
import CategoryItemListItemProperty from '@/components/CategoryItemList/CategoryItemListItemProperty.vue';
import CategoryItemListItemSeparator from '@/components/CategoryItemList/CategoryItemListItemSeparator.vue';

const props = defineProps({
  item: {
    type: Object as PropType<BlackDesertItem>,
    required: true,
  },
});

/**
 * TODO: Create composable to access environment variables instead of accessing them directly
 */
const icon: Ref<string> = ref(`${process.env.VUE_APP_API_URL}/item/icon/${props.item.id}`);
</script>
