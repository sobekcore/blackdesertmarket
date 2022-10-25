<template>
  <li class="rounded border-t border-t-dark-600 bg-dark-400 py-1.5 px-2 shadow-md">
    <span class="flex items-stretch gap-2.5">
      <ListItemIcon :src="icon" />
      <ListItemName :name="props.item.name" />
      <ListItemSeparator />
      <ListItemProperty label="Base Price" :value="props.item.basePrice" />
      <ListItemSeparator />
      <ListItemProperty label="In Stock" :value="props.item.count" />
    </span>
  </li>
</template>

<script lang="ts" setup>
import { Ref, PropType, defineProps, ref } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

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
