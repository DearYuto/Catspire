"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// import { useGameStore } from "@/features/game-progress";
import { CharacterClass } from "@/shared/types";
import { MoonParticles } from "@/shared/components";
import { MuteButton } from "@/shared/components/audio-control";
import { CharacterCard } from "@/features/game-card/components/character-card";

export function CharacterSelectPage() {
  const router = useRouter();
  // const startNewGame = useGameStore((state: GameState) => state.startNewGame);

  const handleStartGame = (characterClass: CharacterClass) => {
    // startNewGame(characterClass);
    router.push("/game");
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0620" }}
    >
      <MoonParticles />

      <div className="fixed top-8 right-8 left-8 z-50 flex items-start justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="text-sm font-medium text-amber-300 transition-colors hover:text-amber-200"
        >
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ x: [-2, 0, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            돌아가기
          </span>
        </motion.button>

        <MuteButton showAnimation={false} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: "120px" }}
        >
          <h1
            className="bg-linear-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-5xl font-bold text-transparent"
            style={{ marginBottom: "16px" }}
          >
            클래스 선택
          </h1>
          <p className="text-lg text-gray-400">
            당신의 운명을 결정할 역할을 선택하세요
          </p>
        </motion.div>

        <div className="grid w-full max-w-6xl grid-cols-3 gap-8">
          <CharacterCard
            characterClass="warrior"
            onClick={() => handleStartGame("warrior")}
            delay={0.3}
          />

          <CharacterCard
            characterClass="rogue"
            onClick={() => handleStartGame("rogue")}
            delay={0.4}
          />

          <CharacterCard
            characterClass="mage"
            onClick={() => handleStartGame("mage")}
            delay={0.5}
          />
        </div>
      </div>
    </main>
  );
}
