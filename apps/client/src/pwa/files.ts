export function getApplicationFiles(): string[] {
  return ['/', ...performance.getEntriesByType('resource').map((entry: PerformanceEntry): string => entry.name)];
}
