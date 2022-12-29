import { ComposableException } from '@/exceptions/composable-exception';

export interface UseDocumentSizeReturn {
  pixelToRaw(size: string): number;
  remToRaw(size: string): number;
  remToPixel(size: string): string;
}

export function useDocumentSize(): UseDocumentSizeReturn {
  const pixelToRaw = (size: string): number => {
    if (!size.match(/\d+px/)) {
      throw new ComposableException('Provided size does not use a valid pixel format');
    }

    return Number(size.replace('px', ''));
  };

  const remToRaw = (size: string): number => {
    if (!size.match(/\d+rem/)) {
      throw new ComposableException('Provided size does not use a valid rem format');
    }

    const rem: number = Number(size.replace('rem', ''));
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
  };

  const remToPixel = (size: string): string => {
    if (!size.match(/\d+rem/)) {
      throw new ComposableException('Provided size does not use a valid rem format');
    }

    const raw: number = remToRaw(size);
    return `${raw}px`;
  };

  return {
    pixelToRaw,
    remToRaw,
    remToPixel,
  };
}
