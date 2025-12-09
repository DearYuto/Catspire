import { NodeStyle } from "../types";

export const NODE_CONFIG: NodeStyle = {
  start: {
    image: "/images/map/node_start.png",
    label: "시작",
  },
  battle: {
    image: "/images/map/node_battle.png",
    label: "전투",
  },
  shop: {
    image: "/images/map/node_shop.png",
    label: "상점",
  },
  boss: {
    image: "/images/map/node_boss.png",
    label: "보스",
  },
  event: {
    image: "/images/map/node_event.png",
    label: "이벤트",
  },
  rest: {
    image: "/images/map/node_rest.png",
    label: "휴식",
  },
  elite: {
    image: "/images/map/node_elite.png",
    label: "엘리트",
  },
  treasure: {
    image: "/images/map/node_treasure.png",
    label: "보물",
  },
  end: {
    image: "/images/map/node_end.png",
    label: "종료",
  },
} as const;
