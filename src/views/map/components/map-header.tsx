import { memo } from "react";

interface MapHeaderProps {
  seed: number;
}

export const MapHeader = memo(function MapHeader({ seed }: MapHeaderProps) {
  return (
    <div className="mb-4">
      <p className="text-sm text-slate-400">
        Seed: <span className="font-mono text-slate-200">{seed}</span>
      </p>
    </div>
  );
});
