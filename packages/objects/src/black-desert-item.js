export function isValidBlackDesertItem(item) {
  return (
    item &&
    item.hasOwnProperty('id') &&
    item.hasOwnProperty('name') &&
    item.hasOwnProperty('count') &&
    item.hasOwnProperty('grade') &&
    item.hasOwnProperty('basePrice')
  );
}
