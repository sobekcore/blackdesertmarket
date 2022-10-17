<template>
  <li class="rounded border-t border-t-dark-600 bg-dark-400 p-2 shadow-md">
    <span class="text-light-100">
      {{ props.item.name }}
    </span>
  </li>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';

interface CategoryItemListItemProps {
  item: BlackDesertItem;
}

const props: CategoryItemListItemProps = defineProps({
  item: {
    type: Object as PropType<BlackDesertItem>,
    required: true,
  },
});
</script>
