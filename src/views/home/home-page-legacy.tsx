"use client";

import { MoonParticles } from "@/shared/components/effects/moon-particles";
import { MuteButton } from "@/shared/components/audio-control";
import { useFirstVisit } from "@/shared/lib/hooks/use-first-visit";
import GameLogo from "@/shared/components/game-logo/game-logo";
import { HomeFooter } from "./home-footer";
import { IntroButtons } from "@/features/game-main/components/intro-buttons";
import { useImagePreloader } from "@/shared/lib/hooks/use-image-preloader";

const FIRST_VISIT_STORAGE_KEY = "catspire_visited";

const PRELOAD_BG_IMAGE_URLS = [
  "/images/backgrounds/moon_bg.png",
  "/images/backgrounds/shadow_bg.png",
  "/images/backgrounds/dream_bg.png",
  "/images/backgrounds/scene_darkness.png",
  "/images/backgrounds/scene_moon_shard.png",
  "/images/backgrounds/scene_mysterious_tower.png",
] as const;

const PRELOAD_CHARACTER_IMAGE_URLS = [
  "/images/backgrounds/scene_yuto_bg.png",
  "/images/characters/yuto_worried.png",
  "/images/characters/moon_purr.png",
  "/images/characters/shadow_paw.png",
  "/images/characters/dream_tail.png",
] as const;

const PRELOAD_DECORATION_IMAGE_URLS = [
  "/images/decoration/deco_top.png",
  "/images/decoration/frame.png",
] as const;

const HomePage = () => {
  const { isComplete, progress } = useImagePreloader({
    imageUrls: [
      ...PRELOAD_BG_IMAGE_URLS,
      ...PRELOAD_CHARACTER_IMAGE_URLS,
      ...PRELOAD_DECORATION_IMAGE_URLS,
    ],
  });

  console.log(isComplete, "isComplete");

  const isFirstVisit = useFirstVisit(FIRST_VISIT_STORAGE_KEY);

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-4 py-6 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#0A0620" }}
    >
      <MoonParticles />
      <MuteButton showAnimation={isFirstVisit} />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8">
        {isComplete ? (
          <>
            <GameLogo initAnimation={isFirstVisit} />
            <IntroButtons initAnimation={isFirstVisit} />
          </>
        ) : (
          <div className="text-2xl font-bold text-white">
            게임에 필요한 리소스 준비중...
            <div className="text-sm text-gray-500">{progress}%</div>
          </div>
        )}
      </div>
      <div className="mt-6 w-full max-w-4xl">
        <HomeFooter isFirstVisit={isFirstVisit} />
      </div>
    </main>
  );
};

export default HomePage;
