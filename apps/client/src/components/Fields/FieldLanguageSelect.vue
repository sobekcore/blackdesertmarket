<template>
  <FieldSelect v-model="fieldValue" :options="languages" />
</template>

<script lang="ts" setup>
import { PropType, WritableComputedRef, computed, defineEmits, defineProps } from 'vue';
import { LanguageCode } from '@/enums/language';
import languages from '@/configs/languages.config';
import FieldSelect from '@/components/Fields/Base/FieldSelect.vue';

const emit = defineEmits({
  'update:modelValue': null,
});

const props = defineProps({
  modelValue: {
    type: String as PropType<LanguageCode>,
  },
});

const fieldValue: WritableComputedRef<LanguageCode | undefined> = computed({
  get(): LanguageCode | undefined {
    return props.modelValue;
  },
  set(value: LanguageCode | undefined): void {
    emit('update:modelValue', value);
  },
});
</script>
