<template>
  <button data-test="button" class="modal-handle-ignore translate-x-1 hover:brightness-150" @click="modalClose">
    <AppIcon :src="require('@/assets/images/modal/modal-close.png')" class="modal-handle-ignore h-[24px]" />
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
