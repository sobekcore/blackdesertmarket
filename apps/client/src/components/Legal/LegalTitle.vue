<template>
  <h1 class="text-3xl sm:text-4xl">
    {{ props.title }}
  </h1>
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
