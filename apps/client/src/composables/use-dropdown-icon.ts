export function useDropdownIcon(active: boolean): string {
  return active
    ? require('@/assets/images/dropdown/dropdown-icon-active.png')
    : require('@/assets/images/dropdown/dropdown-icon.png');
}
