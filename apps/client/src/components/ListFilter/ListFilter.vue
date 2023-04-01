<template>
  <form class="flex flex-col gap-2 p-2.5" @submit="handleSubmit">
    <div class="border-lighten w-full rounded border-t bg-dark-400 py-1.5 px-2 shadow-md">
      <div class="list-filter-main grid grid-flow-col gap-2">
        <ListFilterButton v-slot="slot" v-model="filter" :indeterminate="false" @update:model-value="updateFilterState">
          <ListFilterButtonContent :icon="require('@/assets/images/list-filter/filter.png')" icon-class="h-[16px]">
            <template v-if="slot.state === ListFilterButtonState.DESC">
              {{ translate('listFilter.all') }}
            </template>
            <template v-else-if="slot.state === ListFilterButtonState.ASC">
              {{ translate('listFilter.byCategory') }}
            </template>
          </ListFilterButtonContent>
        </ListFilterButton>
        <FieldSearchText v-model="search" :placeholder="translate('listFilter.itemName')" @change="updateFilterState" />
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
      <ListFilterButton
        v-slot="slot"
        v-model="sortCount"
        :tooltip="translate('listFilter.sortCount')"
        @update:model-value="updateFilterState"
      >
        <ListFilterButtonContent :icon="require('@/assets/images/list-filter/sort-count.png')" class="gap-4">
          <AppIcon :src="getListFilterButtonIcon(slot.state)" class="h-[20px] scale-125 drop-shadow-md" />
        </ListFilterButtonContent>
      </ListFilterButton>
      <ListFilterButton
        v-slot="slot"
        v-model="sortPrice"
        :tooltip="translate('listFilter.sortPrice')"
        @update:model-value="updateFilterState"
      >
        <ListFilterButtonContent :icon="require('@/assets/images/list-filter/sort-price.png')" class="gap-4">
          <AppIcon :src="getListFilterButtonIcon(slot.state)" class="h-[20px] scale-125 drop-shadow-md" />
        </ListFilterButtonContent>
      </ListFilterButton>
      <ListFilterButton
        v-slot="slot"
        v-model="sortGrade"
        :tooltip="translate('listFilter.sortGrade')"
        @update:model-value="updateFilterState"
      >
        <ListFilterButtonContent :icon="require('@/assets/images/list-filter/sort-grade.png')" class="gap-4">
          <AppIcon :src="getListFilterButtonIcon(slot.state)" class="h-[20px] scale-125 drop-shadow-md" />
        </ListFilterButtonContent>
      </ListFilterButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { Ref, defineEmits, ref } from 'vue';
import { ListFilterData } from '@/interfaces/list-filter';
import { ListFilterButtonState, ListFilterButtonVariant } from '@/enums/list-filter';
import { useDropdownIcon } from '@/composables/use-dropdown-icon';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppIcon from '@/components/Base/AppIcon.vue';
import FieldSearchText from '@/components/Fields/FieldSearchText.vue';
import ListFilterButton from '@/components/ListFilter/ListFilterButton.vue';
import ListFilterButtonContent from '@/components/ListFilter/ListFilterButtonContent.vue';

const emit = defineEmits({
  filter: null,
});

const translate = useInject(TranslateKey);

const search: Ref<string> = ref('');
const filter: Ref<ListFilterButtonState> = ref(ListFilterButtonState.DESC);
const sortCount: Ref<ListFilterButtonState> = ref(ListFilterButtonState.DEFAULT);
const sortPrice: Ref<ListFilterButtonState> = ref(ListFilterButtonState.DEFAULT);
const sortGrade: Ref<ListFilterButtonState> = ref(ListFilterButtonState.DEFAULT);

const getListFilterButtonIcon = (state: ListFilterButtonState): string => {
  return useDropdownIcon(
    [ListFilterButtonState.DESC, ListFilterButtonState.ASC].includes(state),
    state === ListFilterButtonState.ASC,
  );
};

const updateFilterState = (): void => {
  const listFilterData: ListFilterData = {
    search: search.value,
    sortCount: sortCount.value,
    sortPrice: sortPrice.value,
    sortGrade: sortGrade.value,
  };

  emit('filter', listFilterData);
};

const handleSubmit = (event: SubmitEvent): void => {
  event.preventDefault();
  updateFilterState();
};
</script>

<style lang="scss" scoped>
.list-filter-main {
  grid-template-columns: 2fr 3fr 2fr 2fr;
}
</style>
