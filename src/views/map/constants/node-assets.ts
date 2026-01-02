import type { NodeType, NodeState } from "@/entities/map/types";

const NODE_IMAGE_BASE_PATH = "/images/map/node";

export const NODE_SIZE = 80;
export const NODE_OFFSET = NODE_SIZE / 2;

const nodeTypeImages: Record<NodeType, string> = {
  start: `${NODE_IMAGE_BASE_PATH}/node-unlocked.png`,
  battle: `${NODE_IMAGE_BASE_PATH}/node-battle.png`,
  elite: `${NODE_IMAGE_BASE_PATH}/node-elite.png`,
  boss: `${NODE_IMAGE_BASE_PATH}/node-boss.png`,
  end: `${NODE_IMAGE_BASE_PATH}/node-unlocked.png`,
};

const LOCKED_IMAGE = `${NODE_IMAGE_BASE_PATH}/node-locked.png`;
const CURRENT_MARKER_IMAGE = `${NODE_IMAGE_BASE_PATH}/node-current.png`;

export const getNodeImage = (type: NodeType, state: NodeState): string => {
  if (state === "locked") {
    return LOCKED_IMAGE;
  }
  return nodeTypeImages[type];
};

export const getCurrentMarkerImage = (): string => CURRENT_MARKER_IMAGE;

interface NodeStateStyles {
  isLocked: boolean;
  isCurrent: boolean;
  cursorClass: string;
  hoverClass: string;
}

const nodeStateStylesMap: Record<NodeState, NodeStateStyles> = {
  locked: {
    isLocked: true,
    isCurrent: false,
    cursorClass: "cursor-not-allowed",
    hoverClass: "",
  },
  unlocked: {
    isLocked: false,
    isCurrent: false,
    cursorClass: "cursor-pointer",
    hoverClass: "hover:scale-110",
  },
  current: {
    isLocked: false,
    isCurrent: true,
    cursorClass: "cursor-pointer",
    hoverClass: "hover:scale-110",
  },
  completed: {
    isLocked: false,
    isCurrent: false,
    cursorClass: "cursor-default",
    hoverClass: "",
  },
};

export const getNodeStateStyles = (state: NodeState): NodeStateStyles => {
  return nodeStateStylesMap[state] ?? nodeStateStylesMap.locked;
};
