import type { Card } from "../types";

/**
 * 섀도포 (Shadow Paw) 클래스 전용 카드
 *
 * - 중급 난이도 콤보 딜러
 * - 저코스트 다량 사용 스타일
 * - 그림자 스택 기반 폭발 딜
 *
 * 패시브
 * Night Trace - 밤의 잔향
 * - 한 턴에 3장 이상 카드 사용 시 그림자 스택 +1
 * - 그림자 스택당 모든 공격 +1 추가 피해
 */
export const ROGUE_CARDS: Card[] = [
  // 0코
  {
    id: "shadowpaw_shadow_slip",
    name: "그림자 미끄러짐",
    type: "skill",
    rarity: "common",
    cost: 0,
    description: "그림자 스택을 1 획득한다.",
    class: "rogue",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 4,
    effects: [
      {
        type: "stack",
        targets: ["self"],
        stackType: "shadow",
        value: 1,
      },
    ],
  },

  {
    id: "shadowpaw_quick_draw",
    name: "빠른 손놀림",
    type: "skill",
    rarity: "common",
    cost: 0,
    description: "카드를 1장 뽑는다.",
    class: "rogue",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 3,
    effects: [
      {
        type: "draw",
        targets: ["self"],
        value: 1,
      },
    ],
  },

  // 1코
  {
    id: "shadowpaw_quick_strike",
    name: "빠른 타격",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "적 1마리에게 5 피해를 입힌다.",
    class: "rogue",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 5,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 5,
      },
    ],
  },

  {
    id: "shadowpaw_evade",
    name: "회피",
    type: "skill",
    rarity: "common",
    cost: 1,
    description: "방어력을 4 증가시킨다.",
    class: "rogue",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 4,
    effects: [
      {
        type: "block",
        targets: ["self"],
        value: 4,
      },
    ],
  },

  {
    id: "shadowpaw_twin_strike",
    name: "이중 타격",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "적 1마리에게 3 피해를 2번 입힌다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 0,
    weight: 90,
    maxCopies: 3,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 3,
      },
      {
        type: "damage",
        targets: ["enemy"],
        value: 3,
      },
    ],
  },

  {
    id: "shadowpaw_shadow_step",
    name: "그림자 발걸음",
    type: "skill",
    rarity: "common",
    cost: 1,
    description: "방어력을 5 증가시키고 그림자 스택을 1 획득한다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 0,
    weight: 85,
    maxCopies: 3,
    effects: [
      {
        type: "block",
        targets: ["self"],
        value: 5,
      },
      {
        type: "stack",
        targets: ["self"],
        stackType: "shadow",
        value: 1,
      },
    ],
  },

  {
    id: "shadowpaw_rush",
    name: "급습",
    type: "attack",
    rarity: "uncommon",
    cost: 1,
    description:
      "적 1마리에게 7 피해를 입힌다. 이번 턴에 사용한 카드가 2장 이상이면 10 피해를 입힌다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 1,
    weight: 70,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 7,
      },
      {
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "cardsPlayed",
          operator: ">=",
          value: 2,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["enemy"],
          value: 3,
        },
      },
    ],
  },

  {
    id: "shadowpaw_blade_dance",
    name: "칼날 춤",
    type: "attack",
    rarity: "uncommon",
    cost: 1,
    description: "적 1마리에게 4 피해를 입히고 카드를 1장 뽑는다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 1,
    weight: 75,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 4,
      },
      {
        type: "draw",
        targets: ["self"],
        value: 1,
      },
    ],
  },

  // 2코
  {
    id: "shadowpaw_shadow_combo",
    name: "섀도 콤보",
    type: "attack",
    rarity: "uncommon",
    cost: 2,
    description: "적 1마리에게 4 피해를 3번 입힌다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 2,
    weight: 60,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 4,
      },
      {
        type: "damage",
        targets: ["enemy"],
        value: 4,
      },
      {
        type: "damage",
        targets: ["enemy"],
        value: 4,
      },
    ],
  },

  {
    id: "shadowpaw_night_echo",
    name: "밤의 울림",
    type: "skill",
    rarity: "uncommon",
    cost: 2,
    description: "카드를 3장 뽑고 그림자 스택을 1 획득한다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 2,
    weight: 55,
    maxCopies: 2,
    effects: [
      {
        type: "draw",
        targets: ["self"],
        value: 3,
      },
      {
        type: "stack",
        targets: ["self"],
        stackType: "shadow",
        value: 1,
      },
    ],
  },

  {
    id: "shadowpaw_empowered_strike",
    name: "강화 타격",
    type: "attack",
    rarity: "uncommon",
    cost: 2,
    description:
      "적 1마리에게 12 피해를 입힌다. 그림자 스택이 5 이상이면 18 피해를 입힌다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 2,
    weight: 65,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 12,
      },
      {
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "stack",
          stackType: "shadow",
          operator: ">=",
          value: 5,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["enemy"],
          value: 6,
        },
      },
    ],
  },

  {
    id: "shadowpaw_shadow_burst",
    name: "그림자 폭발",
    type: "attack",
    rarity: "rare",
    cost: 2,
    description:
      "적 1마리에게 8 피해를 입힌다. 그림자 스택 1당 추가로 2 피해를 입힌다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 3,
    weight: 45,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 8,
      },
      {
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "stack",
          stackType: "shadow",
          operator: ">=",
          value: 1,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["enemy"],
          value: 2, // per stack
          // TODO: 스택 수 × 2 계산 로직
        },
      },
    ],
  },

  {
    id: "shadowpaw_relentless_assault",
    name: "무자비한 공세",
    type: "attack",
    rarity: "rare",
    cost: 2,
    description:
      "적 1마리에게 5 피해를 입힌다. 이번 턴에 사용한 공격 카드 1장당 추가로 5 피해를 입힌다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 3,
    weight: 40,
    maxCopies: 1,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 5,
      },
      {
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "cardsPlayed",
          operator: ">=",
          value: 1,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["enemy"],
          value: 5, // per attack card played
          // TODO: 공격 카드 수만큼 배수 적용
        },
      },
    ],
  },

  // 3코
  {
    id: "shadowpaw_shadow_crescent",
    name: "월야참",
    type: "attack",
    rarity: "legendary",
    cost: 3,
    description:
      "그림자 스택을 모두 소모하고 소모한 스택 × 6 피해를 입힌다. 방어력을 10 증가시킨다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 5,
    weight: 20,
    maxCopies: 1,
    effects: [
      {
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "stack",
          stackType: "shadow",
          operator: ">=",
          value: 1,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["enemy"],
          value: 6, // per stack consumed
          // TODO: 모든 스택 소모 및 배수 계산
        },
      },
      {
        type: "block",
        targets: ["self"],
        value: 10,
      },
    ],
  },

  {
    id: "shadowpaw_shadow_storm",
    name: "그림자 폭풍",
    type: "attack",
    rarity: "rare",
    cost: 3,
    description: "모든 적에게 6 피해를 3번 입힌다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 4,
    weight: 30,
    maxCopies: 1,
    effects: [
      {
        type: "damage",
        targets: ["allEnemies"],
        value: 6,
      },
      {
        type: "damage",
        targets: ["allEnemies"],
        value: 6,
      },
      {
        type: "damage",
        targets: ["allEnemies"],
        value: 6,
      },
    ],
  },

  {
    id: "shadowpaw_endless_blade",
    name: "무한의 칼날",
    type: "attack",
    rarity: "rare",
    cost: 3,
    description: "적 1마리에게 20 피해를 입힌다. 카드를 2장 뽑는다.",
    class: "rogue",
    source: ["battleReward"],
    unlockStage: 4,
    weight: 35,
    maxCopies: 1,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 20,
      },
      {
        type: "draw",
        targets: ["self"],
        value: 2,
      },
    ],
  },
];
