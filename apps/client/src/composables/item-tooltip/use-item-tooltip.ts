import { BlackDesertItemTooltip } from '@blackdesertmarket/interfaces';
import { ItemTooltipSectionId } from '@/enums/item-tooltip';

export type FormatNameFunction = (name: string) => string;

export type FormatValueFunction = (value: string) => string;

export interface UseItemTooltipReturn {
  getItemWeight(): string;
  getSectionFormatName(sectionId: string): FormatNameFunction;
  getSectionFormatValue(sectionId: string): FormatValueFunction;
  getSectionClass(sectionId: string): string;
  getSectionNameClass(sectionId: string): string;
  getSectionValueClass(sectionId: string): string;
}

export function useItemTooltip(itemTooltip: BlackDesertItemTooltip): UseItemTooltipReturn {
  const getItemWeight = (): string => {
    return `${itemTooltip.weight} LT`;
  };

  const getSectionFormatName = (sectionId: string): FormatNameFunction => {
    switch (sectionId) {
      case ItemTooltipSectionId.ENHANCEMENT_TYPE:
      case ItemTooltipSectionId.DESCRIPTION:
      case ItemTooltipSectionId.PRICE:
        return (name: string): string => `${name}:`;
      default:
        return (name: string): string => name;
    }
  };

  const getSectionFormatValue = (sectionId: string): FormatValueFunction => {
    switch (sectionId) {
      case ItemTooltipSectionId.PRICE:
        return (value: string): string => (value === 'N/A' ? value : `Silver ${value}`);
      default:
        return (value: string): string => value;
    }
  };

  const getSectionClass = (sectionId: string): string => {
    switch (sectionId) {
      case ItemTooltipSectionId.ENHANCEMENT_TYPE:
      case ItemTooltipSectionId.DESCRIPTION:
        return 'inline-name-values';
      case ItemTooltipSectionId.CLASS_EXCLUSIVE:
      case ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION:
        return 'bg-lighten-xs';
      case ItemTooltipSectionId.PRICE:
        return 'inline-name-values bg-lighten-xs';
      case ItemTooltipSectionId.DURABILITY:
        return 'durability';
      default:
        return '';
    }
  };

  const getSectionNameClass = (sectionId: string): string => {
    switch (sectionId) {
      case ItemTooltipSectionId.ENHANCEMENT_TYPE:
      case ItemTooltipSectionId.CENTRAL_MARKET_INFORMATION:
        return 'text-brand-900';
      case ItemTooltipSectionId.DESCRIPTION:
      case ItemTooltipSectionId.ITEM_EFFECT:
      case ItemTooltipSectionId.ENHANCEMENT_EFFECT:
      case ItemTooltipSectionId.SPECIAL_EFFECT:
      case ItemTooltipSectionId.SET_EFFECT:
        return 'text-brand-800';
      case ItemTooltipSectionId.PRICE:
        return 'text-dark-800';
      default:
        return '';
    }
  };

  const getSectionValueClass = (sectionId: string): string => {
    switch (sectionId) {
      case ItemTooltipSectionId.ENHANCEMENT_TYPE:
        return 'text-brand-900';
      case ItemTooltipSectionId.DESCRIPTION:
        return 'text-brand-800';
      case ItemTooltipSectionId.ITEM_EFFECT:
      case ItemTooltipSectionId.ENHANCEMENT_EFFECT:
      case ItemTooltipSectionId.SPECIAL_EFFECT:
      case ItemTooltipSectionId.SET_EFFECT:
        return 'text-item-stat-highlight';
      case ItemTooltipSectionId.PRICE:
        return 'text-item-price';
      default:
        return '';
    }
  };

  return {
    getItemWeight,
    getSectionFormatName,
    getSectionFormatValue,
    getSectionClass,
    getSectionNameClass,
    getSectionValueClass,
  };
}
