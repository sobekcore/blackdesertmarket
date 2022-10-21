<template>
  <li class="rounded border-t border-t-dark-600 bg-dark-400 p-2 shadow-md">
    <span class="flex items-center gap-2.5">
      <!-- TODO: Display item in-game icon -->
      <span class="flex-grow">{{ props.item.name }}</span>
      <CategoryItemListItemSeparator />
      <CategoryItemListItemProperty label="Base Price" :value="props.item.basePrice" />
      <CategoryItemListItemSeparator />
      <CategoryItemListItemProperty label="In Stock" :value="props.item.count" />
    </span>
  </li>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import CategoryItemListItemProperty from '@/components/CategoryItemList/CategoryItemListItemProperty.vue';
import CategoryItemListItemSeparator from '@/components/CategoryItemList/CategoryItemListItemSeparator.vue';

const props = defineProps({
  item: {
    type: Object as PropType<BlackDesertItem>,
    required: true,
  },
});
</script>
