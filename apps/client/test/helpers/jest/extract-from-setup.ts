import { ComponentInternalInstance } from 'vue';

export function extractFromSetup<T>(component: ComponentInternalInstance, property: string): T {
  const setup: Record<string, any> = (component as any).setupState as Record<string, any>;
  return setup[property] as T;
}
