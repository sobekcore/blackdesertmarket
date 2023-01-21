import { BlackDesertItemTooltipSection } from '@blackdesertmarket/interfaces';

export interface UseItemTooltipSectionReturn {
  getSectionName(): string;
}

export function useItemTooltipSection(itemTooltipSection: BlackDesertItemTooltipSection): UseItemTooltipSectionReturn {
  const getSectionName = (): string => {
    return `– ${itemTooltipSection.name}`;
  };

  return {
    getSectionName,
  };
}
