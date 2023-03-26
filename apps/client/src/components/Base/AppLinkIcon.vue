<template>
  <AppTooltip>
    <a data-test="link" :href="iconNameLinkMap[props.name]" target="_blank">
      <AppIcon :src="require(`@/assets/svg/${iconNameFileMap[props.name]}`)" class="h-[24px]" />
    </a>
    <template #popper>
      {{ iconNameTooltipMap[props.name] }}
    </template>
  </AppTooltip>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, computed, defineProps } from 'vue';
import { LinkIcon } from '@/enums/link-icon';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppIcon from '@/components/Base/AppIcon.vue';
import AppTooltip from '@/components/Base/AppTooltip.vue';

const props = defineProps({
  name: {
    type: String as PropType<LinkIcon>,
    required: true,
  },
});

const translate = useInject(TranslateKey);

const iconNameFileMap: ComputedRef<Record<LinkIcon, string>> = computed(
  (): Record<LinkIcon, string> => ({
    [LinkIcon.LEGAL]: 'legal.svg',
    [LinkIcon.GITHUB]: 'github.svg',
  }),
);

const iconNameLinkMap: ComputedRef<Record<LinkIcon, string>> = computed(
  (): Record<LinkIcon, string> => ({
    [LinkIcon.LEGAL]: '/legal',
    [LinkIcon.GITHUB]: 'https://github.com/sobekcore/blackdesertmarket',
  }),
);

const iconNameTooltipMap: ComputedRef<Record<LinkIcon, string>> = computed(
  (): Record<LinkIcon, string> => ({
    [LinkIcon.LEGAL]: translate('legal.legalTitle'),
    [LinkIcon.GITHUB]: 'GitHub',
  }),
);
</script>

<style lang="scss" scoped>
a {
  @apply rounded p-1 hocus:bg-dark-600;
  transition: background 100ms ease-in;
}
</style>
