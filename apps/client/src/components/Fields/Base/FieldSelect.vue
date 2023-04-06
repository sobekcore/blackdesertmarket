<template>
  <div>
    <select v-model="fieldValue" v-bind="attrs" data-test="select">
      <option v-for="option in props.options" :key="option.value" data-test="option" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { PropType, WritableComputedRef, computed, defineEmits, defineProps, useAttrs } from 'vue';
import { FieldSelectOption } from '@/interfaces/field-select-option';

const emit = defineEmits({
  'update:modelValue': null,
});

const props = defineProps({
  modelValue: {
    type: String,
  },
  options: {
    type: Array as PropType<FieldSelectOption[]>,
    required: true,
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
select {
  @apply h-8 w-full appearance-none rounded border-2 border-dark-100 bg-dark-100 bg-no-repeat py-1 pl-3 text-sm text-dark-900;
  padding-right: calc(2rem + 1px);
  background-position: right calc(0.375rem + 1px) center;
  background-image: url('@/assets/svg/select-arrows.svg');
  background-size: 1.25rem;
  transition: border 100ms ease-in;

  &:hover {
    @apply cursor-pointer border-dark-600;
  }

  &:active,
  &:focus {
    @apply border-dark-900 outline-none;
  }
}
</style>
