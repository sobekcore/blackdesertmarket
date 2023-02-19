<template>
  <div class="w-[320px]">
    <div data-test="category" class="item-tooltip-category">
      {{ props.itemTooltip.category }}
    </div>
    <ListItemName :name="itemTypeComposable.getItemName()" :class="itemGradeText" />
    <div class="flex gap-x-3">
      <ListItemIcon :src="itemIcon.href" :text="itemTypeComposable.getItemIconText()" :class="itemGradeBorder" />
      <div class="flex flex-col justify-center gap-x-3">
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
          :label="translate('tooltip.accuracy')"
          :value="props.itemTooltip.accuracy"
          class="text-lg leading-6"
        />
        <ListItemTooltipProperty
          v-if="props.itemTooltip.evasion"
          data-test="evasion"
          :label="translate('tooltip.evasion')"
          :value="props.itemTooltip.evasion"
        />
        <ListItemTooltipProperty
          v-if="props.itemTooltip.evasion"
          data-test="damageReduction"
          :label="translate('tooltip.damageReduction')"
          :value="props.itemTooltip.evasion"
        />
        <ListItemTooltipProperty
          v-if="props.itemTooltip.weight"
          data-test="weight"
          :label="translate('tooltip.weight')"
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
        <ListItemTooltipSection
          v-if="section.id === centralMarketInformationId"
          :item-tooltip-section="getCentralMarketInformationData()"
          :class="itemTooltipComposable.getSectionClass(ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION)"
          :name-class="itemTooltipComposable.getSectionNameClass(ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION)"
          :value-class="itemTooltipComposable.getSectionValueClass(ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION)"
        />
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
import { UseItemTooltipReturn, useItemTooltip } from '@/composables/item-tooltip/use-item-tooltip';
import { UseItemTypeReturn, useItemType } from '@/composables/item-type/use-item-type';
import { UseItemReturn, useItem } from '@/composables/item/use-item';
import { TranslateKey, useInject } from '@/composables/use-inject';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';
import ListItemTooltipProperty from '@/components/ListItem/ListItemTooltip/ListItemTooltipProperty.vue';
import ListItemTooltipSection from '@/components/ListItem/ListItemTooltip/ListItemTooltipSection.vue';
import { config } from '@/config';

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

const translate = useInject(TranslateKey);
const itemComposable: UseItemReturn = useItem(props.itemType);
const itemTypeComposable: UseItemTypeReturn = useItemType(props.itemType);
const itemTooltipComposable: UseItemTooltipReturn = useItemTooltip(props.itemTooltip);

const itemIcon: Ref<URL> = ref(new URL(`/item/${props.itemType.id}/icon`, config.marketApiUrl));
const itemGradeText: Ref<string> = ref('mb-0.5 text-lg');
const itemGradeBorder: Ref<string> = ref('');
const centralMarketInformationId: Ref<string> = ref('');

const centralMarketInformationOrder: ItemTooltipSectionId[] = [
  ItemTooltipSectionId.ENHANCEMENT_TYPE,
  ItemTooltipSectionId.PERSONAL_TRANSACTION,
];

const getCentralMarketInformationData = (): BlackDesertItemTooltipSection => {
  const centralMarketInformation: string = translate('tooltip.centralMarketInformation');
  const marketPrice: string = translate('tooltip.marketPrice');
  const warehouseCapacity: string = translate('generic.warehouseCapacity');

  return {
    id: ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION,
    name: centralMarketInformation,
    values: [`${marketPrice}: ${itemComposable.getBasePrice()}`, `${warehouseCapacity}: —`],
  };
};

if (props.itemType.grade) {
  itemGradeText.value = `mb-0.5 text-lg text:item-grade-${props.itemType.grade}`;
  itemGradeBorder.value = `border:item-grade-${props.itemType.grade}`;
}

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
@import '@/styles/variables.scss';

.item-tooltip-category {
  @apply mb-0.5 text-right text-xs text-item-category;
  text-shadow: 1px 1px 1px $DARK_100;
}
</style>
