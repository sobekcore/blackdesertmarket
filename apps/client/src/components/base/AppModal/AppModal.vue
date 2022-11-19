<template>
  <div role="dialog" aria-modal="true" class="relative z-10">
    <AppModalBackdrop />
    <div ref="container" class="fixed inset-0">
      <div ref="modal" :style="modalStyle" class="fixed">
        <div
          :class="{
            'flex flex-col overflow-hidden rounded-lg border border-brand-700 shadow-xl': true,
            'h-[90vh] w-[90vw]': props.fullsize,
            'max-h-[90vh] w-[400px] max-w-[90vw]': !props.fullsize,
          }"
        >
          <span ref="focus" aria-label="Modal" tabindex="0"></span>
          <div
            ref="handle"
            :class="{
              'flex items-center bg-dark-400 px-5 py-2 shadow-lg': true,
              'cursor-move': props.draggable,
            }"
          >
            <AppModalTitle :title="props.title" />
            <span class="flex-grow"></span>
            <AppModalClose @close="modalClose" />
          </div>
          <div class="relative flex flex-grow overflow-y-hidden">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, Ref, defineEmits, defineProps, nextTick, onMounted, ref, computed } from 'vue';
import { UseDraggableReturn, useElementBounding, useDraggable, useResizeObserver, clamp } from '@vueuse/core';
import { UseFocusTrapReturn, useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { VueAttributeStyle } from '@/types/attributes-vue';
import AppModalBackdrop from '@/components/base/AppModal/AppModalBackdrop.vue';
import AppModalTitle from '@/components/base/AppModal/AppModalTitle.vue';
import AppModalClose from '@/components/base/AppModal/AppModalClose.vue';

const emit = defineEmits({
  close: null,
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  fullsize: {
    type: Boolean,
    default: false,
  },
});

const container: Ref<HTMLElement | null> = ref(null);
const modal: Ref<HTMLElement | null> = ref(null);
const focus: Ref<HTMLElement | null> = ref(null);
const handle: Ref<HTMLElement | null> = ref(null);

let x: Ref<number> = ref(0);
let y: Ref<number> = ref(0);

const { left, right, top, bottom } = useElementBounding(container);
const { width, height } = useElementBounding(modal);

const focusTrap: UseFocusTrapReturn = useFocusTrap(modal, {
  escapeDeactivates: false,
  initialFocus: (): HTMLElement => {
    return focus.value || document.body;
  },
});

if (props.draggable) {
  const draggable: UseDraggableReturn = useDraggable(modal, {
    handle: handle,
    preventDefault: true,
    onStart: (): void => {
      document.body.classList.add('cursor-move');
    },
    onEnd: (): void => {
      document.body.classList.remove('cursor-move');
    },
  });

  x = draggable.x;
  y = draggable.y;
}

const modalX: ComputedRef<number> = computed((): number => {
  return clamp(left.value, x.value, right.value - width.value);
});

const modalY: ComputedRef<number> = computed((): number => {
  return clamp(top.value, y.value, bottom.value - height.value);
});

const modalStyle: ComputedRef<VueAttributeStyle> = computed((): VueAttributeStyle => {
  return {
    left: `${modalX.value}px`,
    top: `${modalY.value}px`,
  };
});

const modalDefaultPosition = (): void => {
  x.value = (right.value - width.value) / 2;
  y.value = (bottom.value - height.value) / 2;
};

const modalClose = (): void => {
  focusTrap.deactivate();
  emit('close');
};

onMounted((): void => {
  modalDefaultPosition();

  nextTick((): void => {
    focusTrap.activate();
  });
});

useResizeObserver(container, (): void => {
  modalDefaultPosition();
});

useResizeObserver(modal, (): void => {
  modalDefaultPosition();
});
</script>
