<template>
  <FieldSelect v-model="fieldValue" data-test="field-region-select" :options="regions" />
</template>

<script lang="ts" setup>
import { PropType, WritableComputedRef, computed, defineEmits, defineProps } from 'vue';
import { RegionCode } from '@/enums/region';
import regions from '@/configs/regions.config';
import FieldSelect from '@/components/Fields/Base/FieldSelect.vue';

const emit = defineEmits({
  'update:modelValue': null,
});

const props = defineProps({
  modelValue: {
    type: String as PropType<RegionCode>,
  },
});

const fieldValue: WritableComputedRef<RegionCode | undefined> = computed({
  get(): RegionCode | undefined {
    return props.modelValue;
  },
  set(value: RegionCode | undefined): void {
    emit('update:modelValue', value);
  },
});
</script>
