<template>
  <div class="flex flex-col gap-y-0.5">
    <div data-test="label" class="text-sm text-dark-800">
      {{ props.label }}
    </div>
    <div data-test="value">
      <template v-if="props.value">
        {{ props.value }}
      </template>
      <AppMissingData v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import AppMissingData from '@/components/Base/AppMissingData.vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>
