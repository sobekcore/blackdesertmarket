<template>
  <AppModal :title="translate('generic.purchase')" :fullsize="true" @close="triggerItemDetailsModalClose">
    <ItemDetails :id="props.id" :enhancement="props.enhancement" />
  </AppModal>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppModal from '@/components/Base/AppModal/AppModal.vue';
import ItemDetails from '@/components/ItemDetails/ItemDetails.vue';

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

const translate = useInject(TranslateKey);

const triggerItemDetailsModalClose = (): void => {
  emit('close');
};
</script>
