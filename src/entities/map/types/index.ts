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

export type MinMaxRange = {
  min: number;
  max: number;
};

interface MapConfigBase {
  totalLayers: number;
  nodesPerLayer: MinMaxRange;
  eliteRange: MinMaxRange;
  bossRange: MinMaxRange;
  eventRange: MinMaxRange;
  startRange: MinMaxRange;
  endRange: MinMaxRange;
  battleRange: MinMaxRange;
  restRange?: MinMaxRange; // 추후 추가예정
  treasureRange?: MinMaxRange; // 추후 추가예정
  shopRange?: MinMaxRange; // 추후 추가예정
}
export type MapConfig = Readonly<MapConfigBase>;

interface GeneratedMapBase {
  nods: readonly MapNode[];
  seed: number;
  config: MapConfig;
}
export type GeneratedMap = Readonly<GeneratedMapBase>;
