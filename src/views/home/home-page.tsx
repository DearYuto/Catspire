"use client";

import { MoonParticles } from "@/shared/components/effects/moon-particles";
import { MuteButton } from "@/shared/components/audio-control";
import { useFirstVisit } from "@/shared/lib/hooks/use-first-visit";
import GameLogo from "@/shared/components/game-logo/game-logo";
import { HomeFooter } from "./home-footer";
import { IntroButtons } from "@/features/game-main/components/intro-buttons";

const FIRST_VISIT_STORAGE_KEY = "catspire_visited";

export function HomePage() {
  const isFirstVisit = useFirstVisit(FIRST_VISIT_STORAGE_KEY);

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-4 py-6 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#0A0620" }}
    >
      <MoonParticles />
      <MuteButton showAnimation={isFirstVisit} />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8">
        <GameLogo initAnimation={isFirstVisit} />
        <IntroButtons initAnimation={isFirstVisit} />
      </div>
      <div className="mt-6 w-full max-w-4xl">
        <HomeFooter isFirstVisit={isFirstVisit} />
      </div>
    </main>
  );
}
