import type { Card } from "../types";

/**
 * 문퍼 (Moon Purr) 클래스 전용 카드
 *
 * - 초보자 친화적 올라운더
 * - 직관적인 공격/방어 카드 중심
 * - 달빛 스택으로 자연스러운 성장
 *
 * 패시브
 * Lunar Flow - 달빛의 흐름
 * - 턴 종료 시 달빛 스택 +1
 * - 달빛 3 스택: 다음 공격/방어 +50%
 */
export const WARRIOR_CARDS = [
  // 0코
  {
    id: "moonpurr_lunar_flow",
    name: "달의 흐름",
    type: "skill",
    rarity: "common",
    cost: 0,
    description: "달빛 스택을 1 얻는다.",
    class: "warrior",
    source: ["starter"],
    unlockStage: 0,
    weight: 75,
    maxCopies: 5,
    effects: [
      {
        type: "stack",
        targets: ["self"],
        stackType: "moonlight",
        value: 1,
      },
    ],
  },

  {
    id: "moonpurr_lunar_breath",
    name: "달의 숨결",
    type: "skill",
    rarity: "common",
    cost: 0,
    description:
      "달빛 스택을 1 소모하여 카드 2장을 뽑는다. 달빛 스택이 없는 경우 카드 효과는 무효화된다.",
    class: "warrior",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 3,
    effects: [
      {
        type: "draw",
        targets: ["self"],
        value: 2,
      },
      {
        type: "stack",
        targets: ["self"],
        stackType: "moonlight",
        value: -1,
      },
    ],
  },

  // 1코
  {
    id: "moonpurr_strike",
    name: "달빛 강타",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "적 1마리에게 6 피해를 입힌다.",
    class: "warrior",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 5,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 6,
      },
    ],
  },

  {
    id: "moonpurr_defend",
    name: "달빛 방어",
    type: "skill",
    rarity: "common",
    cost: 1,
    description: "방어력을 5 증가시킨다.",
    class: "warrior",
    source: ["starter"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 5,
    effects: [
      {
        type: "block",
        targets: ["self"],
        value: 5,
      },
    ],
  },

  {
    id: "moonpurr_moonlit_strike",
    name: "월광 타격",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "적 1마리에게 8 피해를 입히고 나의 방어력을 4 증가시킨다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 0,
    weight: 90,
    maxCopies: 3,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 8,
      },
      {
        type: "block",
        targets: ["self"],
        value: 4,
      },
    ],
  },

  {
    id: "moonpurr_lunar_shield",
    name: "달빛 방패",
    type: "skill",
    rarity: "common",
    cost: 1,
    description: "방어력을 8 증가시킨다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 3,
    effects: [
      {
        type: "block",
        targets: ["self"],
        value: 8,
      },
    ],
  },

  {
    id: "moonpurr_empowered_guard",
    name: "달빛 수호",
    type: "skill",
    rarity: "uncommon",
    cost: 2,
    description:
      "방어력을 12 증가시킨다. 달빛 스택이 3 이상이면 방어력을 18 증가시킨다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 1,
    weight: 70,
    maxCopies: 2,
    effects: [
      {
        type: "block",
        targets: ["self"],
        value: 12,
      },
      {
        type: "conditional",
        targets: ["self"],
        condition: {
          type: "stack",
          stackType: "moonlight",
          operator: ">=",
          value: 3,
        },
        conditionalBonus: {
          type: "block",
          targets: ["self"],
          value: 6,
        },
      },
    ],
  },

  {
    id: "moonpurr_gather_light",
    name: "달빛 모으기",
    type: "skill",
    rarity: "uncommon",
    cost: 1,
    description: "카드를 2장 뽑고 달빛 스택을 1 획득한다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 1,
    weight: 60,
    maxCopies: 2,
    effects: [
      {
        type: "draw",
        targets: ["self"],
        value: 2,
      },
      {
        type: "stack",
        targets: ["self"],
        stackType: "moonlight",
        value: 1,
      },
    ],
  },

  {
    id: "moonpurr_moonlight_blessing",
    name: "달빛 축복",
    type: "skill",
    rarity: "uncommon",
    cost: 1,
    description: "달빛 스택을 2 획득한다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 2,
    weight: 50,
    maxCopies: 2,
    effects: [
      {
        type: "stack",
        targets: ["self"],
        stackType: "moonlight",
        value: 2,
      },
    ],
  },

  // 2코
  {
    id: "moonpurr_crescent_slash",
    name: "초승달 베기",
    type: "attack",
    rarity: "common",
    cost: 2,
    description: "적 1마리에게 12 피해를 입힌다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 0,
    weight: 100,
    maxCopies: 3,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 12,
      },
    ],
  },

  {
    id: "moonpurr_empowered_strike",
    name: "달빛 일격",
    type: "attack",
    rarity: "uncommon",
    cost: 2,
    description:
      "적 1마리에게 14 피해를 입힌다. 달빛 스택이 3 이상이면 20 피해를 입힌다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 1,
    weight: 70,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 14,
      },
      {
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "stack",
          stackType: "moonlight",
          operator: ">=",
          value: 3,
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
    id: "moonpurr_lunar_wave",
    name: "달빛 파동",
    type: "attack",
    rarity: "uncommon",
    cost: 2,
    description: "모든 적에게 10 피해를 입힌다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 2,
    weight: 60,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["allEnemies"],
        value: 10,
      },
    ],
  },

  {
    id: "moonpurr_moon_harmony",
    name: "문하모니",
    type: "skill",
    rarity: "rare",
    cost: 2,
    description:
      "적 1마리에게 10 피해를 입히고 나의 방어력을 10 증가시킨다. 카드 1장을 추가로 뽑는다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 4,
    weight: 30,
    maxCopies: 1,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 10,
      },
      {
        type: "block",
        targets: ["self"],
        value: 10,
      },
      {
        type: "draw",
        targets: ["self"],
        value: 1,
      },
    ],
  },

  // 3코
  {
    id: "moonpurr_full_moon_strike",
    name: "만월의 일격",
    type: "attack",
    rarity: "rare",
    cost: 3,
    description:
      "적 1마리에게 24 피해를 입힌다. 달빛 스택이 3 이상이면 30 피해를 입힌다.",
    class: "warrior",
    source: ["battleReward"],
    unlockStage: 3,
    weight: 50,
    maxCopies: 2,
    effects: [
      {
        type: "damage",
        targets: ["enemy"],
        value: 24,
      },
      {
        type: "conditional",
        targets: ["enemy"],
        condition: {
          type: "stack",
          stackType: "moonlight",
          operator: ">=",
          value: 3,
        },
        conditionalBonus: {
          type: "damage",
          targets: ["enemy"],
          value: 6,
        },
      },
    ],
  },
] as const satisfies readonly Card[];

