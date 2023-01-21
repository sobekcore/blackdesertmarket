import { BlackDesertItemDetails, BlackDesertItemDetailsAvailability } from '@blackdesertmarket/interfaces';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';

export interface UseItemAvailabilityReturn {
  getOnePrice(): string;
  getSellCount(): string;
  getBuyCount(): string;
  getBackgroundClass(): string;
  getTextClass(): string;
}

export function useItemAvailability(
  itemDetails: BlackDesertItemDetails,
  itemAvailability: BlackDesertItemDetailsAvailability,
): UseItemAvailabilityReturn {
  const numberFormat: UseNumberFormatReturn = useNumberFormat();

  const getOnePrice = (): string => {
    return numberFormat.format(itemAvailability.onePrice);
  };

  const getSellCount = (): string => {
    if (itemAvailability.sellCount === 0) {
      return '';
    }

    return `Listed: ${itemAvailability.sellCount}`;
  };

  const getBuyCount = () => {
    if (itemAvailability.buyCount === 0) {
      return '';
    }

    return `Orders: ${itemAvailability.buyCount}`;
  };

  const getBackgroundClass = (): string => {
    if (itemAvailability.sellCount > 0) {
      return 'bg:item-availability-1';
    }

    if (itemAvailability.sellCount === 0) {
      return 'bg:item-availability-2';
    }

    return 'bg-dark-500';
  };

  const getTextClass = (): string => {
    if (itemAvailability.onePrice > itemDetails.basePrice) {
      return 'text:item-availability-1';
    }

    if (itemAvailability.onePrice < itemDetails.basePrice) {
      return 'text:item-availability-2';
    }

    return 'text-dark-900';
  };

  return {
    getOnePrice,
    getSellCount,
    getBuyCount,
    getBackgroundClass,
    getTextClass,
  };
}
