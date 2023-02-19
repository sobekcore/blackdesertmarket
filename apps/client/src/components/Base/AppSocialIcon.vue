<template>
  <a data-test="link" :href="link" target="_blank">
    <AppIcon :src="require(`@/assets/svg/${icon}`)" class="h-[24px]" />
  </a>
</template>

<script lang="ts" setup>
import { PropType, Ref, defineProps, ref } from 'vue';
import { SocialIcon } from '@/enums/social-icon';
import AppIcon from '@/components/Base/AppIcon.vue';

const props = defineProps({
  name: {
    type: String as PropType<SocialIcon>,
    required: true,
  },
});

const iconNameFileMap: Record<SocialIcon, string> = {
  [SocialIcon.GITHUB]: 'github.svg',
  [SocialIcon.TWITTER]: 'twitter.svg',
};

const iconNameLinkMap: Record<SocialIcon, string> = {
  [SocialIcon.GITHUB]: 'https://github.com/sobekcore/blackdesertmarket',
  [SocialIcon.TWITTER]: 'https://twitter.com/sobekcore',
};

const icon: Ref<string> = ref(iconNameFileMap[props.name]);
const link: Ref<string> = ref(iconNameLinkMap[props.name]);
</script>

<style lang="scss" scoped>
a {
  @apply rounded p-1 hocus:bg-dark-600;
  transition: background 100ms ease-in;
}
</style>
