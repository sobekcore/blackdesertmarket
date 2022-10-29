import { ComposableException } from '@/exceptions/composable-exception';

export interface UseFluctuationTypeReturn {
  getClass(fluctuationType: number, modifier?: string): string;
  getIcon(fluctuationType: number): string;
  getOperator(fluctuationType: number): string;
}

export function useFluctuationType(): UseFluctuationTypeReturn {
  const getClass = (fluctuationType: number, modifier?: string): string => {
    switch (fluctuationType) {
      case 1:
        return modifier ? `${modifier}:fluctuation-type-1` : 'fluctuation-type-1';
      case 2:
        return modifier ? `${modifier}:fluctuation-type-2` : 'fluctuation-type-2';
    }

    throw new ComposableException(`Could not find class for fluctuation type ${fluctuationType}`);
  };

  const getIcon = (fluctuationType: number): string => {
    switch (fluctuationType) {
      case 1:
        return require('@/assets/images/fluctuation-type/1.png');
      case 2:
        return require('@/assets/images/fluctuation-type/2.png');
    }

    throw new ComposableException(`Could not find icon for fluctuation type ${fluctuationType}`);
  };

  const getOperator = (fluctuationType: number): string => {
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
