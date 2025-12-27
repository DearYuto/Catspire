import type { MapNode } from "../types";
import { RandomGenerator } from "@/shared/lib/utils/random-generator";

interface ConnectNodesOptions {
  nodes: readonly MapNode[];
  randomGenerator: RandomGenerator;
}

export const connectNodes = ({
  nodes,
  randomGenerator,
}: ConnectNodesOptions): readonly MapNode[] => {
  const mutableNodes = nodes.map((node) => ({
    ...node,
    connections: [] as string[],
  }));

  const layerGroups = new Map<number, typeof mutableNodes>();
  mutableNodes.forEach((node) => {
    if (!layerGroups.has(node.layer)) {
      layerGroups.set(node.layer, []);
    }

    layerGroups.get(node.layer)!.push(node);
  });

  const maxLayer = Math.max(...mutableNodes.map((n) => n.layer));

  // 각 레이어의 노드를 다음 레이어와 연결
  for (let layer = 0; layer < maxLayer; layer++) {
    const currentLayerNodes = layerGroups.get(layer) || [];
    const nextLayerNodes = layerGroups.get(layer + 1) || [];

    if (nextLayerNodes.length === 0) continue;

    currentLayerNodes.forEach((node) => {
      // 각 노드는 1~3개의 다음 레이어 노드와 연결
      const connectionCount = getConnectionCount(
        nextLayerNodes.length,
        randomGenerator,
      );

      const connections = selectConnections(
        node,
        nextLayerNodes,
        connectionCount,
        randomGenerator,
      );

      node.connections = connections;
    });

    // 다음 레이어의 모든 노드가 최소 1개 이상의 연결을 받도록 보장
    ensureAllNodesConnected(currentLayerNodes, nextLayerNodes, randomGenerator);
  }

  return mutableNodes.map((node) => Object.freeze({ ...node }));
};

/**
 * 연결 개수 결정 (1~3개)
 */
const getConnectionCount = (
  nextLayerSize: number,
  rng: RandomGenerator,
): number => {
  if (nextLayerSize === 1) return 1;
  if (nextLayerSize === 2) return rng.between(1, 2);

  return rng.between(1, 3);
};

/**
 * 연결할 노드 선택
 * 현재 노드의 column과 가까운 노드를 우선 선택
 */
const selectConnections = (
  currentNode: { id: string; column: number },
  nextLayerNodes: { id: string; column: number }[],
  count: number,
  rng: RandomGenerator,
): string[] => {
  // column 기준으로 가까운 노드 우선 선택
  const sortedByDistance = [...nextLayerNodes].sort((a, b) => {
    const distA = Math.abs(a.column - currentNode.column);
    const distB = Math.abs(b.column - currentNode.column);
    return distA - distB;
  });

  const candidates = sortedByDistance.slice(
    0,
    Math.min(count + 1, sortedByDistance.length),
  );
  const selected = rng.shuffle([...candidates]).slice(0, count);

  return selected.map((node) => node.id);
};

/**
 * 다음 레이어의 모든 노드가 최소 1개 이상의 연결을 받도록 보장
 */
const ensureAllNodesConnected = (
  currentLayerNodes: { id: string; connections: string[] }[],
  nextLayerNodes: { id: string }[],
  rng: RandomGenerator,
): void => {
  const connectedNodeIds = new Set(
    currentLayerNodes.flatMap((node) => node.connections),
  );

  const unconnectedNodes = nextLayerNodes.filter(
    (node) => !connectedNodeIds.has(node.id),
  );

  unconnectedNodes.forEach((unconnectedNode) => {
    const randomCurrentNode = rng.pick(currentLayerNodes);
    if (
      randomCurrentNode &&
      !randomCurrentNode.connections.includes(unconnectedNode.id)
    ) {
      randomCurrentNode.connections.push(unconnectedNode.id);
    }
  });
};
