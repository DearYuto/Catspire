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
  characterClass: CharacterClass,
): CharacterImages {
  return CHARACTER_IMAGES[characterClass];
}

export const extractCharacterImages = () => {
  const backgrounds = new Set<string>();
  const characters = new Set<string>();

  Object.values(CHARACTER_IMAGES).forEach((characterImage) => {
    if (characterImage.background) {
      backgrounds.add(characterImage.background);
    }

    if (characterImage.character) {
      characters.add(characterImage.character);
    }
  });

  return {
    backgrounds: Array.from(backgrounds),
    characters: Array.from(characters),
    all: [...Array.from(backgrounds), ...Array.from(characters)],
  };
};
