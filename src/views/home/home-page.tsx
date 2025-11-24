"use client";

import { MoonParticles } from "@/shared/ui/effects/moon-particles";
import { MuteButton } from "@/components/audio-control";
import { useFirstVisit } from "@/shared/lib/hooks/use-first-visit";
import GameLogo from "@/components/game-logo/game-logo";
import { HomeFooter } from "./home-footer";

const FIRST_VISIT_STORAGE_KEY = "catspire_visited";

export function HomePage() {
  const isFirstVisit = useFirstVisit(FIRST_VISIT_STORAGE_KEY);

  return (
    <main
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#0A0620" }}
    >
      <MoonParticles />
      <MuteButton showAnimation={isFirstVisit} />
      <GameLogo initAnimation={isFirstVisit} />
      <HomeFooter isFirstVisit={isFirstVisit} />
    </main>
  );
}
