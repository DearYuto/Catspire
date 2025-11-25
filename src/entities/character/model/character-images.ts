import { CharacterClass } from "@/shared/types";

export interface CharacterImages {
  background: string;
  character: string;
}

export const CHARACTER_IMAGES: Record<CharacterClass, CharacterImages> = {
  warrior: {
    background: "/images/backgrounds/moon_bg.png",
    character: "/images/characters/moon_purr.png",
  },
  rogue: {
    background: "/images/backgrounds/shadow_bg.png",
    character: "/images/characters/shadow_paw.png",
  },
  mage: {
    background: "/images/backgrounds/dream_bg.png",
    character: "/images/characters/dream_tail.png",
  },
} as const;

export function getCharacterImages(
  characterClass: CharacterClass
): CharacterImages {
  return CHARACTER_IMAGES[characterClass];
}


