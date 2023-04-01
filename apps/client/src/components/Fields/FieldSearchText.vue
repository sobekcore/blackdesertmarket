<template>
  <FieldText v-model="fieldValue" :placeholder="props.placeholder" @update:model-value="updateSearch" />
</template>

<script lang="ts" setup>
import { Ref, defineEmits, defineProps, ref } from 'vue';
import FieldText from '@/components/Fields/Base/FieldText.vue';

const emit = defineEmits({
  'update:modelValue': null,
});

const props = defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    default: 'Search',
  },
});

const fieldValue: Ref<string | undefined> = ref(props.modelValue);

const updateSearch = (value: string): void => {
  emit('update:modelValue', value);
};
</script>

<style lang="scss" scoped>
:deep(input) {
  @apply bg-no-repeat;
  padding-left: 2.25rem;
  background-position: left 0.5rem center;
  background-image: url('@/assets/images/list-filter/search.png');
  background-size: 1.25rem;
}
</style>
