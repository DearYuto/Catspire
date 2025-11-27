"use client";

import { MoonParticles } from "@/shared/ui/effects/moon-particles";
import { MuteButton } from "@/components/audio-control";
import { useFirstVisit } from "@/shared/lib/hooks/use-first-visit";
import GameLogo from "@/components/game-logo/game-logo";
import { HomeFooter } from "./home-footer";
import { IntroButtons } from "@/features/game-intro/intro-buttons";

const FIRST_VISIT_STORAGE_KEY = "catspire_visited";

export function HomePage() {
  const isFirstVisit = useFirstVisit(FIRST_VISIT_STORAGE_KEY);

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0620" }}
    >
      <MoonParticles />
      <MuteButton showAnimation={isFirstVisit} />
      <div>
        <GameLogo initAnimation={isFirstVisit} />
        <IntroButtons initAnimation={isFirstVisit} />
      </div>
      <HomeFooter isFirstVisit={isFirstVisit} />
    </main>
  );
}
