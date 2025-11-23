import { CharacterClass } from "@/entities/character/types";
import { Card, CardRarity, CardType } from "../types";
import { COMMON_CARDS, MAGE_CARDS, ROGUE_CARDS, WARRIOR_CARDS } from "./card";

export const CardService = {
  ALL_CARDS: [
    ...WARRIOR_CARDS,
    ...MAGE_CARDS,
    ...ROGUE_CARDS,
    ...COMMON_CARDS,
  ] as const,

  getStartingCards(characterClass: CharacterClass): Card[] {
    switch (characterClass) {
      case "warrior":
        return [...WARRIOR_CARDS];
      case "mage":
        return [...MAGE_CARDS];
      case "rogue":
        return [...ROGUE_CARDS];
      default:
        return [];
    }
  },

  getCardById(id: string): Card | undefined {
    return this.ALL_CARDS.find((card) => card.id === id);
  },

  getCardsByType(type: CardType): Card[] {
    return this.ALL_CARDS.filter((card) => card.type === type);
  },

  getCardsByRarity(rarity: CardRarity): Card[] {
    return this.ALL_CARDS.filter((card) => card.rarity === rarity);
  },

  getRewardCards(characterClass: CharacterClass, count: number = 3): Card[] {
    const classCards = this.getStartingCards(characterClass);
    const allCards = [...classCards, ...COMMON_CARDS];

    const shuffled = allCards.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count);
  },
};
