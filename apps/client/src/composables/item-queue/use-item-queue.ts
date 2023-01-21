import { ComputedRef } from 'vue';
import { BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { useDateFormat } from '@vueuse/core';

export interface UseItemQueueReturn {
  getEndTime(): string;
}

export function useItemQueue(itemQueue: BlackDesertItemQueue): UseItemQueueReturn {
  const getEndTime = (): string => {
    const dateFormat: ComputedRef<string> = useDateFormat(itemQueue.endTime, 'MM-DD HH:mm');
    return dateFormat.value;
  };

  return {
    getEndTime,
  };
}
