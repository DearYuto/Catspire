/**
 * 전체 층 기준 몇 퍼센트 이에 배치할지 정의
 * min 0.5, max 1.0인 경우엔 전체 층 기준 50% 이후에만 생성됨.
 * start,end는 반드시 시작과 끝에 배치할거라 제외함
 */
export const NODE_PLACEMENT_RULES = {
  elite: {
    min: 0.3,
    max: 1.0,
  },
  boss: {
    min: 1.0,
    max: 1.0,
  },
  battle: {
    min: 0.0,
    max: 1.0,
  },
  // TODO: 추후 추가 예정
  // event: {
  //   min: 1,
  //   max: 1,
  // },
  // shop: {
  //   min: 1,
  //   max: 1,
  // },
  // rest: {
  //   min: 1,
  //   max: 1,
  // },
  // treasure: {
  //   min: 1,
  //   max: 1,
  // },
} as const;
