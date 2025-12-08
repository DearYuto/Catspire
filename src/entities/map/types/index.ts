export type NodeType =
  | "start"
  | "battle"
  | "elite"
  | "shop"
  | "boss"
  | "event"
  | "end"
  | "rest" // TODO: 추후 추가 예정 (몬스터 강화나 hp회복)
  | "treasure"; // TODO: 추후 추가 예정 (아이템 획득)

export type NodeState = "locked" | "unlocked" | "completed" | "current";

export type NodeStyle = {
  [K in NodeType]: {
    image: string;
    label: string;
  };
};

interface MapNodeBase {
  id: string;
  type: NodeType;
  state: NodeState;
  layer: number; // 몇층
  column: number; // 몇번째 노드
  x: number;
  y: number;
  connections: string[];
  enemies?: string[];
}
export type MapNode = Readonly<MapNodeBase>;

interface MapConfigBase {
  totalLayers: number;
  nodesPerLayer: [number, number];
  eliteRange: [number, number];
  bossRange: [1, 1];
  eventRange: [number, number];
  startRange: [1, 1];
  endRange: [1, 1];
  battleRange: [1, number];
  restRange?: [number, number]; // 추후 추가예정
  treasureRange?: [number, number]; // 추후 추가예정
  shopRange?: [number, number]; // 추후 추가예정
}
export type MapConfig = Readonly<MapConfigBase>;

interface GeneratedMapBase {
  nods: readonly MapNode[];
  seed: number;
  config: MapConfig;
}
export type GeneratedMap = Readonly<GeneratedMapBase>;
