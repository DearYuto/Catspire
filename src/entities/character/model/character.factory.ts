import { Character, CharacterClass } from "../types";
import { CHARACTER_BASE_STATS } from "./character.stats";

export function createCharacter(characterClass: CharacterClass): Character {
  const baseStats = CHARACTER_BASE_STATS[characterClass];

  return {
    id: `character_${characterClass}`,
    name: baseStats.name,
    class: characterClass,
    maxHp: baseStats.maxHp,
    currentHp: baseStats.maxHp,
    maxEnergy: baseStats.maxEnergy,
    currentEnergy: baseStats.maxEnergy,
    block: 0,
    buffs: [],
    debuffs: [],
  };
}
