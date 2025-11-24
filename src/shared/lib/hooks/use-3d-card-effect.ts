import { useCallback, useRef, useState } from "react";

export const use3dCardEffect = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = Math.max(
      -8,
      Math.min(8, ((y - centerY) / centerY) * -8)
    );
    const rotateYValue = Math.max(
      -8,
      Math.min(8, ((x - centerX) / centerX) * 8)
    );

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return {
    cardRef,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
};
