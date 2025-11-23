import type { Card } from "../types";

/**
 * 드림테일 (Dream Tail) 클래스 전용 카드
 *
 * - 전략형 고난이도 클래스
 * - 손패 조작과 디버프 특화
 * - 악몽 스택 기반 도트 플레이
 *
 * 패시브
 * Dream Ripple - 꿈의 파문
 * - 턴 종료 시 손패가 4장 이하면 다음 턴 카드 +1 드로우
 * - 악몽 스택: 턴 종료 시 적에게 스택 수만큼 피해
 */
export const MAGE_CARDS: Card[] = [
  // 0코
  {
    id: "dreamtail_dream_step",
    name: "꿈결 스텝",
    type: "skill",
    rarity: "common",
    cost: 0,
    description: "손패의 카드 1장을 버리고 카드 1장을 뽑는다.",
    class: "mage",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 3,
    additionalCost: {
      discard: 1,
    },
    effects: [
      {
        type: "draw",
        targets: ["self"],
        value: 1,
      },
    ],
  },

  {
    id: "dreamtail_nightmare_seed",
    name: "악몽 씨앗",
    type: "skill",
    rarity: "common",
    cost: 0,
    description: "적 1마리에게 악몽 스택 1을 부여한다.",
    class: "mage",
    source: ["starter"],
    unlockStage: 0,
    weight: 80,
    maxCopies: 4,
    effects: [
      {
        type: "stack",
        targets: ["enemy"],
        stackType: "nightmare",
        value: 1,
      },
    ],
  },

  // 1코
  {
    id: "dreamtail_phantom_strike",
    name: "환영 타격",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "적 1마리에게 5 피해를 입힌다.",
    class: "mage",
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
    id: "dreamtail_dream_shield",
    name: "몽울 방어",
    type: "skill",
    rarity: "common",
    cost: 1,
    description: "방어력을 6 증가시킨다.",
    class: "mage",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 4,
    effects: [
      {
        type: "block",
        targets: ["self"],
        value: 6,
      },
    ],
  },

  {
    id: "dreamtail_mind_blast",
    name: "정신 파열",
    type: "attack",
    rarity: "common",
    cost: 1,
    description:
      "적 1마리에게 7 피해를 입힌다. 손패가 3장 이하면 10 피해를 입힌다.",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 0,
    weight: 80,
    maxCopies: 3,
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
          type: "handSize",
          operator: "<=",
          value: 3,
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
    id: "dreamtail_illusion_copy",
    name: "환영 만들기",
    type: "skill",
    rarity: "uncommon",
    cost: 1,
    description: "손패의 카드 1장을 복사한다. (이번 턴만 유효)",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 1,
    weight: 60,
    maxCopies: 2,
    effects: [
      {
        type: "buff",
        targets: ["self"],
        value: 1,
        duration: 1,
        // TODO: 실제 구현에서 카드 복사 로직 필요
      },
    ],
  },

  {
    id: "dreamtail_sleep_curse",
    name: "잠식된 기억",
    type: "skill",
    rarity: "uncommon",
    cost: 1,
    description: "적 1마리에게 악몽 스택 2를 부여하고 방어력을 3 증가시킨다.",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 1,
    weight: 70,
    maxCopies: 2,
    effects: [
      {
        type: "stack",
        targets: ["enemy"],
        stackType: "nightmare",
        value: 2,
      },
      {
        type: "block",
        targets: ["self"],
        value: 3,
      },
    ],
  },

  // 2코
  {
    id: "dreamtail_dream_refraction",
    name: "꿈의 굴절",
    type: "skill",
    rarity: "uncommon",
    cost: 2,
    description: "카드를 3장 뽑는다. 손패의 랜덤 카드 1장의 비용이 1 증가한다.",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 2,
    weight: 50,
    maxCopies: 2,
    effects: [
      {
        type: "draw",
        targets: ["self"],
        value: 3,
      },
      {
        type: "debuff",
        targets: ["self"],
        value: 1,
        duration: 1,
        // TODO: 랜덤 카드 비용 증가 로직
      },
    ],
  },

  {
    id: "dreamtail_nightmare_burst",
    name: "악몽 폭발",
    type: "attack",
    rarity: "uncommon",
    cost: 2,
    description:
      "적 1마리에게 10 피해를 입힌다. 대상의 악몽 스택 1당 추가로 3 피해를 입힌다.",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 2,
    weight: 60,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 10,
      },
      {
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "stack",
          stackType: "nightmare",
          operator: ">=",
          value: 1,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["enemy"],
          value: 3, // per stack
          // TODO: 스택 수 × 3 계산 로직
        },
      },
    ],
  },

  {
    id: "dreamtail_mass_nightmare",
    name: "집단 악몽",
    type: "skill",
    rarity: "rare",
    cost: 2,
    description: "모든 적에게 악몽 스택 2를 부여한다.",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 3,
    weight: 40,
    maxCopies: 1,
    effects: [
      {
        type: "stack",
        targets: ["allEnemies"],
        stackType: "nightmare",
        value: 2,
      },
    ],
  },

  {
    id: "dreamtail_phantom_assault",
    name: "환영 습격",
    type: "attack",
    rarity: "rare",
    cost: 2,
    description:
      "적 1마리에게 14 피해를 입힌다. 손패를 1장 버릴 때마다 추가로 6 피해를 입힌다.",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 3,
    weight: 45,
    maxCopies: 2,
    additionalCost: {
      discard: 1, // 최소 1장
    },
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 14,
      },
      // TODO: 버린 카드 수만큼 추가 데미지
    ],
  },

  // 3코
  {
    id: "dreamtail_dream_caster",
    name: "드림캐스터",
    type: "attack",
    rarity: "legendary",
    cost: 3,
    description:
      "모든 적의 악몽 스택을 즉시 발동시킨다. 발동된 악몽 스택 1당 추가로 2 피해를 입힌다.",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 5,
    weight: 20,
    maxCopies: 1,
    effects: [
      {
        type: "conditional",
        targets: ["allEnemies"],
        condition: {
          type: "stack",
          stackType: "nightmare",
          operator: ">=",
          value: 1,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["allEnemies"],
          value: 2, // per stack + instant trigger
          // TODO: 악몽 스택 즉시 발동 + 추가 데미지 로직
        },
      },
    ],
  },

  {
    id: "dreamtail_lucid_dream",
    name: "자각몽",
    type: "skill",
    rarity: "rare",
    cost: 3,
    description:
      "카드를 4장 뽑는다. 이번 턴에 사용한 손패 조작 카드 수만큼 방어력을 5씩 증가시킨다.",
    class: "mage",
    source: ["battleReward"],
    unlockStage: 4,
    weight: 30,
    maxCopies: 1,
    effects: [
      {
        type: "draw",
        targets: ["self"],
        value: 4,
      },
      // TODO: 손패 조작 카드 추적 및 방어 보너스 로직
    ],
  },

  {
    id: "dreamtail_void_strike",
    name: "공허의 일격",
    type: "attack",
    rarity: "rare",
    cost: 3,
    description:
      "적 1마리에게 20 피해를 입힌다. 손패가 2장 이하면 28 피해를 입힌다.",
    class: "mage",
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
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "handSize",
          operator: "<=",
          value: 2,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["enemy"],
          value: 8,
        },
      },
    ],
  },
];
