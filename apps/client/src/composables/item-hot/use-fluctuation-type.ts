import { ComposableException } from '@/exceptions/composable-exception';

export interface UseFluctuationTypeReturn {
  getBackgroundClass(): string;
  getIcon(): string;
  getOperator(): string;
}

export function useFluctuationType(fluctuationType: number): UseFluctuationTypeReturn {
  const getBackgroundClass = (): string => {
    switch (fluctuationType) {
      case 1:
        return 'bg:fluctuation-type-1';
      case 2:
        return 'bg:fluctuation-type-2';
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
    getBackgroundClass,
    getIcon,
    getOperator,
  };
}
