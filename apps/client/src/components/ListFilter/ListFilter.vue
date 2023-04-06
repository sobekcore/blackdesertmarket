<template>
  <form class="flex flex-col gap-2 p-2.5" @submit.prevent="handleSubmit">
    <div class="border-lighten w-full rounded border-t bg-dark-400 py-1.5 px-2 shadow-md">
      <div class="list-filter-main grid grid-flow-col gap-2">
        <ListFilterButton @click="updateButtonSearchState('searchContext')">
          <ListFilterButtonContent :icon="require('@/assets/images/list-filter/filter.png')" icon-class="h-[16px]">
            <template v-if="state.searchContext === ListFilterButtonSearchState.ALL">
              {{ translate('listFilter.all') }}
            </template>
            <template v-else-if="state.searchContext === ListFilterButtonSearchState.BY_CATEGORY">
              {{ translate('listFilter.byCategory') }}
            </template>
          </ListFilterButtonContent>
        </ListFilterButton>
        <FieldSearchText
          v-model="state.search"
          :placeholder="translate('listFilter.itemName')"
          @change="updateFilterState"
        />
        <ListFilterButton
          :variant="ListFilterButtonVariant.LIGHT"
          :tooltip="`${translate('generic.comingSoon')}...`"
          disabled
        >
          {{ translate('listFilter.favorites') }}
        </ListFilterButton>
        <ListFilterButton
          :variant="ListFilterButtonVariant.BRAND"
          :tooltip="`${translate('generic.comingSoon')}...`"
          disabled
        >
          {{ translate('listFilter.status') }}
        </ListFilterButton>
      </div>
    </div>
    <div class="flex gap-2">
      <ListFilterButton :tooltip="translate('listFilter.sortCount')" @click="updateButtonSortState('sortCount')">
        <ListFilterButtonContent :icon="require('@/assets/images/list-filter/sort-count.png')" class="gap-4">
          <AppIcon :src="getListFilterButtonIcon(state.sortCount)" class="h-[20px] scale-125 drop-shadow-md" />
        </ListFilterButtonContent>
      </ListFilterButton>
      <ListFilterButton :tooltip="translate('listFilter.sortPrice')" @click="updateButtonSortState('sortPrice')">
        <ListFilterButtonContent :icon="require('@/assets/images/list-filter/sort-price.png')" class="gap-4">
          <AppIcon :src="getListFilterButtonIcon(state.sortPrice)" class="h-[20px] scale-125 drop-shadow-md" />
        </ListFilterButtonContent>
      </ListFilterButton>
      <ListFilterButton :tooltip="translate('listFilter.sortGrade')" @click="updateButtonSortState('sortGrade')">
        <ListFilterButtonContent :icon="require('@/assets/images/list-filter/sort-grade.png')" class="gap-4">
          <AppIcon :src="getListFilterButtonIcon(state.sortGrade)" class="h-[20px] scale-125 drop-shadow-md" />
        </ListFilterButtonContent>
      </ListFilterButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { defineEmits, defineExpose, reactive } from 'vue';
import { ListFilterData } from '@/interfaces/list-filter';
import { ListFilterButtonSearchState, ListFilterButtonSortState, ListFilterButtonVariant } from '@/enums/list-filter';
import { useDropdownIcon } from '@/composables/use-dropdown-icon';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppIcon from '@/components/Base/AppIcon.vue';
import FieldSearchText from '@/components/Fields/FieldSearchText.vue';
import { ListFilterExposed } from '@/components/ListFilter/ListFilter.d';
import ListFilterButton from '@/components/ListFilter/ListFilterButton.vue';
import ListFilterButtonContent from '@/components/ListFilter/ListFilterButtonContent.vue';

const emit = defineEmits({
  filter: null,
});

const translate = useInject(TranslateKey);

const state: ListFilterData = reactive({
  search: '',
  searchContext: ListFilterButtonSearchState.ALL,
  sortCount: ListFilterButtonSortState.DEFAULT,
  sortPrice: ListFilterButtonSortState.DEFAULT,
  sortGrade: ListFilterButtonSortState.DEFAULT,
});

const getListFilterButtonIcon = (state: ListFilterButtonSortState): string => {
  return useDropdownIcon(
    [ListFilterButtonSortState.DESC, ListFilterButtonSortState.ASC].includes(state),
    state === ListFilterButtonSortState.ASC,
  );
};

const updateButtonSearchState = (key: 'searchContext'): void => {
  if (state[key] === ListFilterButtonSearchState.ALL) {
    state[key] = ListFilterButtonSearchState.BY_CATEGORY;
  } else if (state[key] === ListFilterButtonSearchState.BY_CATEGORY) {
    state[key] = ListFilterButtonSearchState.ALL;
  }

  updateFilterState();
};

const updateButtonSortState = (key: 'sortCount' | 'sortPrice' | 'sortGrade'): void => {
  if (state[key] === ListFilterButtonSortState.DEFAULT) {
    state[key] = ListFilterButtonSortState.DESC;
  } else if (state[key] === ListFilterButtonSortState.DESC) {
    state[key] = ListFilterButtonSortState.ASC;
  } else if (state[key] === ListFilterButtonSortState.ASC) {
    state[key] = ListFilterButtonSortState.DEFAULT;
  }

  updateFilterState();
};

const updateFilterState = (): void => {
  emit('filter', state);
};

const resetFilterState = (): void => {
  state.search = '';
  state.searchContext = ListFilterButtonSearchState.ALL;
  state.sortCount = ListFilterButtonSortState.DEFAULT;
  state.sortPrice = ListFilterButtonSortState.DEFAULT;
  state.sortGrade = ListFilterButtonSortState.DEFAULT;

  updateFilterState();
};

const handleSubmit = (): void => {
  updateFilterState();
};

defineExpose<ListFilterExposed>({
  resetFilterState,
});
</script>

<style lang="scss" scoped>
.list-filter-main {
  grid-template-columns: 2fr 3fr 2fr 2fr;
}
</style>
