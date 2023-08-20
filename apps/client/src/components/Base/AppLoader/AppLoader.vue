<template>
  <div
    data-test="loader"
    role="status"
    aria-busy="true"
    :class="{
      'loader-block-wrapper': !props.overlay,
      'loader-overlay-wrapper': props.overlay,
    }"
  >
    <AppLoaderBackdrop v-if="props.overlay" />
    <div
      data-test="icon"
      :class="{
        'loader-overlay-icon': props.overlay,
      }"
    >
      <svg :width="size * 2" :height="size * 2" :viewBox="`0 0 ${size} ${size}`">
        <AppLoaderCircle :x="size * 0.5" :y="size * 0.2" :radius="radius" :opacity="1" :begin="-0.875" />
        <AppLoaderCircle :x="size * 0.7" :y="size * 0.3" :radius="radius" :opacity="0.875" :begin="-0.75" />
        <AppLoaderCircle :x="size * 0.8" :y="size * 0.5" :radius="radius" :opacity="0.75" :begin="-0.625" />
        <AppLoaderCircle :x="size * 0.7" :y="size * 0.7" :radius="radius" :opacity="0.625" :begin="-0.5" />
        <AppLoaderCircle :x="size * 0.5" :y="size * 0.8" :radius="radius" :opacity="0.5" :begin="-0.375" />
        <AppLoaderCircle :x="size * 0.3" :y="size * 0.7" :radius="radius" :opacity="0.375" :begin="-0.25" />
        <AppLoaderCircle :x="size * 0.2" :y="size * 0.5" :radius="radius" :opacity="0.25" :begin="-0.125" />
        <AppLoaderCircle :x="size * 0.3" :y="size * 0.3" :radius="radius" :opacity="0.125" :begin="0" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, Ref, defineProps, ref } from 'vue';
import { LoaderSize } from '@/enums/loader';
import AppLoaderBackdrop from '@/components/Base/AppLoader/AppLoaderBackdrop.vue';
import AppLoaderCircle from '@/components/Base/AppLoader/AppLoaderCircle.vue';

const props = defineProps({
  size: {
    type: String as PropType<LoaderSize>,
    default: LoaderSize.MEDIUM,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
});

const size: Ref<number> = ref(0);
const radius: Ref<number> = ref(0);

if (!size.value || !radius.value) {
  switch (props.size) {
    case LoaderSize.EXTRA_SMALL:
      size.value = 16;
      radius.value = 1.28;
      break;
    case LoaderSize.SMALL:
      size.value = 22;
      radius.value = 1.76;
      break;
    case LoaderSize.MEDIUM:
      size.value = 30;
      radius.value = 2.4;
      break;
    case LoaderSize.LARGE:
      size.value = 40;
      radius.value = 3.2;
      break;
    case LoaderSize.EXTRA_LARGE:
      size.value = 56;
      radius.value = 4.48;
      break;
  }
}
</script>

<style lang="scss" scoped>
.loader-block-wrapper {
  @apply flex h-full w-full items-center justify-center;
}

.loader-overlay-wrapper {
  @apply absolute inset-0 z-10;
}

.loader-overlay-icon {
  @apply sticky inset-1/2 inline-flex translate-y-[-50%] translate-x-[-50%] items-center justify-center;
}
</style>
