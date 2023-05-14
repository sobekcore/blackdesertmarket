<!--
  TODO: Change this component to a reusable generic button component
-->

<template>
  <div
    :class="{
      [buttonVariantClassMap[props.variant]]: true,
      'flex rounded border border-dark-100': true,
      'opacity-75 brightness-75': props.disabled,
    }"
  >
    <button
      type="button"
      :disabled="props.disabled"
      :class="{
        'border-lighten w-full rounded border-t py-1 px-2 text-sm -outline-offset-1': true,
        'hocus:bg-lighten-sm cursor-pointer': !props.disabled,
        'cursor-not-allowed': props.disabled,
      }"
      @click="buttonClick"
    >
      <AppTooltip placement="bottom" :disabled="!props.tooltip">
        <span class="w-full">
          <slot></slot>
        </span>
        <template #popper>
          {{ props.tooltip }}
        </template>
      </AppTooltip>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, computed, defineEmits, defineProps } from 'vue';
import { ListFilterButtonVariant } from '@/enums/list-filter';
import AppTooltip from '@/components/Base/AppTooltip.vue';

const emit = defineEmits({
  click: null,
});

const props = defineProps({
  variant: {
    type: String as PropType<ListFilterButtonVariant>,
    default: ListFilterButtonVariant.DEFAULT,
  },
  tooltip: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonVariantClassMap: ComputedRef<Record<ListFilterButtonVariant, string>> = computed(
  (): Record<ListFilterButtonVariant, string> => ({
    [ListFilterButtonVariant.DEFAULT]: 'button-variant-default',
    [ListFilterButtonVariant.LIGHT]: 'button-variant-light',
    [ListFilterButtonVariant.BRAND]: 'button-variant-brand',
  }),
);

const buttonClick = (): void => {
  emit('click');
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.button-variant-default {
  background: linear-gradient($DARK_600 0%, $DARK_400 50%, $DARK_400 60%, $DARK_500 100%);
}

.button-variant-light {
  background: linear-gradient($DARK_700 0%, $DARK_500 50%, $DARK_500 60%, $DARK_600 140%);
}

.button-variant-brand {
  background: linear-gradient($BRAND_600 0%, $BRAND_400 50%, $BRAND_400 60%, $BRAND_500 100%);
}
</style>
