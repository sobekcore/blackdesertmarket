<template>
  <button class="translate-x-1" @click="modalClose">
    <AppIcon :src="require(`@/assets/images/other/close.png`)" />
  </button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import AppIcon from '@/components/base/AppIcon.vue';

const emit = defineEmits({
  close: null,
});

const modalClose = (): void => {
  emit('close');
};
</script>
