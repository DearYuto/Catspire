"use client";

import { MoonParticles } from "@/shared/components/effects/moon-particles";
import { MuteButton } from "@/shared/components/audio-control";
import { useFirstVisit } from "@/shared/lib/hooks/use-first-visit";
import GameLogo from "@/shared/components/game-logo/game-logo";
import { HomeFooter } from "./home-footer";
import { IntroButtons } from "@/features/game-main/components/intro-buttons";
import Image from "next/image";
import { useState } from "react";
import { extractPrologueImages } from "@/shared/config/prologue-dialogue";
import { extractCharacterImages } from "@/entities/character/model/character-images";

const FIRST_VISIT_STORAGE_KEY = "catspire_visited";

const DECORATION_IMAGES = [
  "/images/decoration/decoration_card.top.png",
  "/images/decoration/decoration_frame.default.png",
] as const;

const prologueImages = extractPrologueImages();
const characterImages = extractCharacterImages();

const ALL_IMAGE_URLS = [
  ...DECORATION_IMAGES,
  ...prologueImages.all,
  ...characterImages.all,
] as const;

const HomePage = () => {
  const isFirstVisit = useFirstVisit(FIRST_VISIT_STORAGE_KEY);
  const [imagesLoaded, setImagesLoaded] = useState(isFirstVisit ? false : true);
  const [loadedCount, setLoadedCount] = useState(0);

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-4 py-6 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#0A0620" }}
    >
      <MoonParticles />
      <MuteButton showAnimation={isFirstVisit} />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8">
        {imagesLoaded ? (
          <>
            <GameLogo initAnimation={isFirstVisit} />
            <IntroButtons initAnimation={isFirstVisit} />
          </>
        ) : (
          <div className="text-2xl font-bold text-white">
            게임에 필요한 리소스 준비중...
            <div className="text-sm text-gray-500">
              {Math.round((loadedCount / ALL_IMAGE_URLS.length) * 100)}%
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 w-full max-w-4xl">
        <HomeFooter isFirstVisit={isFirstVisit} />
      </div>

      <div className="hidden" aria-hidden="true">
        {ALL_IMAGE_URLS.map((url) => (
          <Image
            key={url}
            src={url}
            alt="preload"
            priority
            fill
            sizes="100vw"
            onLoad={() => {
              setLoadedCount((prev) => {
                const newCount = prev + 1;
                if (newCount === ALL_IMAGE_URLS.length) {
                  setImagesLoaded(true);
                }
                return newCount;
              });
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
