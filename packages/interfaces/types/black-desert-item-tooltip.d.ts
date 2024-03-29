export interface BlackDesertItemTooltip {
  id: number;
  enhancement: number;
  name: string;
  category: string;
  damage?: string;
  defense?: string;
  accuracy?: string;
  evasion?: string;
  damageReduction?: string;
  weight: string;
  sections: BlackDesertItemTooltipSection[];
}

export interface BlackDesertItemTooltipSection {
  id: string;
  name: string;
  values?: string[];
}
