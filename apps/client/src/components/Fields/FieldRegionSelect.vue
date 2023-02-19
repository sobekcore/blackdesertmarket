<template>
  <FieldSelect v-model="fieldValue" :options="regions" @update:model-value="changeRegion" />
</template>

<script lang="ts" setup>
import { Ref, defineEmits, defineProps, ref } from 'vue';
import { LanguageCode } from '@/enums/language';
import regions from '@/configs/regions.config';
import FieldSelect from '@/components/Fields/Base/FieldSelect.vue';

const emit = defineEmits({
  'update:modelValue': null,
});

const props = defineProps({
  modelValue: {
    type: String,
  },
});

const fieldValue: Ref<string | undefined> = ref(props.modelValue);

const changeRegion = (value: LanguageCode): void => {
  emit('update:modelValue', value);
};
</script>
