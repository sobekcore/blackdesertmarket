<template>
  <FieldSelect v-model="fieldValue" :options="languages" @update:model-value="changeLanguage" />
</template>

<script lang="ts" setup>
import { Ref, defineEmits, defineProps, ref } from 'vue';
import { LanguageCode } from '@/enums/language';
import languages from '@/configs/languages.config';
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

const changeLanguage = (value: LanguageCode): void => {
  emit('update:modelValue', value);
};
</script>
