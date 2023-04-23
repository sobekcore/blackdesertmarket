<template>
  <div class="flex flex-col gap-y-1">
    <span class="text-sm text-dark-800">
      {{ props.title }}
    </span>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
