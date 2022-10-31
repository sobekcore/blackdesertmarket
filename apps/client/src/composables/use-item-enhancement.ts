import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { ItemEnhancementName, ItemEnhancementShortName } from '@/enums/item-enhancement';
import { UseItemTypeReturn, useItemType } from '@/composables/use-item-type';

export interface ItemEnhancementNameData {
  name: string;
  short: string;
  advanced: boolean;
}

export interface UseItemEnhancementReturn {
  getName(): ItemEnhancementNameData;
}

export function useItemEnhancement(itemType: BlackDesertItemType): UseItemEnhancementReturn {
  const itemTypeComposable: UseItemTypeReturn = useItemType(itemType);

  const getName = (): ItemEnhancementNameData => {
    if (!itemType.enhancement) {
      return {
        name: '',
        short: '',
        advanced: false,
      };
    }

    if (itemTypeComposable.isItemPRI()) {
      return {
        name: ItemEnhancementName.PRI,
        short: ItemEnhancementShortName.PRI,
        advanced: true,
      };
    }

    if (itemTypeComposable.isItemDUO()) {
      return {
        name: ItemEnhancementName.DUO,
        short: ItemEnhancementShortName.DUO,
        advanced: true,
      };
    }

    if (itemTypeComposable.isItemTRI()) {
      return {
        name: ItemEnhancementName.TRI,
        short: ItemEnhancementShortName.TRI,
        advanced: true,
      };
    }

    if (itemTypeComposable.isItemTET()) {
      return {
        name: ItemEnhancementName.TET,
        short: ItemEnhancementShortName.TET,
        advanced: true,
      };
    }

    if (itemTypeComposable.isItemPEN()) {
      return {
        name: ItemEnhancementName.PEN,
        short: ItemEnhancementShortName.PEN,
        advanced: true,
      };
    }

    return {
      name: `+${itemType.enhancement}`,
      short: `+${itemType.enhancement}`,
      advanced: false,
    };
  };

  return {
    getName,
  };
}
