import { CharacterClass } from "../types";

interface CharacterStats {
  name: string;
  maxHp: number;
  maxEnergy: number;
}

export const CHARACTER_BASE_STATS = {
  warrior: {
    name: "Moon Purr",
    maxHp: 80,
    maxEnergy: 3,
  },
  mage: {
    name: "Dream Tail",
    maxHp: 60,
    maxEnergy: 3,
  },
  rogue: {
    name: "Shadow Paw",
    maxHp: 70,
    maxEnergy: 4,
  },
} as const satisfies Record<CharacterClass, CharacterStats>;
