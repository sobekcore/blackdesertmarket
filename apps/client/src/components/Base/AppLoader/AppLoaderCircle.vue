<template>
  <circle data-test="circle" :cx="props.x" :cy="props.y" :r="props.radius" :opacity="props.opacity" :fill="color">
    <animate
      data-test="animate"
      :begin="formatAnimationBegin(props.begin)"
      attributeName="opacity"
      repeatCount="indefinite"
      keyTimes="0;1"
      values="1;0"
      dur="1s"
    />
  </circle>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { UseTailwindConfigReturn, useTailwindConfig } from '@/composables/use-tailwind-config';

const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  },
  opacity: {
    type: Number,
    required: true,
  },
  begin: {
    type: Number,
    required: true,
  },
});

const tailwindConfig: UseTailwindConfigReturn = useTailwindConfig();

const color: string = tailwindConfig.getValue('colors', 'dark-900');

const formatAnimationBegin = (begin: number): string => {
  return `${begin}s`;
};
</script>
