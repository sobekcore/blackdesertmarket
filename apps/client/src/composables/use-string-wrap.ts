export interface UseStringWrapReturn {
  wrap(string: string, character: string, count: number): string;
}

export function useStringWrap(): UseStringWrapReturn {
  const wrap = (string: string, character: string, count: number): string => {
    return `${character.repeat(count)}${string}${character.repeat(count)}`;
  };

  return {
    wrap,
  };
}
