<template>
  <div role="status" class="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:flex-row">
    <div class="w-16 text-notification-error">
      <svg viewBox="0 0 512 512" fill="currentColor">
        <path
          d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
        />
      </svg>
    </div>
    <div class="flex flex-col gap-y-2">
      <h1 class="text-4xl font-bold text-notification-error">
        {{ props.title }}
      </h1>
      <div class="flex flex-col gap-y-1">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
