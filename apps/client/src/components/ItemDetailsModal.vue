<template>
  <AppModal title="Purchase" :fullsize="true" @close="triggerItemDetailsModalClose">
    <template #content>
      <ItemDetails :id="props.id" :enhancement="props.enhancement" />
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import AppModal from '@/components/base/AppModal/AppModal.vue';
import ItemDetails from '@/components/ItemDetails.vue';

const emit = defineEmits({
  close: null,
});

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  enhancement: {
    type: Number,
    required: true,
  },
});

const triggerItemDetailsModalClose = (): void => {
  emit('close');
};
</script>
