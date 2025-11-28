import { useEffect, useState } from "react";

interface UseImagePreloaderProps {
  imageUrls: string[];
}

export const useImagePreloader = ({ imageUrls }: UseImagePreloaderProps) => {
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (imageUrls.length === 0) return;

    const promises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          setLoadedImageCount((prev) => prev + 1);
          resolve(url);
        };
        img.src = url;
        img.onerror = reject;
      });
    });

    Promise.all(promises)
      .then(() => {
        setIsComplete(true);
      })
      .catch((error) => {
        console.error("이미지 프리로드 중 오류가 발생했어요.", error);
        setIsComplete(false);
      });
  }, [imageUrls]);

  return {
    isComplete,
    loadedImageCount,
    totalImageCount: imageUrls.length,
    progress: Math.round((loadedImageCount / imageUrls.length) * 100),
  };
};
