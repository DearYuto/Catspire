import { Enemy } from "../types";

export const ENEMY_BASE_STATS: Record<string, Enemy> = {
  tower_rat: {
    id: "tower_rat",
    name: "탑의 쥐",
    tier: "normal",
    floor: 1,
    baseHP: 25,
    baseBlock: 0,

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
        intent: "attack",
        damage: 6,
        description: "적에게 6 피해를 입힙니다.",
        when: "phases_1",
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

  moonlit_bat: {
    id: "moonlit_bat",
    name: "달빛 박쥐",
    floor: 1,
    baseHP: 20,
    baseBlock: 0,
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
        intent: "defend",
        description: "다음 공격을 50% 확률로 회피합니다.",
        when: "phases_1",
      },
      {
        id: "swoop",
        type: "attack",
        name: "급습",
        intent: "attack",
        when: "phases_1",
        damage: 5,
        description: "적에게 5 피해를 입힙니다.",
      },
      {
        id: "double_swoop",
        type: "attack",
        name: "이중 급습",
        intent: "attack",
        when: "phases_1",
        damage: 3,
        hits: 2,
        description: "적에게 3 피해를 2회 입힙니다.",
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
          types: ["evade"],
          value: 50,
        },
      },
    ],
  },

  spider_guardian: {
    id: "spider_guardian",
    name: "거미 수호자",
    floor: 1,
    baseHP: 30,
    baseBlock: 0,
    tier: "normal",
    description: "탑 입구를 지키는 거대 거미. 독과 거미줄로 사냥합니다.",
    image: "/images/enemies/entrance/enemy_spider-guardian.default.png",
    rewards: {
      gold: {
        min: 15,
        max: 20,
      },
    },
    actions: [
      {
        id: "web",
        type: "debuff",
        name: "거미줄",
        intent: "debuff",
        when: "phases_1",
        description:
          "플레이어에게 속박 1을 부여합니다. 다음 턴에 손패의 랜덤한 카드 1장을 사용할 수 없습니다.",
      },
      {
        id: "poison_fang",
        type: "attack",
        name: "독니",
        intent: "attack",
        description:
          "적에게 7 피해를 입히고 독 2를 부여합니다. 매 턴 종료 시 누적된 독만큼 피해를 입힌 뒤 독이 1 감소합니다. (독은 최대 5까지 중첩)",
        damage: 7,
        when: "phases_1",
        statusEffect: {
          type: "poison",
          stacks: 2,
          target: "player",
        },
      },
      {
        id: "curl_up",
        name: "웅크리기",
        type: "defend",
        intent: "defend",
        when: "phases_1",
        description: "방어력을 8 증가시킵니다.",
        block: 8,
      },
    ],
    pattern: [
      {
        turn: 1,
        actionId: "web",
      },
      {
        turn: 2,
        actionId: "poison_fang",
      },
      {
        turn: 3,
        actionId: "curl_up",
      },
      {
        turn: "repeat",
        actionId: "poison_fang", // TODO: 기획 바꾸거나 여기 바꿔야함 (턴 1부터 반복으로 해놨음 기획은)
      },
    ],
  },

  shadow_serpent: {
    id: "shadow_serpent",
    name: "그림자 뱀",
    floor: 1,
    baseHP: 28,
    baseBlock: 0,
    tier: "normal",
    description: "그림자 속에 숨어있는 뱀. 첫 타격이 치명적입니다.",
    image: "/images/enemies/entrance/enemy_shadow-serpent.default.png",
    rewards: {
      gold: {
        min: 15,
        max: 20,
      },
    },
    actions: [
      {
        id: "ambush",
        name: "기습!",
        type: "attack",
        intent: "attack",
        when: "phases_1",
        damage: 10,
        description:
          "적에게 10 피해를 입힙니다. (첫 턴에만 강화된 공격이 적용됩니다.)",
      },
      {
        id: "lurk",
        name: "그림자 숨기",
        type: "buff",
        intent: "buff",
        when: "phases_1",
        description:
          "그림자 뱀이 잠복 상태로 들어갑니다. 다음 공격에 피해가 50% 증가합니다.",
      },
      {
        id: "shadow_strike",
        name: "그림자 습격",
        type: "attack",
        intent: "attack",
        when: "phases_1",
        description:
          "적에게 8 피해를 입힙니다. 잠복 상태에서는 12 피해를 입힙니다.",
        buffEffect: {
          type: "strength",
          stacks: 4,
          target: "self",
        },
      },
    ],
    pattern: [
      {
        turn: 1,
        actionId: "shadow_bite",
      },
      {
        turn: 2,
        actionId: "lurk",
      },
      {
        turn: 3,
        actionId: "shadow_strike",
      },
      {
        turn: "repeat",
        actionId: "lurk",
      },
    ],
    passiveEffects: [
      {
        id: "ambush",
        trigger: "turn_start",
        name: "기습!",
        description: "전투 시작 시 첫 공격이 강화됩니다. 25 피해를 입힙니다.",
        effect: {
          types: ["attack"],
          value: 25,
        },
      },
    ],
  },

  gatekeeper_golem: {
    id: "gatekeeper_golem",
    name: "문지기 골렘",
    floor: 1,
    baseHP: 70,
    baseBlock: 5,
    tier: "elite",
    description: "돌로 만들어진 고양이 석상. 분노가 쌓이면 폭발합니다.",
    image: "/images/enemies/entrance/enemy_gatekeeper-golem.default.png",
    rewards: {
      gold: {
        min: 40,
        max: 50,
      },
    },
    actions: [
      {
        id: "stone_defense",
        name: "석화 방어",
        type: "defend",
        intent: "defend",
        description: "방어력을 15 증가시킵니다.",
        block: 15,
        when: "phases_1",
        buffEffect: {
          type: "defend",
          stacks: 15,
          target: "self",
        },
      },
      {
        id: "stone_fist",
        name: "돌주먹",
        type: "attack",
        intent: "attack",
        description: "적에게 12 피해를 입힙니다.",
        damage: 12,
        when: "phases_1",
      },
      {
        id: "rage_buildup",
        when: "phases_1",
        name: "분노 축적",
        type: "buff",
        intent: "buff",
        description: "분노를 2 증가시킵니다.",
        buffEffect: {
          type: "rage",
          stacks: 2,
          target: "self",
        },
      },
      {
        id: "rage_explosion",
        when: "phases_2",
        name: "분노 폭주",
        type: "buff",
        intent: "buff",
        description: "분노를 3 증가시킵니다.",
        buffEffect: {
          type: "rage",
          stacks: 2,
          target: "self",
        },
      },
      {
        id: "double_strike",
        name: "연속 타격",
        when: "phases_1",
        type: "attack",
        intent: "attack_multi",
        description: "적에게 8 피해를 2회 입힙니다.",
        damage: 8,
        hits: 2,
      },
      {
        id: "rage_explosion",
        name: "분노 폭발",
        when: "phases_1",
        type: "attack",
        intent: "attack",
        description:
          "적에게 (분노 스택 x 3) + 10 피해를 입힙니다. 분노 스택이 초기화됩니다.",
        damage: (rage) => rage * 3 + 10,
      },
    ],
    pattern: [
      {
        turn: 1,
        actionId: "stone_defense",
      },
      {
        turn: 2,
        actionId: "stone_fist",
      },
      {
        turn: 3,
        actionId: "rage_buildup",
      },
      {
        turn: 4,
        actionId: "double_strike",
      },
      {
        turn: 5,
        actionId: "rage_explosion",
      },
      {
        turn: "repeat",
        actionId: "stone_fist",
      },
    ],
    passiveEffects: [
      {
        id: "petrify",
        name: "석화",
        description: "방어력 효율이 1.5배 증가합니다.",
        trigger: "always",
        effect: { types: ["defend"], value: 1.5 },
      },
      {
        id: "cracked",
        name: "균열",
        description: "HP 50% 이하 시 방어력 감소, 공격력 5 증가.",
        trigger: "hp_threshold",
        effect: {
          types: ["defend", "attack"],
          value: 50,
          condition: { types: ["defend", "attack"], value: 50, operator: "<=" },
        },
      },
    ],
  },
} as const satisfies Record<string, Enemy>;
