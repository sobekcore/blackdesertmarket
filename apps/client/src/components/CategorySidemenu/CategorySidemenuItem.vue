<template>
  <li>
    <slot name="before" :active="isActive"></slot>
    <button
      :class="{
        'flex w-full cursor-pointer items-center justify-between border p-3': true,
        'button-inactive-state': !isActive,
        'border-lighten button-active-state': isActive,
      }"
      @click="triggerCategorySidemenuItemEffect"
    >
      <AppIcon class="-my-[4px] h-[24px]" :src="require(`@/assets/${props.icon}`)" />
      <span class="text-sm">
        {{ props.title }}
      </span>
      <AppDropdownIcon class="-my-[8px] h-[32px] drop-shadow-md" :active="isActive" />
    </button>
    <slot name="after" :active="isActive"></slot>
  </li>
</template>

<script lang="ts" setup>
import { Ref, defineEmits, defineProps, ref, watch } from 'vue';
import AppIcon from '@/components/base/AppIcon.vue';
import AppDropdownIcon from '@/components/base/AppDropdownIcon.vue';

const emit = defineEmits({
  effect: null,
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const isActive: Ref<boolean> = ref(props.active);

const triggerCategorySidemenuItemEffect = (): void => {
  emit('effect');
};

watch(
  (): boolean => {
    return props.active;
  },
  (): void => {
    isActive.value = props.active;
  },
);
</script>

<style lang="scss" scoped>
.button-inactive-state {
  @apply border-dark-400 bg-dark-400 text-dark-800 hocus:border-dark-600 hocus:bg-dark-600 hocus:text-dark-900;
}

.button-active-state {
  @apply bg-dark-600 text-dark-900;
}
</style>
