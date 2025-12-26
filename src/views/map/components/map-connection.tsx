import type { MapNode } from "@/entities/map/types";
import { memo } from "react";

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
      stroke="#334155"
      strokeWidth="2"
      strokeDasharray="4 4"
      opacity="0.4"
    />
  );
});

interface MapConnectionsProps {
  nodes: readonly MapNode[];
}

export const MapConnections = memo(function MapConnections({
  nodes,
}: MapConnectionsProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width="100%"
      height="100%"
    >
      {nodes.map((node) =>
        node.connections.map((targetNodeId) => {
          const targetNode = nodes.find((n) => n.id === targetNodeId);

          if (!targetNode) return null;

          return (
            <MapConnection
              key={`${node.id}-${targetNodeId}`}
              fromNode={node}
              toNode={targetNode}
            />
          );
        }),
      )}
    </svg>
  );
});
