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

export const generateLayers = ({ config, randomGenerator }: GenerateLayers) => {
  const nodes: MapNode[] = [];

  // 각 레이어별로 몇 개의 노드를 만들지 세팅
  for (let layer = 0; layer < config.totalLayers; layer++) {
    const nodeCount = randomGenerator.between(
      config.nodesPerLayer.min,
      config.nodesPerLayer.max,
    );

    for (let col = 0; col < nodeCount; col++) {
      const node: MapNode = {
        id: `${layer}-${col}`,
        type: "start",
        state: "unlocked",
        layer,
        column: col,
        x: 0,
        y: 0,
        connections: [],
        enemies: [],
      };

      nodes.push(node);
    }
  }

  return nodes;
};

export function determineNodeType(
  layer: number,
  totalLayers: number,
  randomGenerator: RandomGenerator,
): NodeType {
  const isFirstNode = layer === 0;
  const isLastNode = layer === totalLayers;

  if (isFirstNode) return "start";

  if (isLastNode) return "end";

  return pickNodeType(layer, totalLayers, randomGenerator);
}

export function pickNodeType(
  layer: number,
  totalLayers: number,
  randomGenerator: RandomGenerator,
): NodeType {
  const progress = layer / (totalLayers - 1);

  const availableTypes = (
    Object.keys(NODE_PLACEMENT_RULES) as NodeType[]
  ).filter((type) => {
    const rule =
      NODE_PLACEMENT_RULES[type as keyof typeof NODE_PLACEMENT_RULES];

    return rule.min <= progress && rule.max >= progress;
  });

  const selectedType = randomGenerator.pick(availableTypes)!;

  return selectedType ?? "battle";
}
