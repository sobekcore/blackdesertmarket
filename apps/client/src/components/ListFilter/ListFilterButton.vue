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
      @click="updateButtonState"
    >
      <AppTooltip placement="bottom" :disabled="!props.tooltip">
        <span class="w-full">
          <slot v-bind="{ state: state }"></slot>
        </span>
        <template #popper>
          {{ props.tooltip }}
        </template>
      </AppTooltip>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, Ref, computed, defineEmits, defineProps, ref } from 'vue';
import { ListFilterButtonState, ListFilterButtonVariant } from '@/enums/list-filter';
import AppTooltip from '@/components/Base/AppTooltip.vue';

const emit = defineEmits({
  'update:modelValue': null,
});

const props = defineProps({
  modelValue: {
    type: String as PropType<ListFilterButtonState>,
  },
  indeterminate: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<ListFilterButtonVariant>,
    default: ListFilterButtonVariant.DEFAULT,
  },
  tooltip: {
    type: String,
    default: '',
  },
});

const state: Ref<ListFilterButtonState | undefined> = ref(props.modelValue);

const buttonVariantClassMap: ComputedRef<Record<ListFilterButtonVariant, string>> = computed(
  (): Record<ListFilterButtonVariant, string> => ({
    [ListFilterButtonVariant.DEFAULT]: 'button-variant-default',
    [ListFilterButtonVariant.LIGHT]: 'button-variant-light',
    [ListFilterButtonVariant.BRAND]: 'button-variant-brand',
  }),
);

const updateButtonState = (): void => {
  if (state.value === ListFilterButtonState.DEFAULT) {
    state.value = ListFilterButtonState.DESC;
  } else if (state.value === ListFilterButtonState.DESC) {
    state.value = ListFilterButtonState.ASC;
  } else if (state.value === ListFilterButtonState.ASC) {
    state.value = props.indeterminate ? ListFilterButtonState.DEFAULT : ListFilterButtonState.DESC;
  }

  emit('update:modelValue', state.value);
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
