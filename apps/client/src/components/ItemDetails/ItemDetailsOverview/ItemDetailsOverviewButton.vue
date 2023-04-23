<template>
  <div
    data-test="outer"
    :class="{
      'my-1.5 min-h-[34px] rounded': true,
      'button-inactive-state': !props.active,
      'button-active-state': props.active,
    }"
  >
    <button class="border-lighten flex h-full items-center whitespace-nowrap rounded border px-5 text-sm">
      {{ props.label }}
    </button>
  </div>
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
