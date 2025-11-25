export type {
  Character,
  CharacterClass,
  Buff,
  Debuff,
} from "@/entities/character/types";
export type { Enemy, EnemyAction, Loot } from "@/entities/enemy/types";
export type { Card, CardEffect } from "@/entities/card/types";
export type { GameState } from "@/features/game-progress/types";
export type { Relic } from "@/entities/relic/types";

export type GamePhase =
  | "menu"
  | "map"
  | "battle"
  | "reward"
  | "shop"
  | "event"
  | "boss";

export type TurnPhase = "player" | "enemy";
