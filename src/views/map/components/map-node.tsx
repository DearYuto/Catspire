import Image from "next/image";
import { memo } from "react";
import type { MapNode } from "@/entities/map/types";
import {
  getNodeImage,
  getNodeStateStyles,
  getCurrentMarkerImage,
  NODE_SIZE,
  NODE_OFFSET,
} from "../constants/node-assets";

const CurrentPositionMarker = memo(function CurrentPositionMarker() {
  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
      <div className="relative h-10 w-10">
        <Image
          src={getCurrentMarkerImage()}
          alt="current position"
          fill
          className="animate-bounce object-contain"
        />
      </div>
    </div>
  );
});

interface NodeImageProps {
  src: string;
  type: string;
  isLocked: boolean;
}

const NodeImage = memo(function NodeImage({
  src,
  type,
  isLocked,
}: NodeImageProps) {
  return (
    <div className="relative" style={{ width: NODE_SIZE, height: NODE_SIZE }}>
      <Image
        src={src}
        alt={type}
        fill
        className={`object-contain ${isLocked ? "opacity-50" : "opacity-100"}`}
      />
    </div>
  );
});

interface MapNodeItemProps {
  node: MapNode;
  onClick: (node: MapNode) => void;
}

export const MapNodeItem = memo(function MapNodeItem({
  node,
  onClick,
}: MapNodeItemProps) {
  const { isLocked, isCurrent, cursorClass, hoverClass } = getNodeStateStyles(
    node.state,
  );
  const nodeImage = getNodeImage(node.type, node.state);

  const handleClick = () => {
    if (!isLocked) {
      onClick(node);
    }
  };

  return (
    <div
      className={`group absolute transition-transform ${cursorClass} ${hoverClass}`}
      style={{
        left: node.x - NODE_OFFSET,
        top: node.y - NODE_OFFSET,
      }}
      onClick={handleClick}
    >
      {isCurrent && <CurrentPositionMarker />}
      <NodeImage src={nodeImage} type={node.type} isLocked={isLocked} />
    </div>
  );
});

interface MapNodesProps {
  nodes: readonly MapNode[];
  onNodeClick: (node: MapNode) => void;
}

export const MapNodes = memo(function MapNodes({
  nodes,
  onNodeClick,
}: MapNodesProps) {
  return (
    <>
      {nodes.map((node) => (
        <MapNodeItem key={node.id} node={node} onClick={onNodeClick} />
      ))}
    </>
  );
});
