export function mockCreateObjectURL(url: string): void {
  window.URL.createObjectURL = (): string => {
    return `blob:${url}`;
  };
}
