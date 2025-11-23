export type CardType = "attack" | "skill" | "magic" | "item";
export type CardRarity = "common" | "uncommon" | "rare" | "legendary";

export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: CardRarity;
  cost: number;
  damage?: number;
  block?: number;
  description: string;
  effect?: CardEffect;
  image?: string;
}

export interface CardEffect {
  type: "draw" | "heal" | "buff" | "debuff" | "aoe" | "combo";
  value?: number;
  target?: "self" | "enemy" | "allEnemies";
  duration?: number;
}
