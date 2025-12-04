import { CharacterClass } from "@/shared/types";

export interface CharacterImages {
  background: string;
  character: string;
}

export const CHARACTER_IMAGES: Record<CharacterClass, CharacterImages> = {
  warrior: {
    background: "/images/backgrounds/bg_moon.png",
    character: "/images/characters/character_moon_purr.default.png",
  },
  rogue: {
    background: "/images/backgrounds/bg_shadow.png",
    character: "/images/characters/character_shadow_paw.default.png",
  },
  mage: {
    background: "/images/backgrounds/bg_dream.png",
    character: "/images/characters/character_dream-tail.default.png",
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
