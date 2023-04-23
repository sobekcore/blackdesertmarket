<template>
  <li data-test="item" :class="props.class" class="flex rounded">
    <div class="hocus:bg-lighten-xs flex w-full cursor-pointer items-center rounded py-1 px-5">
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { VueAttributeClass } from '@/types/attributes-vue';

const props = defineProps({
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});
</script>
