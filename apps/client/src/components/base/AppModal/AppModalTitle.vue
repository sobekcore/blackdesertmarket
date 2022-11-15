<template>
  <h1 class="text-xl">
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
