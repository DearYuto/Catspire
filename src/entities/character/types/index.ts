export type CharacterClass = "warrior" | "mage" | "rogue";

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  maxHp: number;
  currentHp: number;
  maxEnergy: number;
  currentEnergy: number;
  block: number;
  buffs: Buff[];
  debuffs: Debuff[];
  avatar?: string;
}

export interface Buff {
  id: string;
  name: string;
  type: "strength" | "defense" | "energy" | "draw";
  value: number;
  duration: number;
  description: string;
}

export interface Debuff {
  id: string;
  name: string;
  type: "weak" | "vulnerable" | "poison" | "stun";
  value: number;
  duration: number;
  description: string;
}
