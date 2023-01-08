<template>
  <div class="w-[320px]">
    <div data-test="category" class="mb-0.5 text-right text-xs">{{ props.itemTooltip.category }}</div>
    <div data-test="name" class="mb-0.5 text-lg">{{ itemTypeComposable.getItemName() }}</div>
    <div class="flex gap-x-6">
      <ListItemIcon :src="itemIcon.href" :text="itemTypeComposable.getItemIconText()" />
      <div class="tooltip-properties grid items-center gap-x-3">
        <ListItemTooltipProperty
          v-if="props.itemTooltip.damage"
          data-test="damage"
          label="AP"
          :value="props.itemTooltip.damage"
          class="text-2xl leading-7"
        />
        <ListItemTooltipProperty
          v-if="props.itemTooltip.defense"
          data-test="defense"
          label="DP"
          :value="props.itemTooltip.defense"
          class="text-2xl leading-7"
        />
        <ListItemTooltipProperty
          v-if="props.itemTooltip.accuracy"
          data-test="accuracy"
          label="Accuracy"
          :value="props.itemTooltip.accuracy"
          class="text-lg leading-6"
        />
        <ListItemTooltipProperty
          v-if="props.itemTooltip.weight"
          data-test="weight"
          label="Weight"
          :value="itemTooltipComposable.getItemWeight()"
        />
      </div>
    </div>
    <div class="mt-1.5 flex flex-col gap-1.5">
      <template v-for="section in props.itemTooltip.sections" :key="section.id">
        <ListItemTooltipSection
          :item-tooltip-section="section"
          :format-name="itemTooltipComposable.getSectionFormatName(section.id)"
          :format-value="itemTooltipComposable.getSectionFormatValue(section.id)"
          :class="itemTooltipComposable.getSectionClass(section.id)"
          :name-class="itemTooltipComposable.getSectionNameClass(section.id)"
          :value-class="itemTooltipComposable.getSectionValueClass(section.id)"
        />
        <template v-if="section.id === centralMarketInformationId">
          <ListItemTooltipSection
            :item-tooltip-section="getCentralMarketInformationData()"
            :class="itemTooltipComposable.getSectionClass(ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION)"
            :name-class="itemTooltipComposable.getSectionNameClass(ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION)"
            :value-class="itemTooltipComposable.getSectionValueClass(ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION)"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, Ref, defineProps, ref } from 'vue';
import {
  BlackDesertItemTooltip,
  BlackDesertItemTooltipSection,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { ItemTooltipSectionId } from '@/enums/item-tooltip';
import { UseConfigReturn, useConfig } from '@/composables/use-config';
import { UseItemReturn, useItem } from '@/composables/use-item';
import { UseItemTooltipReturn, useItemTooltip } from '@/composables/use-item-tooltip';
import { UseItemTypeReturn, useItemType } from '@/composables/use-item-type';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemTooltipProperty from '@/components/ListItem/ListItemTooltip/ListItemTooltipProperty.vue';
import ListItemTooltipSection from '@/components/ListItem/ListItemTooltip/ListItemTooltipSection.vue';

const props = defineProps({
  itemType: {
    type: Object as PropType<BlackDesertItemType>,
    required: true,
  },
  itemTooltip: {
    type: Object as PropType<BlackDesertItemTooltip>,
    required: true,
  },
});

const config: UseConfigReturn = useConfig();
const itemComposable: UseItemReturn = useItem(props.itemType);
const itemTypeComposable: UseItemTypeReturn = useItemType(props.itemType);
const itemTooltipComposable: UseItemTooltipReturn = useItemTooltip(props.itemTooltip);

const itemIcon: Ref<URL> = ref(new URL(`/item/${props.itemType.id}/icon`, config.marketApiUrl));
const centralMarketInformationId: Ref<string> = ref('');

const centralMarketInformationOrder: ItemTooltipSectionId[] = [
  ItemTooltipSectionId.ENHANCEMENT_TYPE,
  ItemTooltipSectionId.PERSONAL_TRANSACTION,
];

const getCentralMarketInformationData = (): BlackDesertItemTooltipSection => {
  return {
    id: ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION,
    name: 'Central Market Information',
    values: [`Market Price: ${itemComposable.getBasePrice()}`, 'Warehouse Capacity: —'],
  };
};

if (!centralMarketInformationId.value) {
  for (const sectionId of centralMarketInformationOrder) {
    const itemTooltipSection: BlackDesertItemTooltipSection | undefined = props.itemTooltip.sections.find(
      (section: BlackDesertItemTooltipSection): boolean => section.id === sectionId,
    );

    if (itemTooltipSection) {
      centralMarketInformationId.value = itemTooltipSection.id;
      break;
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-properties {
  grid-template-columns: auto 1fr;
}
</style>
