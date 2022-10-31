export interface UseNumberFormatReturn {
  format(value: number): string;
  formatToParts(value: number): Intl.NumberFormatPart[];
}

export function useNumberFormat(options?: Intl.NumberFormatOptions): UseNumberFormatReturn {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', options);

  return {
    format: formatter.format,
    formatToParts: formatter.formatToParts,
  };
}
