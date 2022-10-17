<template>
  <li class="rounded border-t border-t-dark-600 bg-dark-400 p-2 shadow-md">
    <span class="text-light-100">
      {{ item.name }}
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategoryItemListItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
});
</script>
