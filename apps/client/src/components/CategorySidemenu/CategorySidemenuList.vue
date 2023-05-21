<template>
  <ul class="flex flex-col gap-0.5 p-0.5">
    <CategorySidemenuItem
      :ref="(component) => (volatilePriceItems = component?.$el)"
      :title="translate('sidemenu.volatilePriceItems')"
      icon="other/volatile-price-items.png"
      :active="volatilePriceItemsActive"
      @effect="volatilePriceItemsEffect"
    />
    <CategorySidemenuItem
      :ref="(component) => (inRegistrationQueue = component?.$el)"
      :title="translate('sidemenu.inRegistrationQueue')"
      icon="other/in-registration-queue.png"
      :active="inRegistrationQueueActive"
      @effect="inRegistrationQueueEffect"
    />
    <template v-for="category in categories" :key="category.mainCategory">
      <CategorySidemenuItem
        :ref="(component) => (items[category.mainCategory] = component?.$el)"
        data-test="config"
        :title="translate(category.title)"
        :icon="category.icon"
        :active="activeMainCategory === category.mainCategory"
        @effect="categorySidemenuItemEffect(category.mainCategory)"
      >
        <template #after="after">
          <ul v-if="category.subCategories" v-show="after.active" class="mt-0.5 flex flex-col gap-0.5">
            <template v-if="category.subCategories.length">
              <template v-for="subCategory in category.subCategories" :key="subCategory.subCategory">
                <CategorySidemenuSubItem
                  :title="translate(subCategory.title)"
                  :main-category="category.mainCategory"
                  :sub-category="subCategory.subCategory"
                  @effect="categorySidemenuSubItemEffect(category.mainCategory)"
                />
              </template>
            </template>
            <li v-else class="py-3 px-6 text-sm text-dark-800">
              {{ translate('sidemenu.emptyCategory') }}
            </li>
          </ul>
        </template>
      </CategorySidemenuItem>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { ComputedRef, Ref, computed, defineEmits, ref } from 'vue';
import { RouteLocationNamedRaw, Router, useLink, useRouter } from 'vue-router';
import { MarketCategoriesConfigCategory } from '@/interfaces/market-config';
import { MarketCategoriesConfigKey, TranslateKey, useInject } from '@/composables/use-inject';
import CategorySidemenuItem from '@/components/CategorySidemenu/CategorySidemenuItem.vue';
import CategorySidemenuSubItem from '@/components/CategorySidemenu/CategorySidemenuSubItem.vue';

const emit = defineEmits({
  effect: null,
  navigate: null,
});

const translate = useInject(TranslateKey);
const marketCategoriesConfig = useInject(MarketCategoriesConfigKey);
const router: Router = useRouter();

const volatilePriceItems: Ref<HTMLElement | null> = ref(null);
const inRegistrationQueue: Ref<HTMLElement | null> = ref(null);
const items: Ref<Record<number, HTMLElement>> = ref({});

const categories: Ref<MarketCategoriesConfigCategory[]> = ref(marketCategoriesConfig.categories);
const activeMainCategory: Ref<number | null> = ref(null);

/**
 * Volatile Price Items
 */
const volatilePriceItemsRoute: RouteLocationNamedRaw = { name: 'hot' };
const { isActive: volatilePriceItemsActiveRoute } = useLink({ to: volatilePriceItemsRoute });

const volatilePriceItemsActive: ComputedRef<boolean> = computed((): boolean => {
  return !activeMainCategory.value && volatilePriceItemsActiveRoute.value;
});

const volatilePriceItemsEffect = (): void => {
  router.push(volatilePriceItemsRoute);
  activeMainCategory.value = null;

  if (volatilePriceItems.value) {
    emit('effect', volatilePriceItems.value);
  }
};

/**
 * In Registration Queue
 */
const inRegistrationQueueRoute: RouteLocationNamedRaw = { name: 'queue' };
const { isActive: inRegistrationQueueActiveRoute } = useLink({ to: inRegistrationQueueRoute });

const inRegistrationQueueActive: ComputedRef<boolean> = computed((): boolean => {
  return !activeMainCategory.value && inRegistrationQueueActiveRoute.value;
});

const inRegistrationQueueEffect = (): void => {
  router.push(inRegistrationQueueRoute);
  activeMainCategory.value = null;

  if (inRegistrationQueue.value) {
    emit('effect', inRegistrationQueue.value);
  }
};

/**
 * Injected from marketCategoriesConfig
 */
const categorySidemenuItemEffect = (mainCategory: number): void => {
  const isAlreadyActive = activeMainCategory.value === mainCategory;
  activeMainCategory.value = !isAlreadyActive ? mainCategory : null;

  if (activeMainCategory.value) {
    emit('effect', items.value[activeMainCategory.value]);
  }
};

const categorySidemenuSubItemEffect = (mainCategory: number): void => {
  activeMainCategory.value = mainCategory;
  emit('navigate');
};
</script>
