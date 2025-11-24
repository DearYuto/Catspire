import { ReactNode, RefObject } from "react";

interface Card3DWrapperProps {
  cardRef: RefObject<HTMLDivElement>;
  rotateX: number;
  rotateY: number;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  children: ReactNode;
}

export function Card3DWrapper({
  cardRef,
  rotateX,
  rotateY,
  onMouseMove,
  onMouseLeave,
  children,
}: Card3DWrapperProps) {
  return (
    <div
      ref={cardRef}
      className="relative group h-full transition-transform duration-200 ease-out"
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
