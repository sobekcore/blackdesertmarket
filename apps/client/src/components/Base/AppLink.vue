<template>
  <a :href="props.url" target="_blank" class="break-all underline decoration-dotted underline-offset-4">
    {{ props.url }}
  </a>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});
</script>
