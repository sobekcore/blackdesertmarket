import { ComposableException } from '@/exceptions/composable-exception';

export interface UseColorReturn {
  hexToRGB(color: string, opacity?: string): string;
}

export function useColor(): UseColorReturn {
  const hexToRGB = (color: string, opacity?: string): string => {
    if (!color.match(/#\w{6}/)) {
      throw new ComposableException('Provided color does not use a valid hex format');
    }

    const hex: number = parseInt(color.replace('#', ''), 16);
    const r: number = (hex >> 16) & 255;
    const g: number = (hex >> 8) & 255;
    const b: number = hex & 255;

    if (opacity) {
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
  };

  return {
    hexToRGB,
  };
}
