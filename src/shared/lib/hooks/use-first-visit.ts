import { useState } from "react";

export const useFirstVisit = (storageKey: string) => {
  const [isFirstVisit] = useState(() => {
    if (typeof window === "undefined") return false;
    const hasVisited = localStorage.getItem(storageKey);

    if (!hasVisited) {
      localStorage.setItem(storageKey, "true");
      return true;
    }
    return false;
  });

  return isFirstVisit;
};
