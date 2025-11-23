import { CharacterClass } from "@/entities/character/types";

export type CardType = "attack" | "skill" | "magic" | "item";
export type CardRarity = "common" | "uncommon" | "rare" | "legendary";

export type CardSource =
  | "starter"
  | "battleReward"
  | "shop"
  | "gacha"
  | "craft"
  | "event";

/**
 * 카드 사용을 위한 추가 비용
 */
export interface AdditionalCost {
  discard?: number; // 손패에서 버려야 하는 카드 수
  exhaust?: boolean; // 사용 후 소진 (게임에서 제거)
  hp?: number; // 체력 소모
  stack?: {
    type: StackType;
    amount: number;
  }; // 스택 소모
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: CardRarity;
  cost: number; // 에너지 비용
  description: string;
  class: CharacterClass;
  effects: CardEffect[];
  image?: string;

  /**
   * 카드 사용을 위한 추가 비용 (에너지 외)
   */
  additionalCost?: AdditionalCost;

  /**
   * 카드 획득 관련 정보
   */
  // 카드 획득 경로
  source: CardSource[];
  unlockStage: number;
  // 전투 보상/뽑기 확률 가중치
  weight: number;
  // 덱에 넣을 수 있는 최대 장수
  maxCopies: number;
  // 상점에서 카드 구매 가격 TODO: 추후 개발하기
  // shopPrice?: number;
}

export type CardTarget = "self" | "enemy" | "allEnemies";

export type EffectType =
  | "damage"
  | "block"
  | "draw"
  | "heal"
  | "buff"
  | "debuff"
  | "stack"
  | "energy"
  | "cost"
  | "conditional"; // 조건부 효과

export type StackType = "moonlight" | "shadow" | "nightmare";

/**
 * 조건 타입
 */
export type ConditionType =
  | "stack" // 스택 수
  | "hp" // 체력
  | "energy" // 에너지
  | "turn" // 턴 수
  | "handSize" // 손패 카드 수
  | "cardsPlayed" // 이번 턴 사용한 카드 수
  | "cardsDiscarded"; // 이번 턴 버린 카드 수

export interface CardEffect {
  type: EffectType;
  targets: CardTarget[];
  value?: number; // 데미지, 방어, 드로우 수 등
  stackType?: StackType;
  duration?: number;
  condition?: {
    type: ConditionType;
    stackType?: StackType; // type이 "stack"일 때만 사용
    operator: ">=" | "<=" | "==" | ">";
    value: number;
  };
  conditionalBonus?: CardEffect;
}
