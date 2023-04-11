<template>
  <button
    :class="{
      'w-full truncate border-b-2 border-dark-400 bg-dark-400 p-2': true,
      'border-dark-800': props.modelValue === props.id,
    }"
    @click="handleTabClick"
  >
    {{ props.label }}
  </button>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits({
  'update:modelValue': null,
});

const props = defineProps({
  modelValue: {
    type: Number,
  },
  id: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const handleTabClick = (): void => {
  emit('update:modelValue', props.id);
};
</script>
