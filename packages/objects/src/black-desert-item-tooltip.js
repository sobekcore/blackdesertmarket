export function isValidBlackDesertItemTooltip(itemTooltip) {
  return (
    itemTooltip &&
    itemTooltip.hasOwnProperty('id') &&
    itemTooltip.hasOwnProperty('enhancement') &&
    itemTooltip.hasOwnProperty('name') &&
    itemTooltip.hasOwnProperty('category') &&
    itemTooltip.hasOwnProperty('weight') &&
    itemTooltip.hasOwnProperty('sections')
  );
}

export function isValidBlackDesertItemTooltipSection(itemSection) {
  return (
    itemSection &&
    itemSection.hasOwnProperty('id') &&
    itemSection.hasOwnProperty('name')
  );
}
