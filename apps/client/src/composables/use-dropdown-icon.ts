export function useDropdownIcon(active: boolean, flipWhenActive: boolean = true): string {
  return active
    ? flipWhenActive
      ? require('@/assets/images/dropdown/dropdown-icon-active-flip.png')
      : require('@/assets/images/dropdown/dropdown-icon-active.png')
    : require('@/assets/images/dropdown/dropdown-icon.png');
}
