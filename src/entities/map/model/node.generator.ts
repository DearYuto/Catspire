import { RandomGenerator } from "@/shared/lib/utils/random-generator";
import { MapConfig, MapNode, NodeType } from "../types";
import { NODE_PLACEMENT_RULES } from "../constants/rules";

interface GenerateLayers {
  config: MapConfig;
  randomGenerator: RandomGenerator;
}

// 사용자가 캐릭터 시나리오 보고 나면 게임 맵을 볼 수 있음
// 게임 맵은 시작 ~ 끝 으로 구성되어 있음
// 게임 맵은 여러개의 레이어로 구성되어 있음
// 게임 맵은 seed 값이 있어서 같은 시드 값이면 같은 맵이 생성되어야 함.
// 게임 맵은 각 노드는 타입별로 존재하고 타입별로 minmax 값이 있어서 노드 타입별로 몇개씩 생성되는지 정의되어 있음.
// 사용자는 무조건 시작부터 시작해야함.
// 여러 갈래로 나뉘는 노드에서는 하나만 선택할 수 있음.
// 이전 노드로 돌아갈 수 없음.

// 맵 디자인, 각 층에 노드 몇개씩 있는지, 노드 타입별 minmax -> 이건 config에 정의했고

// 1 레이어 만들기
// 2 노드 만들기
// 3 각 노드 연결

export const generateLayers = ({
  config,
  randomGenerator,
}: GenerateLayers): MapNode[] => {
  const nodes: MapNode[] = [];

  for (let layer = 0; layer < config.totalLayers; layer++) {
    const nodeCount = getNodeCountForLayer(layer, config, randomGenerator);

    for (let col = 0; col < nodeCount; col++) {
      const node: MapNode = {
        id: createNodeId(layer, col),
        type: getNodeTypeForLayer(layer, config.totalLayers, randomGenerator),
        state: getNodeState(layer, col),
        layer,
        column: col,
        x: 0, // 좌표는 나중에 map.layout.ts에서 계산
        y: 0,
        connections: [], // 연결은 나중에 node.connector.ts에서 처리
        enemies: [],
      };

      nodes.push(node);
    }
  }

  return nodes;
};

/**
 * 노드 ID 생성
 */
function createNodeId(layer: number, column: number): string {
  return `${layer}-${column}`;
}

/**
 * 레이어별 노드 개수 결정 (설정 기반)
 */
function getNodeCountForLayer(
  layer: number,
  config: MapConfig,
  random: RandomGenerator,
): number {
  const isFirstLayer = layer === 0;
  const isLastLayer = layer === config.totalLayers - 1;

  if (isFirstLayer) {
    return random.between(config.startRange.min, config.startRange.max);
  }

  if (isLastLayer) {
    return random.between(config.endRange.min, config.endRange.max);
  }

  return random.between(config.nodesPerLayer.min, config.nodesPerLayer.max);
}

/**
 * 레이어별 노드 타입 결정
 */
function getNodeTypeForLayer(
  layer: number,
  totalLayers: number,
  random: RandomGenerator,
): NodeType {
  const isFirstLayer = layer === 0;
  const isLastLayer = layer === totalLayers - 1;

  if (isFirstLayer) return "start";
  if (isLastLayer) return "end";

  return pickNodeType(layer, totalLayers, random);
}

/**
 * 노드 상태 결정
 * - 첫 레이어의 첫 노드: current (현재 위치)
 * - 첫 레이어의 나머지 노드: unlocked (갈 수 있음)
 * - 두 번째 레이어: unlocked (시각화를 위해 임시로)
 * - 나머지: locked
 */
function getNodeState(layer: number, column: number): MapNode["state"] {
  // 첫 레이어의 첫 노드는 current
  if (layer === 0 && column === 0) return "current";

  // 첫 레이어의 나머지 노드는 unlocked
  if (layer === 0) return "unlocked";

  // 나머지는 locked
  return "locked";
}

/**
 * 중간 레이어의 노드 타입을 진행도 기반으로 선택
 * NODE_PLACEMENT_RULES에 정의된 규칙에 따라 가능한 타입 중 하나를 랜덤 선택
 */
export function pickNodeType(
  layer: number,
  totalLayers: number,
  randomGenerator: RandomGenerator,
): NodeType {
  const progress = layer / (totalLayers - 1);

  // 현재 진행도에서 배치 가능한 노드 타입 필터링
  const availableTypes = (
    Object.keys(NODE_PLACEMENT_RULES) as NodeType[]
  ).filter((type) => {
    const rule =
      NODE_PLACEMENT_RULES[type as keyof typeof NODE_PLACEMENT_RULES];

    return rule.min <= progress && rule.max >= progress;
  });

  // 가능한 타입 중 랜덤 선택
  const selectedType = randomGenerator.pick(availableTypes);

  return selectedType ?? "battle";
}
