export type FloorNumber = 1 | 2 | 3 | 4 | 5;

export type EnemyTier = "normal" | "elite" | "boss";

export interface Enemy {
  id: string;
  name: string;
  floor: FloorNumber;
  tier: EnemyTier;

  // 기본 스탯
  baseHP: number;
  baseBlock: number;

  // 행동
  actions: EnemyAction[];
  pattern?: EnemyPattern[];

  // 특수능력
  passiveEffects?: EnemyPassiveEffect[];

  // 메타정보
  intent?: string;
  image?: string;
  description?: string;
  rewards?: EnemyRewards;
}

/**
 * 상태이상 타입
 */
export type StatusEffectType =
  | "poison" // 독: 턴 종료 시 데미지
  | "burn" // 화상: 카드 사용 시 데미지
  | "bind" // 속박: 카드 사용 가능 수 감소
  | "weak" // 약화: 공격력 25% 감소
  | "vulnerable" // 취약: 받는 데미지 50% 증가
  | "confuse" // 혼란: 카드 코스트 랜덤
  | "fatigue" // 피로: 다음 턴 달빛 스택 감소
  | "freeze" // 빙결: 카드 코스트 +1
  | "silence" // 침묵: 스킬 사용 불가
  | "decay" // 부패: 회복 효과 감소
  | "void"; // 공허: 덱 카드 소멸

/**
 * 버프 타입
 */
export type BuffType =
  | "strength" // 강화: 공격력 +N
  | "dexterity" // 민첩: 블록 획득량 +N
  | "rage" // 분노: 스택당 공격력 +2 (소모성)
  | "thorns" // 가시: 피격 시 반사 데미지
  | "regen" // 재생: 턴 시작 시 HP 회복
  | "invulnerable" // 무적: 데미지 면역
  | "artifact" // 아티팩트: 디버프 1회 무효
  | "defend"; // 방어: 방어력 +N

/** 행동 타입 */
export type ActionType =
  | "attack" // 공격
  | "defend" // 방어
  | "buff" // 버프
  | "debuff" // 디버프
  | "summon" // 소환
  | "heal" // 회복
  | "special"; // 특수

/** 인텐트 아이콘 (플레이어에게 보여줄 행동 예고) */
export type IntentIcon =
  | "attack" // 공격
  | "attack_multi" // 다중 공격
  | "defend" // 방어
  | "buff" // 버프
  | "debuff" // 디버프
  | "unknown" // 랜덤
  | "special"; // 특수

export type EnemyEffectType =
  | "attack"
  | "defend"
  | "buff"
  | "debuff"
  | "special"
  | "evade"
  | "poison"
  | "stack"
  | "rage";

export interface EnemyPassiveEffect {
  id: string;
  name: string;
  description: string;
  trigger:
    | "turn_start"
    | "turn_end"
    | "on_death"
    | "on_damage"
    | "on_heal"
    | "always"
    | "hp_threshold";
  effect: EnemyEffect;
}

export type EnemyEffect = {
  types: EnemyEffectType[];
  value: number;
  stacks?: number;
  condition?: {
    types: EnemyEffectType[];
    value: number;
    operator: ">=" | "<=" | "==" | ">";
  };
};

export type EnemyPattern = {
  turn: number | "repeat";
  actionId: string;
  condition?: {
    // 조건부 행동
    type: "hp_below" | "hp_above" | "buff_exists" | "turn_multiple";
    value: number;
  };
};

export interface EnemyAction {
  id: string;
  name: string;
  type: ActionType;
  intent: IntentIcon;
  damage?: number | ((stacks: number) => number);
  hits?: number;
  block?: number;
  heal?: number;
  when: "phases_1" | "phases_2" | "phases_3";

  // 상대에게 상태 효과 적용
  statusEffect?: {
    type: StatusEffectType;
    stacks: number;
    target: "player" | "self" | "all";
  };

  // 자신 버프
  buffEffect?: {
    type: BuffType;
    stacks: number;
    target: "self" | "all_enemies";
  };

  // 자신, 팀 디버프
  debuffEffect?: {
    type: StatusEffectType;
    stacks: number;
    target: "self" | "all_enemies";
  };
  passiveEffects?: EnemyPassiveEffect[];
  summon?: string; // 소환할 몬스터 ID
  special?: string; // 특수 효과 ID
  description: string;
}

export interface EnemyRewards {
  gold: {
    min: number;
    max: number;
  };
  items?: {
    id: string;
    name: string;
    description: string;
    image: string;
  }[];
}

/** 특수 능력 (패시브) */
export interface PassiveAbility {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  trigger:
    | "turn_start"
    | "turn_end"
    | "on_hit"
    | "on_death"
    | "always"
    | "hp_threshold"
    | "on_ally_death";
  effect: {
    type: string;
    value: number;
    condition?: Record<string, unknown>;
  };
}
