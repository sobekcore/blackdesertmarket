<template>
  <div>
    <input v-model="fieldValue" v-bind="attrs" type="text" />
  </div>
</template>

<script lang="ts" setup>
import { WritableComputedRef, computed, defineEmits, defineProps, useAttrs } from 'vue';

const emit = defineEmits({
  'update:modelValue': null,
});

const props = defineProps({
  modelValue: {
    type: String,
  },
});

const attrs = useAttrs();

const fieldValue: WritableComputedRef<string | undefined> = computed({
  get(): string | undefined {
    return props.modelValue;
  },
  set(value: string | undefined): void {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
input {
  @apply h-8 w-full rounded border-2 border-dark-100 bg-dark-100 py-1 px-3 text-sm text-dark-900;
  transition: border 100ms ease-in;

  &:hover {
    @apply cursor-text border-dark-600;
  }

  &:active,
  &:focus {
    @apply border-dark-900 outline-none;
  }
}
</style>
