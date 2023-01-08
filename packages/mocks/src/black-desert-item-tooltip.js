export function mockBlackDesertItemTooltip() {
  return {
    id: 5600,
    enhancement: 0,
    name: 'Weeds',
    category: 'General',
    damage: '0',
    defense: '0',
    accuracy: '0',
    weight: '0.10',
    sections: [mockBlackDesertItemTooltipSection()],
  }
}

export function mockBlackDesertItemTooltipSection() {
  return {
    id: 'price',
    name: 'Price',
    values: ['3,000'],
  }
}
