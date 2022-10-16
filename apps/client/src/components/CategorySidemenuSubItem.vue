<template>
  <li>
    <button
      :class="{
        'auto-light-border flex w-full rounded-sm p-2.5': true,
        'bg-dark-300 hover:bg-dark-500 focus-visible:bg-dark-500': true,
      }"
    >
      <span class="text-sm text-brand-700">{{ title }}</span>
    </button>
  </li>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategorySidemenuSubItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    subCategory: {
      type: Number,
      required: true,
    },
  },
});
</script>
