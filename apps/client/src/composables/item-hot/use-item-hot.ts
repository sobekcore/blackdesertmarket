import { BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { UseFluctuationTypeReturn, useFluctuationType } from '@/composables/item-hot/use-fluctuation-type';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';

export interface UseItemHotReturn {
  getFluctuationPrice(): string;
}

export function useItemHot(itemHot: BlackDesertItemHot): UseItemHotReturn {
  const numberFormat: UseNumberFormatReturn = useNumberFormat();

  const getFluctuationPrice = (): string => {
    const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(itemHot.fluctuationType);
    const operator: string = fluctuationType.getOperator();
    const price: string = numberFormat.format(itemHot.fluctuationPrice);

    return `${operator}${price}`;
  };

  return {
    getFluctuationPrice,
  };
}
