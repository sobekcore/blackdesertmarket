<template>
  <button class="translate-x-1 hover:brightness-150" @click="modalClose">
    <AppIcon :src="require(`@/assets/images/other/modal-close.png`)" />
  </button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import AppIcon from '@/components/Base/AppIcon.vue';

const emit = defineEmits({
  close: null,
});

const modalClose = (): void => {
  emit('close');
};
</script>
