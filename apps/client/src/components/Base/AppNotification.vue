<template>
  <div>
    <h2 class="Vue-Toastification__title">{{ props.title }}</h2>
    <span>{{ props.message }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>
