import { BlackDesertItemDetails, BlackDesertItemDetailsExtended } from '@blackdesertmarket/interfaces';
import { UseDateFormatReturn, useDateFormat } from '@vueuse/core';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';

export interface UseItemDetailsReturn {
  getBasePrice(): string;
  getSellCount(): string;
  getRecentPrice(): string;
  getRecentTransaction(): string;
}

export function useItemDetails(itemDetails: BlackDesertItemDetails | BlackDesertItemDetailsExtended) {
  const numberFormat: UseNumberFormatReturn = useNumberFormat();

  const getBasePrice = (): string => {
    return numberFormat.format(itemDetails.basePrice);
  };

  const getSellCount = (): string => {
    return `${itemDetails.sellCount}`;
  };

  const getRecentPrice = (): string => {
    const itemDetailsExtended = itemDetails as BlackDesertItemDetailsExtended;

    if (!itemDetailsExtended.recentPrice) {
      return '';
    }

    return numberFormat.format(itemDetailsExtended.recentPrice);
  };

  const getRecentTransaction = (): string => {
    const itemDetailsExtended = itemDetails as BlackDesertItemDetailsExtended;

    if (!itemDetailsExtended.recentTransaction) {
      return '';
    }

    const timeInMilliseconds: number = itemDetailsExtended.recentTransaction * 1000;
    const dateFormat: UseDateFormatReturn = useDateFormat(timeInMilliseconds, 'MM-DD HH:mm');

    return dateFormat.value;
  };

  return {
    getBasePrice,
    getSellCount,
    getRecentPrice,
    getRecentTransaction,
  };
}
