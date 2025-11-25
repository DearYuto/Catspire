import type { GamePhase } from "@/shared/types";
import type { Character } from "@/entities/character/types";

export interface GameState {
  phase: GamePhase;
  floor: number;
  maxFloor: number;
  character: Character;
  // deck: Deck;
  moonShards: number;
  relics: string[];
  mapProgress: number[];
}
