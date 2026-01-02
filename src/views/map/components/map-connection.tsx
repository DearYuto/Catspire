import { memo } from "react";
import type { MapNode } from "@/entities/map/types";

const CONNECTION_STYLE = {
  stroke: "#334155",
  strokeWidth: 2,
  strokeDasharray: "4 4",
  opacity: 0.4,
} as const;

interface MapConnectionProps {
  fromNode: MapNode;
  toNode: MapNode;
}

export const MapConnection = memo(function MapConnection({
  fromNode,
  toNode,
}: MapConnectionProps) {
  return (
    <line
      x1={fromNode.x}
      y1={fromNode.y}
      x2={toNode.x}
      y2={toNode.y}
      {...CONNECTION_STYLE}
    />
  );
});

interface MapConnectionsProps {
  nodes: readonly MapNode[];
}

export const MapConnections = memo(function MapConnections({
  nodes,
}: MapConnectionsProps) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width="100%"
      height="100%"
    >
      {nodes.flatMap((node) =>
        node.connections
          .map((targetId) => {
            const targetNode = nodeMap.get(targetId);
            if (!targetNode) return null;

            return (
              <MapConnection
                key={`${node.id}-${targetId}`}
                fromNode={node}
                toNode={targetNode}
              />
            );
          })
          .filter(Boolean),
      )}
    </svg>
  );
});
