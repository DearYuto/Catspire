import { MapConfig, NodeStyle } from "../types";

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

export const DEFAULT_MAP_CONFIG: MapConfig = {
  totalLayers: 6,
  nodesPerLayer: {
    min: 2,
    max: 4,
  },
  eliteRange: {
    min: 2,
    max: 5,
  },
  bossRange: {
    min: 1,
    max: 1,
  },
  eventRange: {
    min: 1,
    max: 1,
  },
  startRange: {
    min: 1,
    max: 1,
  },
  endRange: {
    min: 1,
    max: 1,
  },
  battleRange: {
    min: 15,
    max: 25,
  },
  restRange: {
    min: 0, // TODO: 추후 추가 예정
    max: 0,
  },
  treasureRange: {
    min: 0, // TODO: 추후 추가 예정
    max: 0,
  },
  shopRange: {
    min: 0, // TODO: 추후 추가 예정
    max: 0,
  },
};
