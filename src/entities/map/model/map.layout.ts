import type { MapNode } from "../types";

interface CalculateLayoutOptions {
  nodes: readonly MapNode[];
  layoutConfig?: LayoutConfig;
}

interface LayoutConfig {
  layerSpacing: number; // 레이어 간 가로 간격
  nodeSpacing: number; // 노드 간 세로 간격
  startX: number; // 시작 X 좌표
  canvasHeight: number;
}

const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  layerSpacing: 180,
  nodeSpacing: 120,
  startX: 100,
  canvasHeight: 600,
};

/**
 * 노드들의 x, y 좌표를 계산합니다.
 */
export const calculateNodePositions = ({
  nodes,
  layoutConfig = DEFAULT_LAYOUT_CONFIG,
}: CalculateLayoutOptions): readonly MapNode[] => {
  const config = { ...DEFAULT_LAYOUT_CONFIG, ...layoutConfig };

  // 레이어별로 그룹화
  const layerGroups = new Map<number, MapNode[]>();
  nodes.forEach((node) => {
    if (!layerGroups.has(node.layer)) {
      layerGroups.set(node.layer, []);
    }
    layerGroups.get(node.layer)!.push(node);
  });

  // 각 레이어의 노드 좌표 계산
  const nodesWithPositions = nodes.map((node) => {
    const layerNodes = layerGroups.get(node.layer) || [];
    const position = calculateNodePosition(node, layerNodes.length, config);

    return Object.freeze({
      ...node,
      x: position.x,
      y: position.y,
    });
  });

  return nodesWithPositions;
};

/**
 * 개별 노드의 x, y 좌표 계산
 */
const calculateNodePosition = (
  node: MapNode,
  layerNodeCount: number,
  config: LayoutConfig,
): { x: number; y: number } => {
  // X 좌표: 레이어에 따라 가로로 배치
  const x = config.startX + node.layer * config.layerSpacing;

  // Y 좌표: 레이어 내에서 세로 중앙 정렬
  const totalHeight = (layerNodeCount - 1) * config.nodeSpacing;
  const startY = (config.canvasHeight - totalHeight) / 2;
  const y = startY + node.column * config.nodeSpacing;

  return { x, y };
};

/**
 * 레이아웃 설정을 커스터마이징할 때 사용
 */
export const createLayoutConfig = (
  overrides: Partial<LayoutConfig>,
): LayoutConfig => {
  return { ...DEFAULT_LAYOUT_CONFIG, ...overrides };
};

export { DEFAULT_LAYOUT_CONFIG };
export type { LayoutConfig };
