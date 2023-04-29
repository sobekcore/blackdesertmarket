<template>
  <AppTooltip
    placement="right-start"
    :disabled="!props.item"
    :class="itemGradeClass"
    show-on-click
    @show="handleTooltipShow"
  >
    <span class="relative flex h-[46px] w-[46px] items-center">
      <AppIcon :src="props.src" :class="props.class" class="h-full w-full rounded border border-dark-600 bg-dark-100" />
      <span role="presentation" aria-hidden="true" class="text-over-icon">
        {{ text }}
      </span>
    </span>
    <template #popper>
      <ListItemTooltip v-if="itemType && itemTooltip" :item-type="itemType" :item-tooltip="itemTooltip" />
      <AppLoader v-else />
    </template>
  </AppTooltip>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, Ref, computed, defineProps, ref } from 'vue';
import { BlackDesertItem, BlackDesertItemTooltip, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { isValidBlackDesertItemType } from '@blackdesertmarket/objects';
import { VueAttributeClass } from '@/types/attributes-vue';
import { HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { UseItemTypeFetchReturn, useItemTypeFetch } from '@/composables/item-type/use-item-type-fetch';
import { useMarketApi } from '@/composables/use-market-api';
import AppIcon from '@/components/Base/AppIcon.vue';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import AppTooltip from '@/components/Base/AppTooltip.vue';
import ListItemTooltip from '@/components/ListItem/ListItemTooltip/ListItemTooltip.vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  item: {
    type: Object as PropType<BlackDesertItem>,
  },
  text: {
    type: String,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});

const preferencesStore = usePreferencesStore();

const sent: Ref<boolean> = ref(false);
const loaded: Ref<boolean> = ref(false);

const itemType: Ref<BlackDesertItemType | null> = ref(null);
const itemTooltip: Ref<BlackDesertItemTooltip | null> = ref(null);

const itemGradeClass: ComputedRef<string> = computed((): string => {
  if (!loaded.value || !itemType.value || !itemType.value.grade) {
    return 'tooltip:item-default';
  }

  return `tooltip:item-grade-${itemType.value.grade}`;
});

/**
 * TODO: Call this function only when user has hovered on ListItemIcon for some time
 */
const handleTooltipShow = async (): Promise<void> => {
  if (!props.item || sent.value) {
    return;
  }

  sent.value = true;

  if (!isValidBlackDesertItemType(props.item)) {
    const itemTypeFetch: UseItemTypeFetchReturn = useItemTypeFetch(props.item.id);
    itemType.value = await itemTypeFetch.fetchBaseType();
  } else {
    itemType.value = props.item as BlackDesertItemType;
  }

  if (!itemType.value) {
    return;
  }

  const marketApi = useMarketApi<BlackDesertItemTooltip>(
    HttpMethod.GET,
    `/item/${itemType.value.id}/${itemType.value.enhancement}/tooltip`,
    {
      language: preferencesStore.getLanguage,
    },
  );

  const response = await marketApi.execute();

  if (response.data.value) {
    itemTooltip.value = response.data.value.data;
    loaded.value = true;
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.text-over-icon {
  @apply absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 select-none font-dejavu-sans-condensed text-lg;
  text-shadow: 0 0 1px $ITEM_ICON_HIGHLIGHT, 0 0 2px $ITEM_ICON_HIGHLIGHT, 0 0 3px $ITEM_ICON_HIGHLIGHT,
    0 0 4px $ITEM_ICON_HIGHLIGHT, 0 0 5px $ITEM_ICON_HIGHLIGHT, 0 0 6px $ITEM_ICON_HIGHLIGHT;
}
</style>
