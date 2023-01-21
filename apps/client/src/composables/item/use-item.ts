import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';

export interface UseItemReturn {
  getBasePrice(): string;
}

export function useItem(item: BlackDesertItem): UseItemReturn {
  const numberFormat: UseNumberFormatReturn = useNumberFormat();

  const getBasePrice = (): string => {
    return numberFormat.format(item.basePrice);
  };

  return {
    getBasePrice,
  };
}
