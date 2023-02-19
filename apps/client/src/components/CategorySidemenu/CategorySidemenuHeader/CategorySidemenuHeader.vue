<template>
  <div class="flex flex-col">
    <div class="p-4 pb-0">
      <AppLogo />
    </div>
    <div class="flex flex-wrap items-center gap-4 p-4">
      <CategorySidemenuHeaderSection :title="translate('header.language')">
        <FieldLanguageSelect v-model="language" @update:model-value="updateLanguageInStore" />
      </CategorySidemenuHeaderSection>
      <CategorySidemenuHeaderSection :title="translate('header.region')">
        <FieldRegionSelect v-model="region" @update:model-value="updateRegionInStore" />
      </CategorySidemenuHeaderSection>
      <CategorySidemenuHeaderSection :title="translate('header.social')">
        <div class="flex gap-2">
          <AppSocialIcon :name="SocialIcon.GITHUB" />
          <AppSocialIcon :name="SocialIcon.TWITTER" />
        </div>
      </CategorySidemenuHeaderSection>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { Composer, useI18n } from 'vue-i18n';
import { SocialIcon } from '@/enums/social-icon';
import { useLocationStore } from '@/stores/location';
import { usePreferencesStore } from '@/stores/preferences';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppLogo from '@/components/Base/AppLogo.vue';
import AppSocialIcon from '@/components/Base/AppSocialIcon.vue';
import CategorySidemenuHeaderSection from '@/components/CategorySidemenu/CategorySidemenuHeader/CategorySidemenuHeaderSection.vue';
import FieldLanguageSelect from '@/components/Fields/FieldLanguageSelect.vue';
import FieldRegionSelect from '@/components/Fields/FieldRegionSelect.vue';

const translate = useInject(TranslateKey);
const preferencesStore = usePreferencesStore();
const locationStore = useLocationStore();
const i18n: Composer = useI18n();

const region: Ref<string> = ref(preferencesStore.region);
const language: Ref<string> = ref(preferencesStore.language);

const updateRegionInStore = (): void => {
  preferencesStore.region = region.value;
  locationStore.reloadLayout();
};

const updateLanguageInStore = (): void => {
  preferencesStore.setLanguage(i18n, language.value);
  locationStore.reloadLayout();
};
</script>