/**
 * 문퍼 기본 시작 덱
 *
 * - 보통 덱빌딩 로그라이크의 시작 덱 구성(10~12장)을 참고해서
 *   10장으로 구성:
 *   - 달빛 강타(공격) 4장
 *   - 달빛 방어(방어) 4장
 *   - 달의 흐름(스택 생성) 1장
 *   - 달의 숨결(드로우) 1장
 */
const getWarriorCardById = (id: (typeof WARRIOR_CARDS)[number]["id"]): Card => {
  const card = WARRIOR_CARDS.find((c) => c.id === id);

  if (!card) {
    throw new Error(`${id}는 존재하지 않는 카드입니다.`);
  }

  return card;
};

export const WARRIOR_STARTER_DECK: Card[] = [
  // 달빛 강타
  getWarriorCardById("moonpurr_strike"),
  getWarriorCardById("moonpurr_strike"),
  getWarriorCardById("moonpurr_strike"),
  getWarriorCardById("moonpurr_strike"),

  // 달빛 방어
  getWarriorCardById("moonpurr_defend"),
  getWarriorCardById("moonpurr_defend"),
  getWarriorCardById("moonpurr_defend"),
  getWarriorCardById("moonpurr_defend"),

  // 달의 흐름
  getWarriorCardById("moonpurr_lunar_flow"),

  // 달의 숨결
  getWarriorCardById("moonpurr_lunar_breath"),
];
