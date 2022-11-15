import { BlackDesertItemDetails, BlackDesertItemDetailsAvailability } from '@blackdesertmarket/interfaces';

export interface UseItemAvailabilityReturn {
  getBackgroundClass(): string;
  getTextClass(): string;
}

export function useItemAvailability(
  itemDetails: BlackDesertItemDetails,
  itemAvailability: BlackDesertItemDetailsAvailability,
): UseItemAvailabilityReturn {
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
    getBackgroundClass,
    getTextClass,
  };
}
