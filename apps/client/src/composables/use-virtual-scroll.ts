type VirtualScrollItem<T> = T & VirtualScrollItemAdditional;

type VirtualScrollItemAdditional = { key: string; size: number };

type VirtualScrollKeyFunction<T> = (element: T) => string;

export interface UseVirtualScrollReturn<T> {
  prepareData(data: T[], key: VirtualScrollKeyFunction<T>, height: number, gap: number): VirtualScrollItem<T>[];
}

export function useVirtualScroll<T extends {}>(): UseVirtualScrollReturn<T> {
  const prepareData = (
    data: T[],
    key: VirtualScrollKeyFunction<T>,
    height: number,
    gap: number = 0,
  ): VirtualScrollItem<T>[] => {
    return data.map((element: T, index: number): VirtualScrollItem<T> => {
      return Object.assign<T, VirtualScrollItemAdditional>(element, {
        key: key(element),
        size: index === data.length - 1 ? height : height + gap,
      });
    });
  };

  return {
    prepareData,
  };
}
