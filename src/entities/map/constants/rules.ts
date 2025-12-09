/**
 * 전체 층 기준 몇 퍼센트 이에 배치할지 정의
 * min 0.5, max 1.0인 경우엔 전체 층 기준 50% 이후에만 생성됨.
 */
export const NODE_PLACEMENT_RULES = {
  elite: {
    min: 0.3,
    max: 1.0,
  },
  boss: {
    min: 1,
    max: 1,
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
  end: {
    min: 1,
    max: 1,
  },
};
