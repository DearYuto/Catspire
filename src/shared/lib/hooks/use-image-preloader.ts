import { useEffect, useRef, useState } from "react";

interface UseImagePreloaderProps {
  imageUrls: string[];
}

const PRELOAD_VERSION = "v1";
const PRELOAD_VERSION_STORAGE_KEY = "catspire_preload_version";

const isAlreadyLoaded = () => {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(PRELOAD_VERSION_STORAGE_KEY) === PRELOAD_VERSION;
};

/**
 * TODO: 추후 개선 필요한 사항
 * 사용자가 캐시를 지워버리는 경우: 로컬스토리지에 key가 남아서 이미지로드를 스킵하게 되는 문제 있을 수 있음.
 */
export const useImagePreloader = ({ imageUrls }: UseImagePreloaderProps) => {
  const [loadedImageCount, setLoadedImageCount] = useState(0);

  const [isComplete, setIsComplete] = useState(() => isAlreadyLoaded());
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (isComplete || imageUrls.length === 0) {
      return;
    }

    localStorage.setItem(PRELOAD_VERSION_STORAGE_KEY, PRELOAD_VERSION);

    let imageCount = 0;
    const promises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          if (isMountedRef.current) {
            imageCount += 1;
            setLoadedImageCount(imageCount);
          }

          resolve(url);
        };
        img.onerror = reject;
        img.src = url;
      });
    });

    Promise.all(promises)
      .then(() => {
        if (isMountedRef.current) {
          setIsComplete(true);
        }
      })
      .catch((error) => {
        console.error("이미지 프리로드 중 오류가 발생했어요.", error);
        setIsComplete(false);
      });

    return () => {
      isMountedRef.current = false;
    };
  }, [imageUrls, isComplete]);

  return {
    isComplete,
    loadedImageCount,
    totalImageCount: imageUrls.length,
    progress:
      imageUrls.length > 0
        ? Math.round((loadedImageCount / imageUrls.length) * 100)
        : 100,
  };
};
