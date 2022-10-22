<template>
  <span class="ml-1.5 flex flex-grow items-center text-sm">
    {{ props.name }}
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
