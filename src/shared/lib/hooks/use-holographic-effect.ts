import { useCallback, useState } from "react";

export const useHolographicEffect = () => {
  const [holoX, setHoloX] = useState(50);
  const [holoY, setHoloY] = useState(50);

  const updatePosition = useCallback((x: number, y: number, rect: DOMRect) => {
    setHoloX((x / rect.width) * 100);
    setHoloY((y / rect.height) * 100);
  }, []);

  const reset = useCallback(() => {
    setHoloX(50);
    setHoloY(50);
  }, []);

  return { holoX, holoY, updatePosition, reset };
};
