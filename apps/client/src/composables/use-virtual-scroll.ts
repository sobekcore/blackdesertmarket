type VirtualScrollItem<T> = T & VirtualScrollItemAdditional;

type VirtualScrollItemAdditional = { size: number };

export interface UseVirtualScrollReturn {
  prepareData<T extends {}>(data: T[], height: number, gap: number): VirtualScrollItem<T>[];
}

export function useVirtualScroll(): UseVirtualScrollReturn {
  const prepareData = <T extends {}>(data: T[], height: number, gap: number = 0): VirtualScrollItem<T>[] => {
    return data.map((element: T, index: number): VirtualScrollItem<T> => {
      return Object.assign<T, VirtualScrollItemAdditional>(element, {
        size: index === data.length - 1 ? height : height + gap,
      });
    });
  };

  return {
    prepareData,
  };
}
