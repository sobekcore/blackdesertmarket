import { ComposableException } from '@/exceptions/composable-exception';

export interface UseFluctuationTypeReturn {
  getClass(modifier?: string): string;
  getIcon(): string;
  getOperator(): string;
}

export function useFluctuationType(fluctuationType: number): UseFluctuationTypeReturn {
  const getClass = (modifier?: string): string => {
    switch (fluctuationType) {
      case 1:
        return modifier ? `${modifier}:fluctuation-type-1` : 'fluctuation-type-1';
      case 2:
        return modifier ? `${modifier}:fluctuation-type-2` : 'fluctuation-type-2';
    }

    throw new ComposableException(`Could not find class for fluctuation type ${fluctuationType}`);
  };

  const getIcon = (): string => {
    switch (fluctuationType) {
      case 1:
        return require('@/assets/images/fluctuation-type/1.png');
      case 2:
        return require('@/assets/images/fluctuation-type/2.png');
    }

    throw new ComposableException(`Could not find icon for fluctuation type ${fluctuationType}`);
  };

  const getOperator = (): string => {
    switch (fluctuationType) {
      case 1:
        return '-';
      case 2:
        return '+';
    }

    throw new ComposableException(`Could not find operator for fluctuation type ${fluctuationType}`);
  };

  return {
    getIcon,
    getClass,
    getOperator,
  };
}
