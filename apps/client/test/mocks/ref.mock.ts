export interface MockRef<T> {
  value: T;
}

export function mockRef<T>(value: T): MockRef<T> {
  return {
    value: value,
  };
}
