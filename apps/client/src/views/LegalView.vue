<template>
  <div class="flex flex-col gap-12 p-8 sm:gap-16">
    <div class="flex justify-end">
      <FieldLanguageSelect v-model="language" @update:model-value="updateLanguageInStore" />
    </div>
    <AppLogo />
    <LegalSection :title="translate('legal.legalTitle')">
      <LegalDescription>
        {{ translate('legal.legalDescription') }}
      </LegalDescription>
    </LegalSection>
    <LegalSection :title="translate('legal.assetsTitle')">
      <LegalDescription>
        {{ translate('legal.assetsIcon') }}
        <AppLink url="https://www.reddit.com/r/blackdesertonline" />.
      </LegalDescription>
      <LegalDescription>
        {{ translate('legal.assetsLogo') }}
        <AppLink url="https://from_izumi.artstation.com/projects/kggb2" />.
      </LegalDescription>
    </LegalSection>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { Composer, useI18n } from 'vue-i18n';
import { useLocationStore } from '@/stores/location';
import { usePreferencesStore } from '@/stores/preferences';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppLink from '@/components/Base/AppLink.vue';
import AppLogo from '@/components/Base/AppLogo.vue';
import FieldLanguageSelect from '@/components/Fields/FieldLanguageSelect.vue';
import LegalDescription from '@/components/Legal/LegalDescription.vue';
import LegalSection from '@/components/Legal/LegalSection.vue';

const translate = useInject(TranslateKey);
const preferencesStore = usePreferencesStore();
const locationStore = useLocationStore();
const i18n: Composer = useI18n();

const language: Ref<string> = ref(preferencesStore.language);

const updateLanguageInStore = (): void => {
  preferencesStore.setLanguage(i18n, language.value);
  locationStore.reloadLayout();
};
</script>
