import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { MarketEnhancementConfigFeverEnhancementLevel } from '@/interfaces/market-config';
import marketEnhancementConfig from '@/configs/market-enhancement.config';

export interface UseItemTypeReturn {
  isItemPRI(): boolean;
  isItemDUO(): boolean;
  isItemTRI(): boolean;
  isItemTET(): boolean;
  isItemPEN(): boolean;
}

export function useItemType(itemType: BlackDesertItemType): UseItemTypeReturn {
  const isItemAccessory = (): boolean => {
    return itemType.mainCategory === 20;
  };

  const isItemWithFewerEnhancementLevels = (): boolean => {
    const found: MarketEnhancementConfigFeverEnhancementLevel | undefined =
      marketEnhancementConfig.feverEnhancementLevels.find(
        (enhancement: MarketEnhancementConfigFeverEnhancementLevel): boolean => {
          return enhancement.mainCategory === itemType.mainCategory;
        },
      );

    if (!found) {
      return false;
    }

    return found.items.includes(itemType.id);
  };

  const isItemPRI = (): boolean => {
    if (isItemAccessory() || isItemWithFewerEnhancementLevels()) {
      return itemType.enhancement === 1;
    }

    return itemType.enhancement === 16;
  };

  const isItemDUO = (): boolean => {
    if (isItemAccessory() || isItemWithFewerEnhancementLevels()) {
      return itemType.enhancement === 2;
    }

    return itemType.enhancement === 17;
  };

  const isItemTRI = (): boolean => {
    if (isItemAccessory() || isItemWithFewerEnhancementLevels()) {
      return itemType.enhancement === 3;
    }

    return itemType.enhancement === 18;
  };

  const isItemTET = (): boolean => {
    if (isItemAccessory() || isItemWithFewerEnhancementLevels()) {
      return itemType.enhancement === 4;
    }

    return itemType.enhancement === 19;
  };

  const isItemPEN = (): boolean => {
    if (isItemAccessory() || isItemWithFewerEnhancementLevels()) {
      return itemType.enhancement === 5;
    }

    return itemType.enhancement === 20;
  };

  return {
    isItemPRI,
    isItemDUO,
    isItemTRI,
    isItemTET,
    isItemPEN,
  };
}
