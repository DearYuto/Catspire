export const CHARACTER_INFO = {
  warrior: {
    title: "문퍼 (Moon Purr)",
    description:
      "달빛을 정제해 힘으로 바꾸는 안정형 클래스. 공격과 방어가 균형 잡힌 올라운더입니다.",
    pros: [
      "달빛 스택 기반 강화",
      "안정적인 전투 흐름",
      "초보자 추천",
      "균형잡힌 플레이",
    ],
    difficulty: "쉬움",
    lore: "턴이 끝날 때마다 달빛 스택을 획득합니다. 달빛 3 스택 시 공격과 방어가 50% 증가합니다.",
    passive: "Lunar Flow - 달빛의 흐름",
  },
  rogue: {
    title: "섀도포 (Shadow Paw)",
    description:
      "그림자 잔향을 축적해 폭발적인 데미지를 내는 공격형 클래스. 빠른 콤보로 적을 압도하는 공격형 클래스입니다.",
    pros: ["강력한 순간 딜", "카드 콤보 특화", "그림자 스택 강화", "빠른 전투"],
    difficulty: "보통",
    lore: "한 턴에 3장 이상 카드 사용 시 그림자 스택 +1. 스택당 공격 +1 추가 피해를 줍니다.",
    passive: "Night Trace - 밤의 잔향",
  },
  mage: {
    title: "드림테일 (Dream Tail)",
    description:
      "꿈과 환영을 조작하는 전략형 클래스. 디버프와 손패 관리로 전략적 플레이가 가능합니다.",
    pros: [
      "손패 조작 능력 우수",
      "디버프 특화",
      "악몽 콤보 가능",
      "전략적 플레이",
    ],
    difficulty: "어려움",
    lore: "턴 종료 시 손패가 4장 이하면 다음 턴 카드 +1 드로우. 악몽 효과로 적을 괴롭힙니다.",
    passive: "Dream Ripple - 꿈의 파문",
  },
} as const;
