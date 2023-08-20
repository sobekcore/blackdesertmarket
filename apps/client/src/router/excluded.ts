const excludedRoutes: string[] = ['/__', '/__cypress'];

export function checkIsUrlExcludedFromSpa(url: string): boolean {
  return excludedRoutes.some((excluded: string): boolean => {
    return url.includes(excluded);
  });
}
