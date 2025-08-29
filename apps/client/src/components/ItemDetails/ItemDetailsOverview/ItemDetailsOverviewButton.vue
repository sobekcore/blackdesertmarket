<template>
  <button
    data-test="button"
    :class="{
      'border-lighten whitespace-nowrap rounded border py-1.5 px-5 text-sm': true,
      'button-inactive-state': !props.active,
      'button-active-state': props.active,
    }"
  >
    {{ props.label }}
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.button-inactive-state {
  @apply bg-dark-500 hocus:bg-brand-200;
}

.button-active-state {
  @apply bg-brand-300;
}
</style>
