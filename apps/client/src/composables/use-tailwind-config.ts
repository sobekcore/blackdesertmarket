import { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import config from '~/tailwind.config.js';
import { ComposableException } from '@/exceptions/composable-exception';

export interface UseTailwindConfigReturn {
  getValue(property: string, name: string): string;
}

export function useTailwindConfig(): UseTailwindConfigReturn {
  const getValue = (property: string, name: string): string => {
    const tailwindConfig: Config = resolveConfig(config as unknown as Config);
    const properties: Record<string, string> = tailwindConfig?.theme?.[property] as Record<string, string>;

    if (!properties || !properties[name]) {
      throw new ComposableException(`Could not find value in ${property} with name ${name} in tailwind.config.js`);
    }

    return properties[name];
  };

  return {
    getValue,
  };
}
