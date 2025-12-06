import { Enemy } from "../types";

export const ENEMY_BASE_STATS: Record<string, Enemy> = {
  tower_rat: {
    id: "tower_rat",
    name: "탑의 쥐",
    maxHp: 25,
    currentHp: 25,
    tier: "normal",
    description: "달빛에 오염된 거대 쥐. 단순하지만 끈질기게 공격합니다.",
    image: "/images/enemies/entrance/enemy_tower-rat.default.png",
    rewards: {
      gold: {
        min: 10,
        max: 15,
      },
    },
    actions: [
      {
        id: "bite",
        type: "attack",
        name: "물기",
        damage: 5,
        intent: "공격",
        description: "적에게 5 피해를 입힙니다.",
      },
    ],
    pattern: [
      {
        turn: 1,
        actionId: "bite",
      },
      {
        turn: "repeat",
        actionId: "bite",
      },
    ],
  },

  moolit_bat: {
    id: "moonlit_bat",
    name: "달빛 박쥐",
    maxHp: 20,
    currentHp: 20,
    tier: "normal",
    description: "어둠 속에서 날아다니는 박쥐. 무리 지어 등장합니다.",
    image: "/images/enemies/entrance/enemy_moonlit-bat.default.png",
    rewards: {
      gold: {
        min: 8,
        max: 12,
      },
    },
    actions: [
      {
        id: "evade_prepare",
        type: "buff",
        name: "회피 준비",
        intent: "방어",
        description: "다음 공격을 50% 확률로 회피합니다.",
      },
      {
        id: "swoop",
        type: "attack",
        name: "급습",
        intent: "공격",
        description: "적에게 5 피해를 입힙니다.",
      },
      {
        id: "double_swoop",
        type: "attack",
        name: "이중 급습",
        intent: "공격",
        description: "적에게 3 데미지를 2회 입힙니다.",
        damage: 3,
        hits: 2,
      },
    ],
    pattern: [
      {
        turn: 1,
        actionId: "evade_prepare",
      },
      {
        turn: 2,
        actionId: "swoop",
      },
      {
        turn: 3,
        actionId: "double_swoop",
      },
      {
        turn: "repeat",
        actionId: "swoop",
      },
    ],
    passiveEffects: [
      {
        id: "moonlight_evade",
        name: "달빛 회피",
        description: "첫 턴에 50% 확률로 공격을 회피합니다.",
        trigger: "turn_start",
        effect: {
          type: "evade",
          value: 50,
        },
      },
    ],
  },
} as const satisfies Record<string, Enemy>;
