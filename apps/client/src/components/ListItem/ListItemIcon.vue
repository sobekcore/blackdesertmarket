<template>
  <AppIcon :src="props.src" class="h-[46px] w-[46px] rounded-md border border-dark-600 bg-dark-100" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import AppIcon from '@/components/base/AppIcon.vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>
